export class BloggsController {
    constructor(private service) {}

    postBlogg = (req, res) => {
        const username = req.session.user.username;
        const blogText = req.body.blog;
        this.service.createBlogg(username, blogText);

        res.status(201).send();
    }

    getBloggs = async (req, res) => {
        const limit = req.query.limit || 1;
        const bloggs = await this.service.getBloggs(limit);

        res.status(200).send(bloggs);
    }
}
