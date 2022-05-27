import { DataMapper } from "@aws/dynamodb-data-mapper";
import { bloggsTableOptions } from "../configs/bloggs-table-options";
import { Blogg } from "../models/blogg";
import { Logger } from "../utils/logger";
var createError = require('http-errors');

export class BloggsService {
    logger = new Logger('BloggsService');

    constructor(private datamapper: DataMapper) {}

    static async create(datamapper) {
        await datamapper.ensureTableExists(Blogg,  bloggsTableOptions);

        return new BloggsService(datamapper);
    }

    async createBlogg (username, blog, tags) {
        this.logger.info('creating blogg');
        const blogg = new Blogg();
        blogg.username = username;
        blogg.body = blog;
        blogg.tags = tags;

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


            this.logger.info('returning bloggs')
            return bloggs;
        } catch (err) {
            this.logger.error('failed to get bloggs', err)
            throw createError(404, 'Bloggs not found');
        }

    }

    async getBloggsByJourney (journey) {
        this.logger.info('getting bloggs by journey');

        const bloggs = []
        try {
            for await (const blogg of this.datamapper.query(Blogg, {journey}, {indexName: 'journey',  scanIndexForward: false })) {
                bloggs.push(blogg);
            };

            this.logger.info('returning bloggs');
            return bloggs;

        } catch (err) {
            this.logger.error('failed to get bloggs', err)
            throw createError(404, 'Bloggs not found');
        }
    }

    async getBloggById (id) {
        this.logger.info('getting blogg by id');

        let blogg;
        try {
            for await (const b of this.datamapper.query(Blogg, {id})) {
                blogg = b;
            };

            this.logger.info('returning blogg');
            return blogg;
        } catch (err) {
            this.logger.error('failed to get blogg', err)
            throw createError(404, 'Blogg not found');
        }
    }
}
