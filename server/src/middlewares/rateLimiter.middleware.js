import rateLimiter from "express-rate-limit";

const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, 
  max: 60,
  message: "Too many requests from this IP, please try after a minute.",
});

export { limiter };