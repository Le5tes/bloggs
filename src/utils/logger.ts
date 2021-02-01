export class Logger {
    constructor (private classname){
    }

    info (log) {
        console.log(`${this.classname} at ${new Date().toISOString()}: \n${log}`)
    }

    error (log, err: Error) {
        console.error(`${this.classname} at ${new Date().toISOString()}: \n${log} \nStack Trace: ${err.stack}`)
    }
}