// Domain constants and role mapping logic

export const ALLOWED_IITPKD_DOMAIN = process.env.ALLOWED_IITPKD_DOMAIN || 'iitpkd.ac.in';
export const ALLOWED_STUDENT_DOMAIN = process.env.ALLOWED_STUDENT_DOMAIN || 'smail.iitpkd.ac.in';

export type UserRole = 'EMPLOYEE' | 'STUDENT' | 'OFFICE' | 'SECURITY' | 'ADMIN';

/**
 * Determines the role based on email domain.
 * Returns null if the domain is not recognized (deny access).
 */
export function getRoleFromEmailDomain(email: string): UserRole | null {
  const domain = email.split('@')[1]?.toLowerCase();

  if (!domain) return null;

  if (domain === ALLOWED_STUDENT_DOMAIN) {
    return 'STUDENT';
  }

  if (domain === ALLOWED_IITPKD_DOMAIN) {
    return 'EMPLOYEE';
  }

  // OFFICE and other roles are handled via AllowedGenericUser table lookup
  // This function only handles domain-based checks
  return null;
}
