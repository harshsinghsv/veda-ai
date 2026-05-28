import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const connectTimeout = Number(process.env.REDIS_CONNECT_TIMEOUT) || 10000;
const tlsRejectUnauthorized = process.env.REDIS_TLS_REJECT_UNAUTHORIZED !== 'false';

const redisOptions: any = {
  maxRetriesPerRequest: null, // Required by BullMQ
  connectTimeout,
  retryStrategy(times: number) {
    return Math.min(times * 50, 2000);
  },
};

try {
  const parsed = new URL(redisUrl);
  if (parsed.protocol === 'rediss:') {
    // When using TLS (rediss://) some cloud providers require turning off
    // certificate verification for certain environments. Allow overriding
    // via REDIS_TLS_REJECT_UNAUTHORIZED=false
    redisOptions.tls = { rejectUnauthorized: tlsRejectUnauthorized };
  }
} catch (err) {
  // ignore URL parse errors and continue with defaults
}

export const redisConnection = new Redis(redisUrl, redisOptions);

redisConnection.on('connect', () => console.log('Redis connected'));
redisConnection.on('ready', () => console.log('Redis ready'));
redisConnection.on('error', (err) => console.error('Redis error:', err));
redisConnection.on('close', () => console.log('Redis connection closed'));

export default redisConnection;