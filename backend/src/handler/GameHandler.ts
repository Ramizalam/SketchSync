import { Socket } from "socket.io";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";
import { webSocketServices } from "../services/webSocketServices.js";
import type { RoomSetting } from "../model/Room.js";
import { gameService } from "../services/GameService.js";
import { roundService } from "../services/RoundService.js";
import type{ PlayerDTO } from "../DTO/playerDTO.js";



const gameCreateHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.CREATE_GAME, ({ player }: { player: any}) => {
        console.log("Created Game")
  });
};

const gameJoinHandler = (socket: Socket)=>{
    socket.on(EventTypeEnum.CREATE_GAME,({player}:{player : PlayerDTO})=>{
        gameService.createGame(socket,player)
    })
}

const gameRoomSyncHandler = (socket:Socket)=>{
    socket.on(EventTypeEnum.ROOM_SYNC,(data:{new_game?:boolean;setting:RoomSetting})=>{
        if(data.setting){
            gameService.changeRoomSetting(socket,data.setting)
        }

        if(data.new_game){
            gameService.reGame(socket);
        }
    })
}

const drawHandler = (socket:Socket)=>{
    socket.on(EventTypeEnum.DRAW,(commands:Array<Array<number>>)=>{
        webSocketServices.sendToAll(
            socket,
            EventTypeEnum.DRAW,
            commands
        )
    })
}

const gameChatHandler = (socket:Socket)=>{
    socket.on(EventTypeEnum.CHAT,(data:{choosen_word?:string})=>{
        roundService.roundSync(socket,data.choosen_word);
    })
}


const gameStartHandler = (socket:Socket)=>{
    socket.on(EventTypeEnum.START_GAME,()=>{
        gameService.startGame(socket)
    })
}

const gameWordRevealHandler = (socket: Socket)=>{
    socket.on(EventTypeEnum.WORD_REVEAL,()=>{
        roundService.wordReveal(socket);
    })
}


export default {gameCreateHandler,
    drawHandler,
    gameJoinHandler,
    gameWordRevealHandler,
    gameStartHandler,
    gameChatHandler,
    gameRoomSyncHandler
}