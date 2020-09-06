const bcrypt = require('bcrypt');
const config = require('../../config/config');
import { table } from '@aws/dynamodb-data-mapper-annotations';

@table('users')
export class User {
    static passwordHasher = bcrypt;

    username: string;
    passwordHash: string;
    
    static async create(username, password) {
        const user = new User();
        user.username = username;
        await user.setPassword(password);
        return user
    }

    async setPassword(password) {
        this.passwordHash = await User.passwordHasher.hash(password, config.bcryptSaltRounds);
    }

    async authenticate(password) {
        return await User.passwordHasher.compare(password, this.passwordHash);
    }
}
