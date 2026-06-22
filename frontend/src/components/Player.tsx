import { observer } from "mobx-react";
import React, { useMemo } from "react";
import avatarImage from "../assets/avatarImage.png";
import { GameStateEnum } from "../enums/GameState";
import store from "../store";
import Avatar from "./Avatar";

interface Props { }

const Players: React.FC<Props> = (props) => {
  const { topScorers: players, gameState } = store.gameStore;

  const memoPlayers = useMemo(() => {
    return players.map((player, index) => {
      let pos: number | undefined;
      if (gameState === GameStateEnum.END) {
        if (index === 0 || index === 1 || index === 2) {
          pos = index + 1;
        }
      }
      return (
        <Avatar
          name={player.name}
          pos={pos}
          id={player.id}
          key={player.id}
          score={player.score}
          src={player.avatar || avatarImage}
        />
      );
    })
  }
    , [gameState, players]);

  return (
    <div
      className="player-bar fixed z-40
        lg:w-40 lg:h-full lg:left-0 lg:top-0 lg:overflow-y-auto lg:overflow-x-hidden flex lg:flex-col lg:items-center lg:justify-start lg:py-4 lg:gap-2
        w-full h-1/5 bottom-0 overflow-x-auto flex-row items-center justify-center px-4 gap-2"
    >
      {memoPlayers}
    </div>
  );
};


export default observer(Players);