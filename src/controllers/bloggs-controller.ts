export class BloggsController {
    constructor(private service) {}

    postBlogg = (req, res) => {
        const username = req.session.user.username;
        const blogText = req.body.blog;
        this.service.createBlogg(username, blogText);

        res.status(201).send();
    }
}
