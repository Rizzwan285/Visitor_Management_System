// Feature flags — controlled via environment variables
// These can be toggled without code changes

export const featureFlags = {
    /** If true, Employee guest passes require approval before activation */
    APPROVAL_REQUIRED_EMPLOYEE: process.env.APPROVAL_REQUIRED_EMPLOYEE === 'true',

    /** If true, Office visitor passes require approval before activation */
    APPROVAL_REQUIRED_OFFICE: process.env.APPROVAL_REQUIRED_OFFICE === 'true',
} as const;
