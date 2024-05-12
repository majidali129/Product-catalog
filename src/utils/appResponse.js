class appResponse {
    constructor(status, data, results, options,token){
        this.status = status;
        if(token) this.token = token;
        this.success = status < 400;
        if(results) this.results = results;
        this.data = data;
        if(options){
            this.options = options;
        }
    }
}

export {appResponse}