import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class HashGenerator {
  // For AES, this is always 16

  static encrypt(password: string) {
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
    const IV_LENGTH = 16;
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(
      'aes-256-ctr',
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(password);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  static decrypt(hash: string) {
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
    const textParts = hash.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}
