//importamos expres en un objeto de nombre express
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";

/*typescript le pone tipo de dato a todo, por eso app tiene ese tipo de dato choriziento, Al fina recibe 
el contexto de express */
class ServerBootstrap extends ConfigServer{
    // class ServerBootstrap {
    // Se inicializa el modulo expres con la varible tipo objeto app
    // app es la ref al objeto express, este tendra el tipado y toda la configuración real de express. Es 
    public app: express.Application = express(); //igual a: const app = express(); almaceno al Objeto del módulo exppress en app
    //Uso variables de entorno para leer desde process.env la variable PORT. al hacer node dist/server.js, levanto todo (.env y todos los js) a memoria, entonces leo desde allí  
    
    private port: number = this.getNumberEnv("PORT") ;
    // private port: number = 8000;
    
    constructor(){    
        super()
        
        /*use() hace referencia a uso de middlewares de express, los cuales son una serie de funciones que se exe en un orden cuando se recibe request
        estas funciones pueden manipular los request y respopnse.mdlwre es una fc que se exe antes o durante el flujo de una petición en express, antes 
        de llegar al  endpoint o path en el controller que retornará el recurso que está solicitando. Tienen acceso al obj request y objeto response y a la
        siguiente fc next() middleware del ciclo request/response de la app. exe x codido, hacer cambios en objetos req/res, finalizar ciclo req/res, invocar next()
        Tambien toma info de una función y se la pasa a otra función */ 
        this.app.use(express.json())//express.json() permite convertir string en formato JSON a objetos JSON
        /*express.urlencoded() permite procesar datos recividos por POST desde formulario html, analizando los 
        datos recividos en el body de request y convertirlos en un formato usable, los interpreta y convierte en 
        objeto {cclave:valor}, se consumen desde req.body*/        
        this.app.use(express.urlencoded({extended : true}))//extended:true habilia a analizar datos simples y objetos complejos como anidados (false lo omite)   
        
        this.dbConnect()
        this.app.use(morgan("dev"))
        this.app.use(cors({
            origin:true,
            methods:"GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS",
            credentials:true
        }))
        //TEST
        this.app.get("/api/hola",(req,res)=>{
            res.status(200).json( {
                mes:"HOla mundo...!"
            })
        })
        
        this.app.use("/api", this.routers())
        // this.app.use('/api',this.routers())
        this.listen();
    }

    routers():Array<express.Router>{
        return [new UserRouter().router];
    }

  

    // async dbConnect(): Promise<DataSource> {
    //     return await new DataSource(this.typeORMConfig).initialize();
    //   }


    public listen(){
        this.app.listen(this.port, ()=>{
            console.log(`listen in ${this.port}::ENV = ${this.getEnviroment("ENV")}`);
            
            // console.log("Server listening on port:" + this.port);
        });
    }
}
new ServerBootstrap()

//https://www.youtube.com/watch?v=2D1z3x43zS8&list=PLergODdA95keGVKSOPApWRw0XuA-ivH_u&index=4