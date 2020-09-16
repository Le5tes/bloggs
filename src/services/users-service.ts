import { User } from "../models/user";

export class UsersService {
    constructor(private datamapper) {
    }

    async createUser(username: string, password: string) {
        const users = await Promise.all( this.datamapper.query(User, {username: username}));
        console.log(users);
        if (users.length > 0) {
            console.log('here');
            throw createError(409, 'Username already taken')
        }

        const user = await User.create(username, password)

        await this.datamapper.put(user);
    }
}