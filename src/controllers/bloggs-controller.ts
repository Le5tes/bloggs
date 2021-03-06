import { BloggsService } from "../services/bloggs-service";
import { Logger } from "../utils/logger";

export class BloggsController {
    private logger = new Logger('BloggsController');
    constructor(private service: BloggsService) {}

    postBlogg = async (req, res) => {
        this.logger.info('postBlogg')

        const username = req.session.user.username;
        const blogText = req.body.blog;
        const tags = req.body.tags;
        await this.service.createBlogg(username, blogText, tags);

        this.logger.info('blogg created')
        res.status(201).send();
    }

    getBloggs = async (req, res) => {
        this.logger.info('getting bloggs')

        const limit = req.query.limit || 1;
        const bloggs = await this.service.getBloggs(limit);

        this.logger.info('returning bloggs')
        res.status(200).send(bloggs);
    }
}
