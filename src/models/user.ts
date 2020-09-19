import { table, hashKey, attribute } from '@aws/dynamodb-data-mapper-annotations';
const bcrypt = require('bcryptjs');
const config = require('../../config/config');

@table('users')
export class User {
    static passwordHasher = bcrypt;

    @hashKey()
    username: string;
    @attribute()
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
