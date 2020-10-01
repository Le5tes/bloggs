import { userValidations } from "../middlewares/validations/validations";
import { UsersService } from "../services/users-service";
import {dataMapper} from '../datamapper'
import { UsersController } from "../controllers/users-controller";
import { checkMoreUsersAllowed } from "../middlewares/usersLimit/usersLimit";

export const getUsersRoutes = async () => {
  const service = await UsersService.create(dataMapper);
  const controller = new UsersController(service);

  var express = require('express');
  var router = express.Router();

  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/', checkMoreUsersAllowed, userValidations(), controller.postUser);

  router.post('/login', controller.login);

  router.get('/logout', controller.logout);

  return router;
}
