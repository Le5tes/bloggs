import { mockDataMapper } from "./utils/mock-datamapper";

var DataMapper = require('@aws/dynamodb-data-mapper').DataMapper;
var DynamoDB = require('aws-sdk/clients/dynamodb');

export const dataMapper = process.env.PRODENV ? new DataMapper({
  client: new DynamoDB({region: 'eu-west-2'}), // the SDK client used to execute operations
}): mockDataMapper;
