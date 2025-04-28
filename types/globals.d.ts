export {}

// Create a type for the roles
export type Roles = 'marketing_admin1' | 'moderator'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}

// global.d.ts


declare global {
  interface Window {
    Razorpay: any;
  }
}