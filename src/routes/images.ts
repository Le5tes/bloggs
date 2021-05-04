import { getS3 } from "../configs/s3";
import { ImagesController } from "../controllers/images-controller";
import { checkSignIn } from "../middlewares/checkSignIn/checkSignIn";
import { ImagesService } from "../services/images-service"

export const getImagesRoutes = () => {
  const service = new ImagesService(getS3);
  const controller = new ImagesController(service);

  var express = require('express');
  var router = express.Router();

  router.get('/:filename', controller.getImage);

  router.get('/uploadUrl/:filename', checkSignIn, controller.getUploadUrl);

  return router;
}