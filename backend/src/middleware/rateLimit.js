const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

const analyzeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => req.user?._id?.toString() || ipKeyGenerator(req.ip),
  message: {
    error: {
      message: "Too many analyses - please wait a minute and retry.",
    },
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => req.user?._id?.toString() || ipKeyGenerator(req.ip),
  message: {
    error: {
      message: "Too many authentication attempts - please try again later.",
    },
  },
});

module.exports = { analyzeLimiter, authLimiter };
