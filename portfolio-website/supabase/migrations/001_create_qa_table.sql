-- Enable pgvector extension
create extension if not exists vector with schema extensions;

-- Q&A pairs table with embeddings
create table if not exists qa_pairs (
  id serial primary key,
  question text not null,
  answer text not null,
  keywords text[] not null default '{}',
  embedding vector(1536),
  created_at timestamptz not null default now()
);

-- Index for fast similarity search
create index if not exists qa_pairs_embedding_idx
  on qa_pairs
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 5);

-- RPC function for semantic search
create or replace function match_qa_pairs(
  query_embedding vector(1536),
  match_threshold float default 0.78,
  match_count int default 3
)
returns table (
  id int,
  question text,
  answer text,
  keywords text[],
  similarity float
)
language sql stable
as $$
  select
    qa_pairs.id,
    qa_pairs.question,
    qa_pairs.answer,
    qa_pairs.keywords,
    1 - (qa_pairs.embedding <=> query_embedding) as similarity
  from qa_pairs
  where 1 - (qa_pairs.embedding <=> query_embedding) > match_threshold
  order by qa_pairs.embedding <=> query_embedding
  limit match_count;
$$;
