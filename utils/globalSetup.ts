import { FullConfig } from "@playwright/test";
import dotenv from "dotenv"

async function globalSetup(config: FullConfig) {
  // Load .env file based on test_env variable, or default to .env
  const envFile = process.env.test_env ? `resources/.env.${process.env.test_env}` : 'resources/.env';
  
  dotenv.config({
    path: envFile,
    override: true,
    quiet: true
  });
  
  console.log(`Loaded environment variables from: ${envFile}`);
}

export default globalSetup;