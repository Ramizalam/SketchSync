import express from "express";
import {createServer} from "http"

function boot (port:number){
    const app = express();
    const server = createServer(app);

    app.get('/',(req,res)=>{
        return res.send("server is up")
    })

    app.use((req,res)=>{
        return res.send("404 page not found")
    })

    server.listen(port,()=>{
        console.log(`server is listening on ${port}`)
    })
}

boot(4000);