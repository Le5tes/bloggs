import { Logger } from "../utils/logger";
import { mockDataMapper } from "../utils/mock-datamapper";

var DataMapper = require('@aws/dynamodb-data-mapper').DataMapper;
var DynamoDB = require('aws-sdk/clients/dynamodb');

const logger = new Logger('datamapper');

const getDatamapper = () => {
  if (process.env.PRODENV ) {
    logger.info('connecting to db on aws'); 
    return new DataMapper({
      client: new DynamoDB({region: 'eu-west-2'}), // the SDK client used to execute operations
    })
  } else if (process.env.LOCALENV) {
    logger.info('connecting to local db'); 
    return new DataMapper({
      client: new DynamoDB({
        region: "local",
        endpoint: "http://localhost:8000"
      })
    });
  } else {
    logger.info('using mock datamapper'); 
    return mockDataMapper;
  }
}

export const dataMapper = getDatamapper();
