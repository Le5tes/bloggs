import { User } from "../models/user";

export class UsersService {
    constructor(private datamapper) {
    }
    
    async createUser(username: string, password: string) {
        await this.datamapper.ensureTableExists(User);

        const users = []
        for await ( let user of this.datamapper.query(User, {username: username})) {
            users.push(user);
        };
        console.log(users);
        if (users.length > 0) {
            console.log('here');
            throw createError(409, 'Username already taken')
        }

        const user = await User.create(username, password)

        await this.datamapper.put(user);
    }
}