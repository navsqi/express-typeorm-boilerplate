import Joi from 'joi';
import joiValidate from '~/utils/joiValidate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loginVal = joiValidate({
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
});

export const registerVal = joiValidate({
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
});

const authVal = {
  loginVal,
  registerVal,
};

export default authVal;
