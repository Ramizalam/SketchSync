import { observer } from "mobx-react";
import React from "react";
import store from "../store";

interface Props { }

const LearderBoard: React.FC<Props> = () => {
  const { topScorers } = store.gameStore;

  const getPosDisplay = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  return (
    <div className="leaderboard-container h-full flex flex-col">
      <div className="leaderboard-header">
        🏆 Leaderboard
      </div>
      <div className="flex-1 overflow-y-auto">
        {topScorers.map((player, index) => {
          return (
            <div
              className="leaderboard-row"
              key={player.id}
            >
              <span className="leaderboard-pos">{getPosDisplay(index)}</span>
              <span className="leaderboard-name">{player.name}</span>
              <span className="leaderboard-score">{player.score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

LearderBoard.defaultProps = {};

export default observer(LearderBoard);