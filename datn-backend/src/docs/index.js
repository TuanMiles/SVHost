import YAML from 'yamljs';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { swaggerDefinition } from '../configs/swagger.config.js';

const router = express.Router();

const useSwagger =
  (schema) =>
  (...args) =>
    swaggerUI.setup(schema)(...args);

const swaggerDocs = [
  {
    endPoint: 'Size',
    Docs: YAML.load('./src/docs/size.doc.yaml'),
  },
  {
    endPoint: 'Products',
    Docs: YAML.load('./src/docs/product.doc.yaml'),
  },
  {
    endPoint: 'Category',
    Docs: YAML.load('./src/docs/category.doc.yaml'),
  },
  {
    endPoint: 'Topping',
    Docs: YAML.load('./src/docs/topping.doc.yaml'),
  },
  {
    endPoint: 'uploadfile',
    Docs: YAML.load('./src/docs/uploadfile.doc.yaml'),
  },
  {
    endPoint: 'Roles',
    Docs: YAML.load('./src/docs/role.doc.yaml'),
  },
  {
    endPoint: 'User',
    Docs: YAML.load('./src/docs/autho.doc.yaml'),
  },
  {
    endPoint: 'User',
    Docs: YAML.load('./src/docs/order.doc.yaml'),
  },
  {
    endPoint: '',
    Docs: swaggerDefinition,
  },
];

const middleSwaggers = swaggerDocs.map((swaggerRoute) => {
  return router.use(`/${swaggerRoute.endPoint}`, swaggerUI.serve, useSwagger(swaggerRoute.Docs));
});

export default middleSwaggers;
