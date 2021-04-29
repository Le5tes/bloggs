import { s3 } from "../configs/s3";
import { ImagesController } from "../controllers/images-controller";
import { checkSignIn } from "../middlewares/checkSignIn/checkSignIn";
import { ImagesService } from "../services/images-service"

export const getImagesRoutes = () => {
  const service = new ImagesService(s3);
  const controller = new ImagesController(service);

  var express = require('express');
  var router = express.Router();

  router.get('/', controller.getImage);

  router.get('/uploadUrl', checkSignIn, controller.getUploadUrl);

  return router;
}