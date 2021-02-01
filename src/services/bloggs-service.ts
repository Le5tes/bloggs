import { DataMapper } from "@aws/dynamodb-data-mapper";
import { Blogg } from "../models/blogg";
import { Logger } from "../utils/logger";

export class BloggsService {
    private logger = new Logger('BloggsService');

    constructor(private datamapper: DataMapper) {}

    static async create(datamapper) {
        await datamapper.ensureTableExists(Blogg,  {readCapacityUnits: 5, writeCapacityUnits: 5});

        return new BloggsService(datamapper);
    }

    async createBlogg (username, blog) {
        this.logger.info('creating blogg')
        const blogg = new Blogg();
        blogg.username = username;
        blogg.body = blog;

        await this.datamapper.put(blogg);
        this.logger.info('blogg created')
    }

    async getBloggs (number) {
        this.logger.info('getting bloggs')

        const bloggs = []
        for await ( const blogg of this.datamapper.query(Blogg, { limit: number, scanIndexForward: true })) {
            bloggs.push(blogg);
        };

        this.logger.info('returning bloggs')
        return bloggs;
    }
}
