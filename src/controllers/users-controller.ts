import { UsersService } from "../services/users-service";
import { Logger } from "../utils/logger";

export class UsersController {
    private logger = new Logger('UsersController');

    constructor (private service: UsersService) {}

    postUser = async (req, res) => {
        this.logger.info('postUser')

        await this.service.createUser(req.body.username, req.body.password);

        this.logger.info('user created')
        res.status(201).send();
    }

    login = async (req, res) => {
        this.logger.info('login')

        req.session.user = await this.service.login(req.body.username, req.body.password);

        this.logger.info('logged in')
        res.status(200).send();
    }

    getCurrentUser = (req, res) => {
        this.logger.info('getCurrentUser')

        res.status(200).send({user: req.session.user.username});
    }

    logout = (req, res) => {
        this.logger.info('logout')
        
        req.session.destroy();
        
        this.logger.info('logged out')
        res.status(200).send();
    }
}
