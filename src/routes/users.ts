import { userValidations } from "../middlewares/validations/validations";
import { UsersService } from "../services/users-service";
import {dataMapper} from '../configs/datamapper'
import { UsersController } from "../controllers/users-controller";
import { checkMoreUsersAllowed } from "../middlewares/usersLimit/usersLimit";
import { checkSignIn } from "../middlewares/checkSignIn/checkSignIn";

export const getUsersRoutes = async () => {
  const service = await UsersService.create(dataMapper);
  const controller = new UsersController(service);

  var express = require('express');
  var router = express.Router();

  router.post('/', checkMoreUsersAllowed, userValidations(), controller.postUser);
  
  router.get('/loggedIn', checkSignIn, controller.getCurrentUser);
  
  router.post('/login', controller.login);

  router.get('/logout', controller.logout);

  return router;
}
