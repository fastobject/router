import http from "http";

const requestHandler = (req, res, routes) => {
    try{
        for( let index = 0 ; index < routes.length ; index++){
            const route = routes[index];
            if( route.match(req) ){
                route.callback(req, res);
                return;
            }
        }
        res.statusCode = 404;
        res.end();
    }
    catch(err){
        
    }
}

class App{
    constructor(){
        this.routes = [];
    }
    
    use(route, callback){
        this.routes.push({
            match:(req) => req.url.startsWith(route), 
            callback
        })
    }
    
    get(route, callback){
        this.routes.push({
            match:(req) => req.url.startsWith(route) && req.method == 'GET', 
            callback
        })
    }
    
    post(route, callback){
        this.routes.push({
            match:(req) => req.url.startsWith(route) && req.method == 'POST', 
            callback
        })
    }

    async listen(port){
        let server = http.createServer((req,res) => requestHandler(req, res, this.routes));
        await server.listen(port);
    }
}

export default () => new App()