import { Blogg } from "../models/blogg";

export class BloggsService {
    constructor(private datamapper) {}

    static async create(datamapper) {
        await datamapper.ensureTableExists(Blogg,  {readCapacityUnits: 5, writeCapacityUnits: 5});

        return new BloggsService(datamapper);
    }

    async createBlogg (username, blog) {
        const blogg = new Blogg();
        blogg.username = username;
        blogg.body = blog;

        await this.datamapper.put(blogg);
    }
}
