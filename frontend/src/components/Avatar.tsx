import { observer } from "mobx-react";
import React, { ImgHTMLAttributes, useMemo } from "react";
import { GameStateEnum } from "../enums/GameState";
import store from "../store";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  score: number;
  id: string;
  pos?: number
}

const Avatar: React.FC<Props> = ({ name, src, score, id, pos }) => {
  const { gameState, myId } = store.gameStore;

  const myavatar = useMemo(() => { return myId === id }, [myId]);

  const posEmoji = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : null;

  const frameClass = pos === 1 ? 'avatar-pos-1' :
    pos === 2 ? 'avatar-pos-2' :
      pos === 3 ? 'avatar-pos-3' :
        myavatar && gameState !== GameStateEnum.END ? 'avatar-me' : '';

  const scaleClass = pos === 1 ? 'scale-110' :
    pos === 2 ? 'scale-105' : '';

  return (
    <div className={`avatar-card h-full lg:h-auto w-36 shrink-0 ${scaleClass}`}>
      {posEmoji && <span className="pos-badge">{posEmoji}</span>}
      <div className={`relative h-full lg:h-36`}>
        <img src={src} className={`avatar-img absolute bottom-0 right-0 left-0 w-full rounded-lg ${frameClass}`} />
        <div className={`avatar-name-badge absolute bottom-1 left-2 right-2`}>
          <h1 className="text-sm truncate">{name}</h1>
          {gameState !== GameStateEnum.LOBBY && (
            <div className="flex items-center justify-center gap-1 text-xs">
              <span>⭐</span>
              <span className="font-bold">{score}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default observer(Avatar);