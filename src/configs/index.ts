import * as Joi from 'joi';

export const configs = () => ({
  port: parseInt(process.env.PORT),
  database_url_mltnt: process.env.DATABASE_URL_MLTNT,
});

export const CONFIGS = {
  PORT: 'port',
  DATABASE_URL_MLTNT: 'database_url_mltnt',
};

// Validation for environmental variables
export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_URL_MLTNT: Joi.string().required(),
});
