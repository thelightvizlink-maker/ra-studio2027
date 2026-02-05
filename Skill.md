---
name: security-scan
description: Scan codebase for security vulnerabilities including OWASP Top 10, injection flaws, authentication issues, and sensitive data exposure. Use when asked to check security, audit code, or find vulnerabilities.
---

# Security Analysis Skill

## Purpose
Perform comprehensive security analysis of the codebase, identifying vulnerabilities and providing actionable remediation guidance.

## Scope
Analyze code for:
- **Injection vulnerabilities**: SQL, NoSQL, OS command, LDAP injection
- **Authentication flaws**: Weak passwords, missing MFA, session issues
- **Sensitive data exposure**: Hardcoded secrets, unencrypted data, logging PII
- **XML/XXE vulnerabilities**: External entity processing risks
- **Access control issues**: Missing authorization, privilege escalation
- **Security misconfigurations**: Debug modes, default credentials, verbose errors
- **XSS vulnerabilities**: Reflected, stored, and DOM-based XSS
- **Insecure deserialization**: Untrusted data deserialization
- **Dependency vulnerabilities**: Known CVEs in packages
- **Insufficient logging**: Missing audit trails, error suppression

## Workflow

1. **Identify technology stack** - Determine languages, frameworks, and dependencies
2. **Scan for hardcoded secrets** - API keys, passwords, tokens in code
3. **Check input validation** - User input handling and sanitization
4. **Review authentication** - Login flows, session management, password policies
5. **Analyze data handling** - Encryption, storage, transmission security
6. **Examine dependencies** - Check package.json, requirements.txt, go.mod for known vulnerabilities
7. **Review API security** - Rate limiting, authentication, input validation

## Output Format

### Security Scan Report

**Risk Level**: Critical | High | Medium | Low

#### Critical Issues
- [File:Line] Issue description
  - **Impact**: What could happen
  - **Fix**: How to remediate

#### High Issues
...

#### Recommendations
1. Immediate actions
2. Short-term improvements
3. Long-term security posture

## Language-Specific Checks

### JavaScript/TypeScript
- Dynamic code execution patterns
- innerHTML assignments without sanitization
- Missing Content-Security-Policy
- Prototype pollution risks

### Python
- Pickle with untrusted data
- shell=True in subprocess calls
- SQL string concatenation
- Debug mode in production

### Go
- Unchecked errors
- Race conditions
- Unsafe pointer usage