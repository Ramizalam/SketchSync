import { canvasService } from "./CanvasServices";
import { webSocketServices } from "./WebSocketService";

class GameServices{
    private static _instance : GameServices|null;
    private constructor(){};
    public static getInstance():GameServices{
        if(!GameServices._instance){
            GameServices._instance = new GameServices();
        }
        return GameServices._instance;
    }
    
    public init(){
        webSocketServices.init();
        webSocketServices.registerEvent("/game/canvas/draw",this.drawServer)
    }
    // server is sending command to client 2  
    public drawServer(commands:Array<Array<number>>){
        for(const command of commands){
            if(command[0]===0){
                 // to draw we need starting(x,y) and current(x,y)
                canvasService.drawOnCanvas(command[1],command[2],command[3],command[4])
            } else if(command[0]==1){
                // to erase we only need current(x,y)
                canvasService.eraseOnCanvas(command[1],command[2])
            }
        }
    }
    // client 1 is sending command to server
    public drawClient(commands: Array<Array<number>>){
        webSocketServices.emitEvent("/game/canvas/draw",commands)
    }
    
}

export const gameServices = GameServices.getInstance();