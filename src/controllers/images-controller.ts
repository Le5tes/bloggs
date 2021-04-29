import { ImagesService } from "../services/images-service";
import { Logger } from "../utils/logger";

export class ImagesController {
    private logger = new Logger('ImagesController');

    constructor(private service: ImagesService) {}

    getImage = (req, res) => {
        const preSignedUrl = this.service.getImageUrl(req.query.filename);

        res.status(301).send();
    }

    getUploadUrl = (req,res) => {

        res.status(200).send();
    }
}
