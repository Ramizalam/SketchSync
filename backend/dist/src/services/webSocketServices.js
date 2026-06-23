import { Server } from "socket.io";
import { Server as httpServer } from "http";
import GameHandler from "../handler/GameHandler.js";
import { Socket } from "socket.io";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";
class WebSocketServices {
    static _instance;
    io = null;
    constructor() { }
    static getInstance() {
        if (!WebSocketServices._instance) {
            WebSocketServices._instance = new WebSocketServices();
        }
        return WebSocketServices._instance;
    }
    init(server) {
        console.log("WebSocketServices: Initializing");
        this.io = new Server(server, {
            transports: ["websocket"],
            cors: {
                origin: [process.env.FRONTEND_URL],
                methods: ["GET", "POST"]
            }
        });
        this.io.on("connection", (socket) => {
            console.log(`[WebSocketServices] user connected : ${socket.id}`);
            GameHandler.drawHandler(socket);
            GameHandler.gameChatHandler(socket);
            GameHandler.gameCreateHandler(socket);
            GameHandler.gameJoinHandler(socket);
            GameHandler.gameLeaveHandler(socket);
            GameHandler.gameRoomSyncHandler(socket);
            GameHandler.gameRoundSyncHandler(socket);
            GameHandler.gameStartHandler(socket);
            GameHandler.gameWordRevealHandler(socket);
        });
    }
    sendPrivate(socket, event, message) {
        console.log(`[WebSocketServices] sendPrivate -> ${event} to ${socket.id}:`, message);
        this.io?.to(socket.id).emit(event, message);
    }
    sendToRoom(socket, event, roomId, message) {
        console.log(`[WebSocketServices] sendToRoom -> ${event} to room ${roomId} (from ${socket.id}):`, message);
        socket.to(roomId).emit(event, message);
    }
    sendToAll(socket, event, message) {
        console.log(`[WebSocketServices] sendToAll -> ${event} from ${socket.id}:`, message);
        socket.broadcast.emit(event, message);
    }
    sendToRoomByIO(event, roomId, message) {
        console.log(`[WebSocketServices] sendToRoomByIO -> ${event} to room ${roomId}:`, message);
        this.io?.to(roomId).emit(event, message);
    }
}
export const webSocketServices = WebSocketServices.getInstance();
//# sourceMappingURL=webSocketServices.js.map