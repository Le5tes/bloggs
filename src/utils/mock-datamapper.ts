export const mockAsyncIterator = {
    [Symbol.asyncIterator]:  async function*() {
    }
};

export const mockDataMapper = {
    get: () => mockAsyncIterator,
    query: () => mockAsyncIterator,
    put: () => mockAsyncIterator,
    ensureTableExists: () => new Promise(res => res())
};
