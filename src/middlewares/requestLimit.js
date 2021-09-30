import { RateLimiterMemory } from 'rate-limiter-flexible'
const config = process.env;

const opts = {
  points: 30, // 6 points
  duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

export const rateLimiterMiddleware = (req, res, next) => {
  const userToken = req.body.token;
  // Consume 1 point for each action
  // This

  rateLimiter.consume(userToken) // or req.ip
  .then(() => {
    next();
  })
  .catch((rejRes) => {
    res.status(429).send(`You are currently limited to 30`);
  });

};