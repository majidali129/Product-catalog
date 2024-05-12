class appResponse {
    constructor(status, data, results, options){
        this.status = status;
        this.success = status < 400;
        if(results) this.results = results;
        this.data = data;
        if(options){
            this.options = options;
        }
    }
}

export {appResponse}