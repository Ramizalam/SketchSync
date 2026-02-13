import { Socket } from "socket.io";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";
import { webSocketServices } from "../services/webSocketServices.js";

const gameCreateHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.CREATE_GAME, ({ player }: { player: any}) => {
        console.log("Created Game")
  });
};

const drawHandler = (socket:Socket)=>{
    socket.on(EventTypeEnum.DRAW,(commands:Array<Array<number>>)=>{
        webSocketServices.sendToAll(
            socket,
            EventTypeEnum.DRAW,
            commands
        )
    })
}

export default {gameCreateHandler,drawHandler}