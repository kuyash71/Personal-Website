# Security Baseline

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `SEC-001` |
| Owner | `Kuyash` |
| Security Reviewer | `TBD` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Scope and Security Objectives

- In scope assets:
  - Public localized pages (`/tr/*`, `/en/*`)
  - `POST /api/contact`
  - Environment secrets for email provider
- Data handled:
  - Contact fields: name, email, subject, message
  - Minimal operational logging
- Security objectives:
  - Protect contact endpoint against abuse.
  - Prevent payload-based injection vectors.
  - Keep secrets server-side only.

## 2. Threat Model Summary

| Threat | Attack Surface | Impact | Control | Residual Risk |
| --- | --- | --- | --- | --- |
| Bot spam flood | Contact form/API | High | Honeypot + rate-limit + validation | Medium |
| Input injection/XSS payloads | Form fields/rendering | High | Strict server-side validation + safe output handling | Low |
| Secret leakage | Runtime/config | High | Env-only credentials, no client exposure | Low |
| Misconfigured response headers | Public routes | Medium | Security header policy (CSP/HSTS/etc.) | Low |
| Dependency CVEs | Build/runtime dependencies | Medium | Scheduled dependency checks | Medium |

## 3. Security Controls

### 3.1 Application Security

- Input validation:
  All contact fields are validated server-side.
- Output safety:
  Avoid rendering untrusted HTML directly.
- Secure headers:
  Document and enforce CSP/HSTS/nosniff/frame protections.
- CSRF strategy:
  Restrict to intended method and origin-aware deployment defaults.
- Rate limiting:
  IP-based windowing via `isAllowedByRateLimit`.
- Payload size controls:
  Contact endpoint rejects oversized request bodies using `CONTACT_MAX_PAYLOAD_BYTES`.

### 3.2 Authentication and Authorization

- v1 model:
  No user authentication.
- Access model:
  Public read-only pages with constrained write path via contact endpoint.

### 3.3 Data Protection

- In transit:
  HTTPS/TLS required in production.
- At rest:
  Minimal storage by default.
- Secrets:
  Env variables only.
- Data minimization:
  Collect only required contact fields.

## 4. Dependency and Supply Chain

- Update cadence:
  Monthly routine, immediate action for critical vulnerabilities.
- Scanning baseline:
  CLI/CI dependency audit checks.
- Lockfile discipline:
  Keep deterministic installs in repository workflow.

## 5. Logging, Monitoring, and Alerting

- Track:
  Contact request outcomes and rate-limit events.
- Alert channel:
  Platform notifications and/or email.
- Severity levels:
  `Sev1`, `Sev2`, `Sev3`.

## 6. Incident Response

| Phase | Owner | SLA | Notes |
| --- | --- | --- | --- |
| Detection | Owner | 24h | Detect abnormal error/failure trends |
| Triage | Owner | 24h | Assess blast radius and severity |
| Containment | Owner | 48h | Temporarily restrict endpoint / rotate secrets |
| Recovery | Owner | 72h | Patch and redeploy |
| Postmortem | Owner | 7 days | Record cause, timeline, prevention actions |

## 7. Security Testing Plan

- [ ] SAST on pull requests.
- [ ] Dependency scanning in CI.
- [ ] Security header verification.
- [ ] Basic staging abuse-case tests.
- [ ] Manual pre-release security review.

## 8. Privacy

- Data intent notice:
  Contact form explains purpose of collected data.
- Deletion model:
  If retained, delete on request.
- Cookies:
  No non-essential tracking cookies by default.

## 9. Exceptions and Risk Acceptance

| Exception | Justification | Expiry | Approver |
| --- | --- | --- | --- |
| `None` | `N/A` | `N/A` | `N/A` |

## 10. Open Actions

- [ ] Finalize production security header configuration.
- [ ] Validate abuse-case thresholds with real traffic assumptions.
- [ ] Confirm provider fallback behavior for email outages.
