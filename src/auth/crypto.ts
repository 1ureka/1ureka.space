/**
 *  Cryptography Functions
 *  Forked from AndiDittrich/AesUtil.js
 *  https://gist.github.com/AndiDittrich/4629e7db04819244e843
 */

import "server-only";
import crypto, { CipherGCM, CipherGCMTypes, DecipherGCM } from "crypto";
type Password = string | Buffer | NodeJS.TypedArray | DataView;

/**
 * Get encryption/decryption algorithm
 */
function getAlgorithm(): CipherGCMTypes {
  return "aes-256-gcm";
}

/**
 * Derive 256 bit encryption key from password, using salt and iterations -> 32 bytes
 */
function deriveKeyFromPassword(
  password: Password,
  salt: Buffer,
  iterations: number
): Buffer {
  return crypto.pbkdf2Sync(password, salt, iterations, 32, "sha512");
}

/**
 * Encrypt AES 256 GCM
 */
export function encryptAesGcm(imageData: Buffer, password: Password) {
  try {
    const algorithm: CipherGCMTypes = getAlgorithm();

    // Generate random salt, initialization vector -> 64 bytes + 16 bytes
    const salt = crypto.randomBytes(64);
    const iv = crypto.randomBytes(16);

    // Derive encryption key
    const iterations = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    const encryptionKey = deriveKeyFromPassword(password, salt, iterations);

    // Create cipher
    const cipher: CipherGCM = crypto.createCipheriv(
      algorithm,
      encryptionKey,
      iv
    );

    // Update the cipher with data to be encrypted and close cipher
    const encryptedData = Buffer.concat([
      cipher.update(imageData),
      cipher.final(),
    ]);

    // Get authTag from cipher for decryption // 16 bytes
    const authTag = cipher.getAuthTag();

    // Join all data into single buffer, include requirements for decryption
    const iterationsBuffer = Buffer.alloc(4);
    iterationsBuffer.writeUInt32BE(iterations, 0);

    return Buffer.concat([salt, iv, authTag, iterationsBuffer, encryptedData]);
  } catch (error) {
    console.error("Encryption failed!");
    console.error(error);
    return void 0;
  }
}

/**
 * Decrypt AES 256 GCM
 */
export function decryptAesGcm(imageData: Buffer, password: Password) {
  try {
    const algorithm: CipherGCMTypes = getAlgorithm();

    // Split imageData into partials
    const salt: Buffer = imageData.subarray(0, 64);
    const iv: Buffer = imageData.subarray(64, 80);
    const authTag: Buffer = imageData.subarray(80, 96);
    const iterations: number = imageData.readUInt32BE(96);
    const encryptedData: Buffer = imageData.subarray(100);

    // Derive key
    const decryptionKey = deriveKeyFromPassword(password, salt, iterations);

    // Create decipher
    const decipher: DecipherGCM = crypto.createDecipheriv(
      algorithm,
      decryptionKey,
      iv
    );
    decipher.setAuthTag(authTag);

    // Decrypt data
    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);

    return decrypted;
  } catch (error) {
    console.error("Decryption failed!");
    console.error(error);
    return void 0;
  }
}

/**
 * Salt and hash password
 */
export function hashPassword(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
}
