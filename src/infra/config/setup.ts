import path from 'path';
import * as dotenv from 'dotenv';
import fs from 'fs';

export function loadEnvironmentVariables(): void {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV must be defined');
  }

  const envFilePath = path.resolve(__dirname, `./../../../.env.${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV !== 'production' && fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
  } else {
    dotenv.config();
  }
}