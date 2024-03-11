import { Router } from "express";

/*
clase a modo bandera solo para extender otras clases, => Trabajará con genericos
Ej, Si le paso una ruta de Users, entonces trabajará con controllers de usuarios, 
middlewares de User, config y servicios de USer, No se debería mezclar con otras clase
como Productos u otra. cualqueir nueva clase se inicia con T
T: controllador, U: middleware*/
export class BaseRouter<T>{
    public router:Router; //aviso lo que recibirá
    public controller:T
    
    /*{variable:tipo} es un objeto con contenido variable y su tipo
    ENTONCES.En {new():T} este {objeto} tiene un metodo constructo new() 
    sin argumento que crea y retorna un objeto T 
    Entonces este parametro a en "a: {new():T}" se espera que sea una clase o 
    construtor que pueda ser usado para crear instancias de un objeto del tipo T" */
    constructor(TController:{new():T}){ // recibe una clase y retorna su instancia
        this.router=Router() // ahora si le paso como ()
        this.controller = new TController()
        this.routes()
    }
    routes(){}
} 