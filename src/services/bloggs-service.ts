import { DataMapper } from "@aws/dynamodb-data-mapper";
import { Blogg } from "../models/blogg";

export class BloggsService {
    constructor(private datamapper: DataMapper) {}

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

    async getBloggs (number) {
        const bloggs = []
        for await ( const blogg of this.datamapper.query(Blogg, { limit: number, scanIndexForward: true })) {
            bloggs.push(blogg);
        };
        return bloggs;
    }
}
