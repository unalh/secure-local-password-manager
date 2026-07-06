// Encryption utilities for secure-local-password-manager

import crypto from 'crypto';

/**
 * Encrypts data using AES-256-GCM.
 * @param {Buffer} key 32-byte encryption key.
 * @param {Buffer} plaintext Data to encrypt.
 * @returns {{ iv: Buffer, authTag: Buffer, ciphertext: Buffer }}
 */
export function encrypt(key: Buffer, plaintext: Buffer) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return { iv, authTag, ciphertext };
}

/**
 * Decrypts data encrypted with AES-256-GCM.
 * @param {Buffer} key 32-byte encryption key.
 * @param {Buffer} iv Initialization vector used during encryption.
 * @param {Buffer} authTag Authentication tag generated during encryption.
 * @param {Buffer} ciphertext Data to decrypt.
 * @returns {Buffer}
 */
export function decrypt(key: Buffer, iv: Buffer, authTag: Buffer, ciphertext: Buffer) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plaintext;
}
