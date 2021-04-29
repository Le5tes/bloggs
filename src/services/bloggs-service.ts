import { DataMapper } from "@aws/dynamodb-data-mapper";
import { bloggsTableOptions } from "../configs/bloggs-table-options";
import { Blogg } from "../models/blogg";
import { Logger } from "../utils/logger";

export class BloggsService {
    private logger = new Logger('BloggsService');

    constructor(private datamapper: DataMapper) {}

    static async create(datamapper) {
        await datamapper.ensureTableExists(Blogg,  bloggsTableOptions);

        return new BloggsService(datamapper);
    }

    async createBlogg (username, blog) {
        this.logger.info('creating blogg');
        const blogg = new Blogg();
        blogg.username = username;
        blogg.body = blog;

        await this.datamapper.put(blogg);
        this.logger.info('blogg created');
    }

    async getBloggs (number) {
        this.logger.info('getting bloggs');

        const bloggs = []
        try {
            for await (const blogg of this.datamapper.query(Blogg, {globalKey: 0}, {indexName: 'globalKey', limit: number, scanIndexForward: true })) {
                bloggs.push(blogg);
            };
        } catch (err) {
            this.logger.error('failed to get bloggs', err)
        }

        this.logger.info('returning bloggs')
        return bloggs;
    }
}
