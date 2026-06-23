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
      <div className="w-full lg:w-1/4 p-2 lg:h-full flex-none">
        <GameInfoArea
          currentOption={currentOption}
          handleOption={handleOption}
        />
      </div>
      <div className="w-full lg:w-1/2 p-2 flex-1 lg:flex-none flex flex-col">
        <CanvasGameArea />
      </div>
      <div
        className={`w-full lg:w-1/4 p-2 flex-1 lg:flex-none ${(isSmall(breakpoint) || isMedium(breakpoint) || isLarge(breakpoint)) && currentOption !== 1
            ? "hidden"
            : "flex"
          }`}
      >
        <ChatArea />
      </div>
      <div
        className={`w-full lg:w-1/4 p-2 flex-1 lg:flex-none ${(isSmall(breakpoint) || isMedium(breakpoint) || isLarge(breakpoint)) ? currentOption !== 2
            ? "hidden"
            : "flex"
            : "hidden"
          }`}
      >
        <LeaderBoard />
      </div>
    </div>
  );
};



export default React.memo(GamePage);