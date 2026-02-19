import { Server } from "socket.io";
import { Server as httpServer } from "http"
import GameHandler from "../handler/GameHandler.js";
import { Socket } from "socket.io";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";



class WebSocketServices {
    private static _instance: WebSocketServices | null;
    private io: Server | null = null;
    private constructor() { }

    public static getInstance(): WebSocketServices {
        if (!WebSocketServices._instance) {
            WebSocketServices._instance = new WebSocketServices()
        }
        return WebSocketServices._instance;
    }

    public init(server: httpServer) {
        console.log("WebSocketServices: Initializing");
        this.io = new Server(server, {
            transports: ["websocket"],
            cors: {
                origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:4173"],
                methods: ["GET", "POST"]
            }
        })


        this.io.on("connection", (socket) => {
            console.log(`[WebSocketServices] user connected : ${socket.id}`)
            GameHandler.drawHandler(socket);
            GameHandler.gameChatHandler(socket);
            GameHandler.gameCreateHandler(socket);
            GameHandler.gameJoinHandler(socket);
            GameHandler.gameLeaveHandler(socket);
            GameHandler.gameRoomSyncHandler(socket);
            GameHandler.gameRoundSyncHandler(socket);
            GameHandler.gameStartHandler(socket);
            GameHandler.gameWordRevealHandler(socket);
        })
    }

    public sendPrivate(socket: Socket, event: EventTypeEnum, message: any) {
        console.log(`[WebSocketServices] sendPrivate -> ${event} to ${socket.id}:`, message);
        this.io?.to(socket.id).emit(event, message)
    }

    public sendToRoom(socket: Socket, event: string, roomId: string, message: any) {
        console.log(`[WebSocketServices] sendToRoom -> ${event} to room ${roomId} (from ${socket.id}):`, message);
        socket.to(roomId).emit(event, message);
    }

    public sendToAll(socket: Socket, event: string, message: any) {
        console.log(`[WebSocketServices] sendToAll -> ${event} from ${socket.id}:`, message);
        socket.broadcast.emit(event, message);
    }
    public sendToRoomByIO(event: string, roomId: string, message: any) {
        console.log(`[WebSocketServices] sendToRoomByIO -> ${event} to room ${roomId}:`, message);
        this.io?.to(roomId).emit(event, message);
    }

}

export const webSocketServices = WebSocketServices.getInstance();