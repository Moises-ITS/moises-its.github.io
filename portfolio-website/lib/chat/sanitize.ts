export class InjectionDetectedError extends Error {
  constructor(message = "Message contains disallowed content") {
    super(message);
    this.name = "InjectionDetectedError";
  }
}

export class SanitizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SanitizationError";
  }
}

const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /you\s+are\s+now/i,
  /\bact\s+as\b/i,
  /pretend\s+(to\s+be|you'?re)/i,
  /\bsystem\s*:/i,
  /\[INST\]/i,
  /<<\s*SYS\s*>>/i,
  /<\/user_question>/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
  /\bjailbreak\b/i,
  /\bDAN\s+mode\b/i,
];

const MAX_CONSECUTIVE_NEWLINES = 3;
const MAX_NON_LETTER_RATIO = 0.5;

function stripControlChars(text: string): string {
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

function hasExcessiveNewlines(text: string): boolean {
  return new RegExp(`\\n{${MAX_CONSECUTIVE_NEWLINES + 1},}`).test(text);
}

function hasExcessiveNonLetterRatio(text: string): boolean {
  if (text.length === 0) return false;
  const lettersAndSpaces = (text.match(/[a-zA-Z\s]/g) ?? []).length;
  const ratio = 1 - lettersAndSpaces / text.length;
  return ratio > MAX_NON_LETTER_RATIO;
}

export function detectPromptInjection(text: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

export function sanitizeAndValidateMessage(raw: string): string {
  const normalized = raw.normalize("NFKC").trim();
  const stripped = stripControlChars(normalized);

  if (stripped.length === 0) {
    throw new SanitizationError("Message is required");
  }

  if (stripped.length > 500) {
    throw new SanitizationError("Message too long (max 500 characters)");
  }

  if (hasExcessiveNewlines(stripped)) {
    throw new SanitizationError("Message contains too many consecutive line breaks");
  }

  if (hasExcessiveNonLetterRatio(stripped)) {
    throw new SanitizationError("Message contains too many special characters");
  }

  if (detectPromptInjection(stripped)) {
    throw new InjectionDetectedError(
      "Your message contains disallowed content. Please ask a question about Moises's work or background."
    );
  }

  return stripped;
}
