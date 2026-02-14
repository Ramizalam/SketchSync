import { EventTypeEnum } from "../enums/EventTypeEnum";
import { webSocketServices } from "./WebSocketService";

interface RoundSyncResponse{
    game_state?:string;
    scores?:{[playerId: string]: number};
    turn_player_id?: string,
    round?:number,
    choosing?: boolean,
    wordList?:string[],
    guessed_player_id: string,
    time_left : number,
    round_start?:boolean,
    round_change? :boolean,
    word_length?:number
}

class RoundService{
    private static _instance : RoundService |null;
    private constructor(){};

    public static getInstance(){
        if(!RoundService._instance){
            return RoundService._instance = new RoundService();
        }
        return RoundService._instance;
    }
    public init(){
        webSocketServices.registerEvent(EventTypeEnum.CHAT,this.chatServer);
        webSocketServices.registerEvent(EventTypeEnum.DRAW,this.drawServer);
        webSocketServices.registerEvent(EventTypeEnum.WORD_REVEAL , this.wordRevealServer);
        console.log("[RoundService is Intialised]")
    }

    public chatClient(message: string){
        webSocketServices.emitEvent(EventTypeEnum.CHAT,{message});
    }

    public drawClient(commands: Array<Array<number>>){
        if(store.gameStore.currentPlayerId=== store.gameStore.myId);
    }
}