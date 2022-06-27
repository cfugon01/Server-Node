
import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';


import * as misSocket from '../sockets/sockets';
import { desconectar } from '../sockets/sockets';


export default class Server{

    private static _intance: Server;

    public app: express.Application ;
    public port:number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        // this.io = socketIO( this.httpServer );
        this.io = require("socket.io")(this.httpServer);
        // this.io = socketIO( this.httpServer );

        this.escucharSockets();

    }


    public static get instance(){
        return this._intance || (this._intance = new this());

    }

    start( callback: Function){
        this.httpServer.listen(this.port, callback());
    }


    private escucharSockets(){
        console.log('escuchando conexiones - sockets');

        this.io.on('connection', cliente =>{

            console.log('Cliente conectado');

            
            //mensajes
            misSocket.mensaje(cliente);
            
            //Desconetar
            misSocket.desconectar( cliente );
        

            
        });
        
        
        


    }


}