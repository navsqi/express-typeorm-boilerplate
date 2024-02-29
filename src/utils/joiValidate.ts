import Joi from 'joi';
import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';

interface JoiSchema {
  body?: any;
  params?: any;
  query?: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const joiValidate = (joiSchema: JoiSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (get(joiSchema, 'params')) {
        const schema = Joi.object().keys(joiSchema.params);

        const result = await schema.validate(req.params, { abortEarly: false, allowUnknown: true });
        if (result.error) throw result.error.details;
      }
      if (get(joiSchema, 'body')) {
        const schema = Joi.object().keys(joiSchema.body);

        const result = await schema.validate(req.body, { abortEarly: false, allowUnknown: true });
        if (result.error) throw result.error.details;
      }
      if (get(joiSchema, 'query')) {
        const schema = Joi.object().keys(joiSchema.query);

        const result = await schema.validate(req.query, { abortEarly: false, allowUnknown: true });
        if (result.error) throw result.error.details;
      }

      return next();
    } catch (e) {
      return next({ stack: e, name: 'PayloadValidationError' });
    }
  };
};

export default joiValidate;
