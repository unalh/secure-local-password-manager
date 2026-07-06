# Security Model

## Local-First Design

Vault data is stored locally on the user's machine. The application does not require a cloud account.

## Master Password

The master password is never stored directly. Argon2id is used for password-based key derivation.

## Encryption

Vault data is encrypted using a symmetric encryption algorithm (AES-256 in GCM mode) before being written to disk.

## Threat Model

The application is designed to protect stored credentials from:
- Casual file access
- Plaintext credential exposure
- Basic offline vault inspection

## Limitations

This project is an educational security project and has not undergone an independent security audit.
