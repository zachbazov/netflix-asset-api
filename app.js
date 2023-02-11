const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const csp = require("express-csp");
const cookieParser = require("cookie-parser");

const app = express();

// MARK: - PUG View Engine

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// MARK: - Serving Static Files

app.use(express.static(path.join(__dirname, "public")));

// MARK: - Trust Proxies
app.enable("trust proxy");

// MARK: - CORS

app.use(cors());

// MARK: - options

app.options("*", cors());

// MARK: - Security HTTP Headers

app.use(helmet());

// MARK: - Content Security Policy

csp.extend(app, {
  policy: {
    directives: {
      "default-src": ["self"],
      "style-src": ["self", "unsafe-inline", "https:"],
      "font-src": ["self", "https://fonts.gstatic.com"],
      "script-src": [
        "self",
        "unsafe-inline",
        "data",
        "blob",
        "https://js.stripe.com",
        "https://*.mapbox.com",
        "https://*.cloudflare.com/",
        "https://bundle.js:8828",
        "ws://localhost:56558/",
        "ws://127.0.0.1:50143/",
        "https://cdn.jsdelivr.net/npm/cropperjs@1.5.9/dist/cropper.min.js",
      ],
      "worker-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        "https://*.stripe.com",
        "https://*.mapbox.com",
        "https://*.cloudflare.com/",
        "https://bundle.js:*",
        "ws://localhost:*/",
        "ws://127.0.0.1:*/",
      ],
      "frame-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        "https://*.stripe.com",
        "https://*.mapbox.com",
        "https://*.cloudflare.com/",
        "https://bundle.js:*",
        "ws://localhost:*/",
        "ws://127.0.0.1:*/",
      ],
      "img-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        "https://*.stripe.com",
        "https://*.mapbox.com",
        "https://*.cloudflare.com/",
        "https://bundle.js:*",
        "ws://localhost:*/",
        "ws://127.0.0.1:*/",
      ],
      "connect-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        "https://*.stripe.com",
        "https://*.mapbox.com",
        "https://*.cloudflare.com/",
        "https://bundle.js:*",
        "ws://localhost:*/",
        "ws://127.0.0.1:*/",
      ],
    },
  },
});

// MARK: - Development Logger

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// MARK: - Rate Limit

const limiter = rateLimit({
  max: 2000,
  windowMs: 60 * 60 * 1000,
  message: "Reached request limit.",
});
app.use("/api/", limiter);

// MARK: - Body Parser

app.use(express.json({ limit: "100000kb" }));

// MARK: - Cookie Parser

app.use(cookieParser());

// MARK: - Security - Data Sanitization

app.use(mongoSanitize());

// MARK: - Security - XSS

app.use(xss());

// MARK: - Parameter Pollution Prevention

app.use(
  hpp({
    whitelist: [
      "duration",
      "rating",
      "seasonCount",
      "episodeCount",
      "isHD",
      "hasWatched",
      "newRelease",
      "slug",
    ],
  })
);

// MARK: - Compression

app.use(compression());

// MARK: -

app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  next();
});

// MARK: - Route Mounting

// MARK: - Error Handling Routes

// MARK: - Module Export

module.exports = app;
