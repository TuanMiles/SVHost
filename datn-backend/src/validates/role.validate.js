import joi from 'joi';

const RoleValidate = joi.object({
  name: joi.string().required({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  users: joi.array().items(joi.string()),
  status: joi.string().valid('active', 'inactive'),
});

export default RoleValidate;
