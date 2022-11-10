export class Url {
  private id: number | string;
  private originalUrl: string;
  private shortenedKey: string;

  constructor(id?: number | string, originalUrl?: string, shortenedKey?: string) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.shortenedKey = shortenedKey;
  }

  getId(): number | string {
    return this?.id;
  }

  getOriginalUrl(): string {
    return this?.originalUrl;
  }

  getShortenedKey(): string {
    return this?.shortenedKey;
  }

  getShortenedUrl(): string {
    return `${process.env.APPLICATION_URL}/${this.shortenedKey}`;
  }

  setId(id: number | string): void {
    this.id = id;
  }

  setOriginalUrl(originalUrl: string): void {
    this.assertUrlIsValid(originalUrl);
    this.originalUrl = originalUrl;
  }

  setShortenedKey(shortenedKey: string): void {
    this.assertShortenedKeyIsValid(shortenedKey);
    this.shortenedKey = shortenedKey;
  }

  private assertUrlIsValid(url: string): void {
    try { 
      new URL(url); 
    } catch(e) {
      throw new InvalidUrlError(url); 
    }
  }

  private assertShortenedKeyIsValid(shortenedKey: string): void {
    if (shortenedKey.length < 4 || shortenedKey.length > 12) {
      throw new InvalidShortenedKeyError(shortenedKey);
    }
  }
}

export class InvalidUrlError extends Error {
  constructor(url?: string) {
    super(`${url} is not a valid URL`);
    this.name = 'InvalidUrlError';
  }
}

export class InvalidShortenedKeyError extends Error {
  constructor(shortenedKey?: string) {
    super(`Invalid shortened key ${shortenedKey}`);
    this.name = 'InvalidShortenedKeyError';
  }
}