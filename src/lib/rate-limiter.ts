interface RateLimiterOptions {
  maxAttempts: number;
  timeWindow: number;
}

export class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }>;
  private options: RateLimiterOptions;

  constructor(options: RateLimiterOptions) {
    this.attempts = new Map();
    this.options = options;
  }

  async isRateLimited(ip: string): Promise<boolean> {
    const attempt = this.attempts.get(ip);
    const now = Date.now();

    if (!attempt) {
      return false;
    }

    // Reset if time window has passed
    if (now - attempt.timestamp > this.options.timeWindow) {
      this.attempts.delete(ip);
      return false;
    }

    return attempt.count >= this.options.maxAttempts;
  }

  async increment(ip: string): Promise<void> {
    const attempt = this.attempts.get(ip);
    const now = Date.now();

    if (!attempt) {
      this.attempts.set(ip, { count: 1, timestamp: now });
      return;
    }

    // Reset if time window has passed
    if (now - attempt.timestamp > this.options.timeWindow) {
      this.attempts.set(ip, { count: 1, timestamp: now });
      return;
    }

    this.attempts.set(ip, { count: attempt.count + 1, timestamp: attempt.timestamp });
  }

  async reset(ip: string): Promise<void> {
    this.attempts.delete(ip);
  }
} 