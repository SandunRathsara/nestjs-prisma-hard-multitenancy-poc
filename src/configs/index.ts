import * as Joi from 'joi';

export const configs = () => ({
  port: parseInt(process.env.PORT),
  database_url_mltnt: process.env.DATABASE_URL_MLTNT,

  pghost: process.env.PGHOST,
  pguser: process.env.PGUSER,
  pgdatabase: process.env.PGDATABASE,
  pgpassword: process.env.PGPASSWORD,
  pgport: process.env.PGPORT,

  redis_url: process.env.REDIS_URL,
});

export const CONFIGS = {
  PORT: 'port',
  DATABASE_URL_MLTNT: 'database_url_mltnt',

  PGHOST: 'pghost',
  PGUSER: 'pguser',
  PGDATABASE: 'pgdatabase',
  PGPASSWORD: 'pgpassword',
  PGPORT: 'pgport',

  REDIS_URL: 'redis_url',
};

// Validation for environmental variables
export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_URL_MLTNT: Joi.string().required(),

  PGHOST: Joi.string().required(),
  PGUSER: Joi.string().required(),
  PGDATABASE: Joi.string().required(),
  PGPASSWORD: Joi.string().required(),
  PGPORT: Joi.string().required(),

  REDIS_URL: Joi.string().required(),
});
