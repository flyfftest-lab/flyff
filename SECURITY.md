# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly. **Do not open a public GitHub issue for security vulnerabilities.**

Instead, please send an email to [INSERT CONTACT EMAIL] with:

1. Description of the vulnerability
2. Steps to reproduce the issue
3. Potential impact
4. Suggested fix (if you have one)

We will acknowledge receipt within 48 hours and provide an estimated timeline for a fix.

## Security Considerations

This project is a **fan reimplementation of Flyff v15 for educational purposes**. Please be aware of the following security considerations:

### Authentication & Authorization

- **Password hashing**: Currently uses MD5 (legacy, matches original Flyff protocol). For production use, consider upgrading to bcrypt or Argon2.
- **WebSocket authentication**: Login flow uses JWT tokens after initial CERTIFY handshake.
- **Server secrets**: `.env` file contains `LOGIN_SERVER_SECRET` and `GAME_SERVER_SECRET`. **Never commit `.env` files to version control.**

### Network Protocol

- **Binary protocol**: Uses original CAr serialization format (little-endian). All packets are server-authoritative.
- **No encryption**: WebSocket connections are unencrypted (ws://). For production, implement TLS (wss://).
- **No rate limiting**: Currently no rate limiting on login attempts or packet flooding. Implement before public deployment.

### Database

- **SQL injection**: Uses parameterized queries via Drizzle ORM. Never concatenate user input into SQL strings.
- **Database credentials**: Stored in `.env` file. Use strong passwords in production.

### Client (WASM)

- **Client-side only**: The WASM client is a renderer only. All game logic is server-authoritative.
- **No client-side validation**: Trust boundary is at the server. Client should never be trusted for game state.

### Known Limitations

This is an educational project and has **not been security-hardened for production use**:

- No HTTPS/WSS enforcement
- No rate limiting
- No DDoS protection
- No intrusion detection
- MD5 password hashing (legacy compatibility)
- No CSRF protection (not applicable for WebSocket-only app)
- No input sanitization on chat messages (potential XSS if rendered as HTML)

## Best Practices for Contributors

When contributing to this project:

1. **Never commit secrets**: API keys, passwords, tokens, or database credentials
2. **Use parameterized queries**: Never use string concatenation for SQL
3. **Validate all input**: Check packet sizes, bounds, and types before processing
4. **Keep dependencies updated**: Regularly audit with `npm audit` or `pnpm audit`
5. **Follow the principle of least privilege**: Servers should only have the permissions they need
6. **Log security events**: Authentication failures, invalid packets, etc.

## Security Tools

Consider using these tools to audit the codebase:

```bash
# Check for known vulnerabilities in dependencies
pnpm audit

# TypeScript strict mode is enabled (helps catch type-related bugs)
pnpm build
```

## Acknowledgments

We appreciate security researchers who responsibly disclose vulnerabilities. Contributors who report valid security issues will be credited in the project (unless they prefer to remain anonymous).
