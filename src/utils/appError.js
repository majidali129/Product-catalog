
export class appError extends Error {
    constructor(message, statusCode, stack) {
        super(message);
        this.data = null;
        this.success = false;
        this.message = message;
        this.statusCode = statusCode;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

