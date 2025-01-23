import { DataSource } from 'typeorm';
import { Account } from '../entities/account.entity';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'db',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: 'postgres',
  database: process.env.DATABASE_NAME || 'your_db_name',
  entities: [Account],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  ssl: false,
  extra: {
    connectionTimeoutMillis: 5000,
  },
});

export default AppDataSource;
