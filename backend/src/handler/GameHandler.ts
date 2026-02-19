import { Socket } from "socket.io";
import type { PlayerDTO } from "../DTO/playerDTO.js";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";
import type{ RoomSetting } from "../model/Room.js";
import { gameService } from "../services/GameService.js";
import { roundService } from "../services/RoundService.js";

const gameCreateHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.CREATE_GAME, ({ player }: { player: PlayerDTO }) => {
    console.log(`[Handler] ${socket.id} -> CREATE_GAME`, player);
    gameService.createGame(socket, player);
  });
};

const gameJoinHandler = (socket: Socket) => {
  socket.on(
    EventTypeEnum.JOIN_GAME,
    ({ player, roomId }: { player: PlayerDTO; roomId: string }) => {
      console.log(`[Handler] ${socket.id} -> JOIN_GAME`, { player, roomId });
      gameService.joinGame(socket, player, roomId);
    }
  );
};

const gameRoomSyncHandler = (socket: Socket) => {
  socket.on(
    EventTypeEnum.ROOM_SYNC,
    (data: { new_game?: boolean; settings?: RoomSetting }) => {
      if (data.settings) {
        gameService.changeGameSetting(socket, data.settings);
      }
      if (data.new_game) {
        gameService.reGame(socket);
      }
    }
  );
};

const drawHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.DRAW, (payload: any) => {
    console.log(`[Handler] ${socket.id} -> DRAW`, payload);
    const commands: Array<Array<number>> | undefined = Array.isArray(payload)
      ? payload
      : payload?.commands;
    if (!commands) return;
    gameService.draw(socket, commands);
  });
};

const gameLeaveHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.DISCONNECT, () => {
    gameService.leaveGame(socket);
    console.log(`[Handler] User Disconnected : ${socket.id}`);
  });
};

const gameChatHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.CHAT, (data: { message: string }) => {
    console.log(`[Handler] ${socket.id} -> CHAT`, data);
    roundService.gameChat(socket, data.message);
  });
};

const gameRoundSyncHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.ROUND_SYNC, (data: { chosen_word?: string }) => {
    console.log(`[Handler] ${socket.id} -> ROUND_SYNC`, data);
    roundService.roundSync(socket, data.chosen_word);
  });
};

const gameStartHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.START_GAME, () => {
    console.log(`[Handler] ${socket.id} -> START_GAME`);
    gameService.startGame(socket);
  });
};

const gameWordRevealHandler = (socket: Socket) => {
  socket.on(EventTypeEnum.WORD_REVEAL, () => {
    console.log(`[Handler] ${socket.id} -> WORD_REVEAL`);
    roundService.wordReveal(socket);
  });
};

export default {
  gameCreateHandler,
  gameJoinHandler,
  gameRoomSyncHandler,
  drawHandler,
  gameLeaveHandler,
  gameChatHandler,
  gameRoundSyncHandler,
  gameStartHandler,
  gameWordRevealHandler,
};
