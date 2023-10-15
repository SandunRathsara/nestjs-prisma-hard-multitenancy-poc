import * as Joi from 'joi';

export type TenantTable = {
  id: number;
  code: string;
  enabled: boolean;
};

export const TenantTableSchema = Joi.object<TenantTable>({
  id: Joi.number().required(),
  code: Joi.string().required(),
  enabled: Joi.bool().required(),
});
