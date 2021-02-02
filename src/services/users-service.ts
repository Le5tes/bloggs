import { User } from "../models/user";
import { Logger } from "../utils/logger";
var createError = require('http-errors');

export class UsersService {
    private logger = new Logger('UsersService');
    
    constructor(private datamapper) {}

    static async create(datamapper) {
        await datamapper.ensureTableExists(User, {readCapacityUnits: 5, writeCapacityUnits: 5});

        return new UsersService(datamapper);
    }
    
    async createUser(username: string, password: string) {
        this.logger.info('creating user')
        await this.checkUsernameNotTaken(username);

        const user = await User.create(username, password);
        
        await this.datamapper.put(user);
        this.logger.info('user created');
    }
    
    async login(username: string, password: string) {
        this.logger.info('starting login');
        try {
            const user: User = await this.datamapper.get(Object.assign(new User, {username: username}));
            
            if (user.authenticate(password)) {
                this.logger.info('returning user');
                return user;
            }
        } catch (err) {
            this.logger.error('login failed', err);
        }
        
        this.logger.info('Authorisation failed');
        throw createError(401, 'Authorisation failed');
    }

    private async checkUsernameNotTaken(username: string) {
        const users = [];
        for await (let user of this.datamapper.query(User, { username: username })) {
            users.push(user);
        }

        if (users.length > 0) {
            this.logger.info('Username already taken');
            throw createError(409, 'Username already taken');
        }
    }
}