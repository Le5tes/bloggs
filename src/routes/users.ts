import { userValidations } from "../validations/validations";
import { UsersService } from "../services/users-service";
import {dataMapper} from '../datamapper'

var service = new UsersService(dataMapper);

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', userValidations(), async function(req, res, next) {
  await service.createUser(req.body.username, req.body.password);

  res.status(201).send();
});

router.post('/login', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;