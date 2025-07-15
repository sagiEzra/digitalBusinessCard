// Card creation limits by user role
export const roleLimits: Record<string, number> = {
  none: 0,
  single: 1,
  multi: 3,
  admin: Infinity,
}; 