import { checkSignIn } from "../middlewares/checkSignIn/checkSignIn";
import { BloggsService } from "../services/bloggs-service";
import { dataMapper } from "../datamapper";
import { BloggsController } from "../controllers/bloggs-controller";

export const getBloggsRoutes = async () => {
  const service = await BloggsService.create(dataMapper);
  const controller = new BloggsController(service);

  var express = require('express');
  var router = express.Router();

  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/', checkSignIn, controller.postBlogg);

  return router;
}
