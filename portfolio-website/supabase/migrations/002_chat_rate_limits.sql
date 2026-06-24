-- Rate limiting for chat API (5 requests per 12 hours per hashed client key)
create table if not exists chat_rate_limits (
  id bigserial primary key,
  client_key text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_rate_limits_lookup_idx
  on chat_rate_limits (client_key, created_at desc);

-- Atomic check-and-consume rate limit
create or replace function consume_chat_rate_limit(
  p_client_key text,
  p_max_requests int default 5,
  p_window_hours int default 12
)
returns table (
  allowed boolean,
  remaining int,
  reset_at timestamptz
)
language plpgsql
security definer
as $$
declare
  v_count int;
  v_oldest timestamptz;
  v_window interval;
begin
  v_window := make_interval(hours => p_window_hours);

  select count(*), min(created_at)
  into v_count, v_oldest
  from chat_rate_limits
  where client_key = p_client_key
    and created_at > now() - v_window;

  if v_count >= p_max_requests then
    return query select
      false::boolean,
      0::int,
      (v_oldest + v_window)::timestamptz;
    return;
  end if;

  insert into chat_rate_limits (client_key) values (p_client_key);

  return query select
    true::boolean,
    (p_max_requests - v_count - 1)::int,
    null::timestamptz;
end;
$$;
