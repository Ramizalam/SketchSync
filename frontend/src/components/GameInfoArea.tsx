import { observer } from "mobx-react";
import React, { useMemo } from "react";
import { options } from "../Helper/TabOption";
import { isLarge, isMedium, isSmall, useBreakPoint } from "../hooks/useBreakPoint";
import { roundService } from "../service/RoundServices";
import store from "../store";
import Header from "./Header";
import Timer from "./Timer";
import LeaderBoard from "./LeaderBoard";
interface Props {
  currentOption: number,
  handleOption: (val: number) => void;
}

const GameInfoArea: React.FC<Props> = ({ currentOption, handleOption }) => {
  const {
    round,
    currentPlayerId,
    roundStart,
    setting,
    wordLength,
    myChance,
    choosing,
    currentWord,
  } = store.gameStore;
  const drawer = store.gameStore.getPlayerById(currentPlayerId!);

  const onTimerEnd = () => {
    roundService.wordRevealClient();
  };

  const breakpoint = useBreakPoint();

  // Generate word blanks or the actual word for the drawer
  const wordDisplay = useMemo(() => {
    if (choosing) return null;
    
    if (myChance && currentWord) {
      return (
        <div className="word-blanks my-2">
          {currentWord.split('').map((char, i) => (
            <div className="word-blank" style={{ color: 'var(--color-purple-dark)' }} key={i}>{char}</div>
          ))}
        </div>
      );
    }
    
    const length = wordLength || 4;
    return (
      <div className="word-blanks my-2">
        {Array(length).fill(0).map((_, i) => (
          <div className="word-blank" key={i}>_</div>
        ))}
      </div>
    );
  }, [wordLength, myChance, choosing, currentWord]);

  return (
    <>
      <div className="flex items-center lg:flex-col lg:w-full lg:h-full gap-2">
        <Header size="skribbl-logo-sm lg:skribbl-logo-md">SketchSync</Header>
        <div className="game-info-panel w-full lg:glass-card lg:p-3">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <span className="info-badge info-badge-round">
              🎯 Round {round}
            </span>
            {breakpoint !== "sm" && breakpoint !== "md" && drawer && (
              <span className="info-badge info-badge-drawer">
                🖌️ {drawer.name}
              </span>
            )}
            <Timer
              start={setting.round_time}
              onTimerEnd={onTimerEnd}
              stop={!roundStart}
              reset={!roundStart}
            />
          </div>
          {wordDisplay}
        </div>
        <div className={`w-full mt-2 ${isSmall(breakpoint) || isMedium(breakpoint) || isLarge(breakpoint) ? "hidden" : "visible"}`}>
          <LeaderBoard />
        </div>
      </div>
      {(isSmall(breakpoint) || isMedium(breakpoint) || isLarge(breakpoint)) &&
        <div className="tab-switcher">
          {options.map((op, index) => {
            return (
              <div
                className={`tab-btn ${currentOption === index ? "tab-active" : ""}`}
                key={op}
                onClick={() => { handleOption(index) }}
              >
                {op}
              </div>
            );
          })}
        </div>
      }
    </>
  );
};

export default observer(GameInfoArea);