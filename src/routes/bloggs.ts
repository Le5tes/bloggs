import { checkSignIn } from "../middlewares/checkSignIn/checkSignIn";
import { BloggsService } from "../services/bloggs-service";
import { dataMapper } from "../configs/datamapper";
import { BloggsController } from "../controllers/bloggs-controller";
const asyncHandler = require('express-async-handler');

export const getBloggsRoutes = async () => {
  const service = await BloggsService.create(dataMapper);
  const controller = new BloggsController(service);

  var express = require('express');
  var router = express.Router();

  router.get('/', asyncHandler(controller.getBloggs));

  router.post('/', checkSignIn, asyncHandler(controller.postBlogg));

  return router;
}
