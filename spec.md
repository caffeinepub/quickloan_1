# QuickLoan

## Current State
New project, no existing code.

## Requested Changes (Diff)

### Add
- Home page: hero section, loan services overview, how it works steps, testimonials, CTA
- Loan application form: name, email, WhatsApp number, loan amount dropdown ($500-$10,000), interest rate display (calculated based on amount/term), term dropdown (6/12/24/36 months)
- Admin login page: hardcoded credentials, session-based authentication
- Admin dashboard: table of all loan applications, WhatsApp number visible only here
- Privacy: WhatsApp numbers stored but never returned to public-facing queries

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: store loan applications with all fields including WhatsApp. Expose public submit endpoint (no WhatsApp in response). Expose admin-only getAll endpoint that returns full data including WhatsApp. Admin auth via simple password check returning a session token.
2. Frontend pages: Home (hero + services + testimonials), Apply (form), Admin Login, Admin Dashboard
3. Navigation between pages
4. Interest rate calculated client-side based on amount and term
5. Admin dashboard protected by login token stored in localStorage
