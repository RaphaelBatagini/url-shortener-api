const path = require('path');
const fs = require('fs');
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');
const dotenv = require('dotenv');

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV must be defined');
}

const envFilePath = path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`);

let envs;

if (process.env.NODE_ENV !== 'production' && fs.existsSync(envFilePath)) {
  envs = dotenv.config({ path: envFilePath }).parsed;
  dotenv.config({ path: envFilePath });
} else {
  envs = dotenv.config().parsed;
  dotenv.config();
}

const rootDir =
  fs.existsSync(path.resolve(__dirname, 'dist')) && process.env.NODE_ENV === 'production' ? 'dist' : 'src';

module.exports = {
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`${rootDir}/infra/database/models/*.{ts,js}`],
  migrations: [`${rootDir}/infra/database/migrations/*.{ts,js}`],
  migrationsTransactionMode: 'each',
};