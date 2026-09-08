import crypto from 'crypto';

export function hashPassword(password: string): string {
  return crypto.createHash('md5').update(password).digest('hex');
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
