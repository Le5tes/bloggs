import { table, autoGeneratedHashKey, rangeKey, attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations';

@table('bloggs')
export class Blogg {
    @autoGeneratedHashKey()
    id: string;
    
    @rangeKey({defaultProvider: () => new Date()})
    createdAt: Date;

    @attribute()
    username: string;

    @attribute()
    body: string;

    @attribute()
    tags: string;

    @attribute({indexKeyConfigurations: {
        globalKey: 'HASH'
    }})
    globalKey: number = 0;
}
