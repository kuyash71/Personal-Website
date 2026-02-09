#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const args = { target: "development", file: null };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (current.startsWith("--target=")) {
      args.target = current.split("=")[1] ?? args.target;
    } else if (current === "--target") {
      args.target = argv[i + 1] ?? args.target;
      i += 1;
    } else if (current.startsWith("--file=")) {
      args.file = current.split("=")[1] ?? null;
    } else if (current === "--file") {
      args.file = argv[i + 1] ?? null;
      i += 1;
    }
  }

  return args;
}

function stripQuotes(value) {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function loadEnvFile(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const raw = fs.readFileSync(absolutePath, "utf8");
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = stripQuotes(trimmed.slice(separatorIndex + 1).trim());

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseFromAddress(value) {
  const match = value.match(/<([^<>]+)>/);
  return match?.[1] ?? value;
}

function isPositiveIntegerString(value) {
  return /^[1-9]\d*$/.test(value);
}

function validateEnvironment(target) {
  const requiredKeys = [
    "CONTACT_TO_EMAIL",
    "EMAIL_PROVIDER",
    "EMAIL_API_KEY",
    "EMAIL_FROM",
    "RATE_LIMIT_WINDOW_MS",
    "RATE_LIMIT_MAX_REQUESTS"
  ];

  const optionalPositiveIntKeys = ["CONTACT_MAX_PAYLOAD_BYTES"];

  const errors = [];
  const warnings = [];

  for (const key of requiredKeys) {
    const value = process.env[key];
    if (!value || value.trim().length === 0) {
      errors.push(`${key} is missing or empty.`);
    }
  }

  if ((process.env.EMAIL_PROVIDER ?? "").trim().toLowerCase() !== "resend") {
    errors.push("EMAIL_PROVIDER must be 'resend' because only Resend is implemented.");
  }

  const contactEmail = process.env.CONTACT_TO_EMAIL ?? "";
  if (contactEmail && !isValidEmail(contactEmail.trim())) {
    errors.push("CONTACT_TO_EMAIL must be a valid email address.");
  }

  const fromValue = process.env.EMAIL_FROM ?? "";
  if (fromValue) {
    const extracted = parseFromAddress(fromValue.trim());
    if (!isValidEmail(extracted)) {
      errors.push("EMAIL_FROM must be a valid sender email or 'Display Name <email@domain>'.");
    }
  }

  const rateLimitWindow = process.env.RATE_LIMIT_WINDOW_MS ?? "";
  if (rateLimitWindow && !isPositiveIntegerString(rateLimitWindow.trim())) {
    errors.push("RATE_LIMIT_WINDOW_MS must be a positive integer.");
  }

  const rateLimitMax = process.env.RATE_LIMIT_MAX_REQUESTS ?? "";
  if (rateLimitMax && !isPositiveIntegerString(rateLimitMax.trim())) {
    errors.push("RATE_LIMIT_MAX_REQUESTS must be a positive integer.");
  }

  for (const key of optionalPositiveIntKeys) {
    const value = process.env[key];
    if (value && value.trim().length > 0 && !isPositiveIntegerString(value.trim())) {
      errors.push(`${key} must be a positive integer when provided.`);
    }
  }

  const nodeEnv = (process.env.NODE_ENV ?? "").trim();
  if (target === "production") {
    if (!nodeEnv) {
      warnings.push("NODE_ENV is not set explicitly. Platform runtime usually injects 'production'.");
    } else if (nodeEnv !== "production") {
      errors.push(`NODE_ENV must be 'production' for production target (current: '${nodeEnv}').`);
    }
  } else if (target === "development" && nodeEnv && nodeEnv !== "development") {
    warnings.push(`NODE_ENV is '${nodeEnv}' while running development target checks.`);
  }

  return { errors, warnings };
}

function printSummary(target, file, errors, warnings) {
  console.log(`Environment verification target: ${target}`);
  if (file) {
    console.log(`Loaded env file: ${path.resolve(process.cwd(), file)}`);
  }

  if (warnings.length > 0) {
    console.log("");
    console.log("[WARN]");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.log("");
    console.log("[ERROR]");
    for (const error of errors) {
      console.log(`- ${error}`);
    }
    console.log("");
    console.log("Environment verification failed.");
    process.exit(1);
  }

  console.log("");
  console.log("[OK] Environment verification passed.");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const target = args.target === "production" ? "production" : "development";

  if (args.file) {
    loadEnvFile(args.file);
  }

  const { errors, warnings } = validateEnvironment(target);
  printSummary(target, args.file, errors, warnings);
}

main();
