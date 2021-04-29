export const bloggsTableOptions = {
    readCapacityUnits: 5,
    writeCapacityUnits: 5,
    indexOptions: {
        globalKey: {
            type: 'global',
            projection: 'all',
            readCapacityUnits: 5,
            writeCapacityUnits: 5,
        },
        username: {
            type: 'global',
            projection: 'all',
            readCapacityUnits: 5,
            writeCapacityUnits: 5,
        }
    }
}