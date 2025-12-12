import dotenv from "dotenv"
import path from 'path'

export default async function globalSetup() {
  // Determine env file path. Project uses resources/.env.* files by convention.
  const envFile = process.env.test_env ? `resources/.env.${process.env.test_env}` : '.env';
  const envPath = path.resolve(process.cwd(), envFile);

  // If dotenv hasn't loaded variables yet or you explicitly want to override, load it.
  dotenv.config({
    path: envPath,
    override: true,
    quiet: true
  });

  // Helpful log for debugging when running locally
  // Playwright on CI may suppress stdout, but this helps during development.
  // Avoid throwing if file is missing; dotenv.config() returns an object with parsed or error.
  console.log(`Loaded environment variables from: ${envPath}`);
}