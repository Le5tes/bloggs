import { UsersService } from "../services/users-service";

export class UsersController {
    constructor (private service: UsersService) {}

    postUser = async (req, res) => {
        await this.service.createUser(req.body.username, req.body.password);

        res.status(201).send();
    }

    login = async (req, res) => {
        req.session.user = await this.service.login(req.body.username, req.body.password);

        res.status(200).send();
    }

    getCurrentUser = (req, res) => {
        res.status(200).send({user: req.session.user.username});
    }

    logout = (req, res) => {
        req.session.destroy();

        res.status(200).send();
    }
}
