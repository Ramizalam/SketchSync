import React from "react";
import CanvasGameArea from "../components/CanvasGameArea";
import ChatArea from "../components/ChatArea";
import GameInfoArea from "../components/GameInfoArea";
import LeaderBoard from "../components/LeaderBoard";
import { isLarge, isMedium, isSmall, useBreakPoint } from "../hooks/useBreakPoint";

interface Props {
  currentOption: number;
  handleOption: (val: number) => void;
}

const GamePage: React.FC<Props> = ({ handleOption, currentOption }) => {
  const breakpoint = useBreakPoint();
  return (
    <div className="game-layout h-full w-full">
      <div className="lg:w-1/4 p-2 lg:h-full">
        <GameInfoArea
          currentOption={currentOption}
          handleOption={handleOption}
        />
      </div>
      <div className="w-9/10 ml-auto p-2 h-4/6 lg:h-full lg:w-1/2 flex flex-col">
        <CanvasGameArea />
      </div>
      <div
        className={`lg:w-1/4 ml-auto w-9/10 p-2 h-56 lg:h-full ${(isSmall(breakpoint) || isMedium(breakpoint) || isLarge(breakpoint)) && currentOption !== 1
            ? "hidden"
            : "visible"
          }`}
      >
        <ChatArea />
      </div>
      <div
        className={`lg:w-1/4 ml-auto w-9/10 p-2 h-56 ${(isSmall(breakpoint) || isMedium(breakpoint) || isLarge(breakpoint)) ? currentOption !== 2
            ? "hidden"
            : "visible"
            : "hidden"
          }`}
      >
        <LeaderBoard />
      </div>
    </div>
  );
};



export default React.memo(GamePage);