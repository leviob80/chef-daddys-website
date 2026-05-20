export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/[<>]/g, '')
    .slice(0, 2000);
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export function isValidPhone(phone: string): boolean {
  return /^[\d\s\-().+]{7,20}$/.test(phone);
}

export function isValidName(name: string): boolean {
  return name.length >= 2 && name.length <= 100 && /^[a-zA-Z\s'\-]+$/.test(name);
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface CateringFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  guestCount: string;
  specialRequests: string;
  honeypot?: string;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || !isValidName(sanitizeString(data.name))) {
    errors.name = 'Please enter a valid name (letters only, 2-100 characters).';
  }
  if (!data.email || !isValidEmail(sanitizeString(data.email))) {
    errors.email = 'Please enter a valid email address.';
  }
  if (data.phone && !isValidPhone(sanitizeString(data.phone))) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!data.subject || sanitizeString(data.subject).length < 2) {
    errors.subject = 'Please enter a subject.';
  }
  if (!data.message || sanitizeString(data.message).length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateCateringForm(data: CateringFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || !isValidName(sanitizeString(data.name))) {
    errors.name = 'Please enter a valid name.';
  }
  if (!data.email || !isValidEmail(sanitizeString(data.email))) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.phone || !isValidPhone(sanitizeString(data.phone))) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!data.eventDate) {
    errors.eventDate = 'Please select an event date.';
  }
  if (!data.eventType || sanitizeString(data.eventType).length < 2) {
    errors.eventType = 'Please describe the event type.';
  }
  const guests = parseInt(sanitizeString(data.guestCount), 10);
  if (isNaN(guests) || guests < 1 || guests > 10000) {
    errors.guestCount = 'Please enter a valid guest count.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}
