// Email configuration — CC lists per department/role
// Populate these as departments are onboarded

export interface DepartmentEmailConfig {
    /** Primary contact email for this department */
    primary: string;
    /** CC emails that should be included on pass notifications */
    cc: string[];
}

/**
 * Map of department names to their email configurations.
 * Add entries as departments are onboarded into the system.
 */
export const departmentEmailConfig: Record<string, DepartmentEmailConfig> = {
    // Example:
    // 'Computer Science': {
    //   primary: 'office_cs@iitpkd.ac.in',
    //   cc: ['hod_cs@iitpkd.ac.in'],
    // },
};

/**
 * Default CC emails for student family visit pass approvals.
 * These are configurable and will be sent alongside the student and warden.
 */
export const studentFamilyVisitCC: string[] = [];

/**
 * Default CC emails for student exit pass approvals.
 */
export const studentExitPassCC: string[] = [];
