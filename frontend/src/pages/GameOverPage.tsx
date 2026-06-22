import React from "react";
import LeaderBoard from "../components/LeaderBoard";
import Header from "../components/Header";

interface Props { }

const GameOverPage: React.FC<Props> = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="glass-card w-full max-w-lg p-8 flex flex-col items-center space-y-6 animate-bounce-in">
        <Header>SketchSync</Header>
        <h2 className="font-display text-3xl" style={{ color: 'var(--color-coral)' }}>
          🎉 Game Over!
        </h2>
        <div className="w-full">
          <LeaderBoard />
        </div>
        <p className="font-display text-lg animate-float" style={{ color: 'var(--color-blue)' }}>
          Thanks for playing! 🎮
        </p>
      </div>
    </div>
  );
};

export default React.memo(GameOverPage);