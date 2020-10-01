import { User } from "../models/user";
var createError = require('http-errors');

export class UsersService {
    constructor(private datamapper) {
    }

    static async create(datamapper) {
        await datamapper.ensureTableExists(User, {readCapacityUnits: 5, writeCapacityUnits: 5});

        return new UsersService(datamapper);
    }
    
    async createUser(username: string, password: string) {
        await this.checkUsernameNotTaken(username);

        const user = await User.create(username, password)

        await this.datamapper.put(user);
    }
    
    async login(username: string, password: string) {
        try {
            const user: User = await this.datamapper.get(User, {username: username});
            
            if (user.authenticate(password)) {
                return user;
            }
        } catch  {}
        
        throw createError(401, 'Authorisation failed');
    }

    private async checkUsernameNotTaken(username: string) {
        const users = [];
        for await (let user of this.datamapper.query(User, { username: username })) {
            users.push(user);
        }

        if (users.length > 0) {
            throw createError(409, 'Username already taken');
        }
    }
}