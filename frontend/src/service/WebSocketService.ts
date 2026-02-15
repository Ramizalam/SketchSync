import { io, Socket } from "socket.io-client";
import { EventTypeEnum } from "../enums/EventTypeEnum";

class WebSocketServices{
   private static _instance: WebSocketServices|null;
   private socket : Socket |null= null;
   private constructor(){}
   public static getInstance():WebSocketServices{
     if(!WebSocketServices._instance){
         WebSocketServices._instance = new WebSocketServices();
     }
     return WebSocketServices._instance;
   }
   public init():void{
    this.socket = io("http://localhost:4000",{
        transports:["websocket"]
    })
    this.socket.on("/error",()=>window.location.reload());
    console.log("[WebSocket service] Initialised")
   }

   public emitEvent(event: EventTypeEnum | string, payload:{[key:string]:any}){
    this.socket?.emit(event.toString(),payload)
   }

      //listen to events from the server (.on method )
   public registerEvent(event:EventTypeEnum | string , handler:(e:any)=>void){
      //handler runs whenn even is recieved 
    this.socket?.on(event.toString(),handler); 
   }
}

export const webSocketServices = WebSocketServices.getInstance();