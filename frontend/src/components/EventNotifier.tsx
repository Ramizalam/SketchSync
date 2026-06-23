import { observer } from "mobx-react";
import React, { useEffect, useMemo, useState } from "react";
import { roundService } from "../service/RoundServices";
import store from "../store";
import Button from "../components/Button";
import Notification from "../components/Notification";

interface Props { }

const EventNotifier: React.FC<Props> = () => {
  const { currentPlayerId, choosing, myChance, wordList, currentWord } =
    store.gameStore;
  const drawer = store.gameStore.getPlayerById(currentPlayerId!);

  const memorizedWord = useMemo(() => {
    return wordList.map((word) => (
      <Button
        onClick={() => {
          roundService.roundSyncClient(word);
          store.gameStore.setCurrentWord(word);
        }}
        key={word}
        variant="secondary"
      >
        {word}
      </Button>
    ));
  }, [myChance, choosing, wordList]);

  const [notifySelection, setNotifySelection] = useState(false);
  const [wordReveal, setWordReveal] = useState(false);

  useEffect(() => {
    if (myChance || !drawer)
      return;
    setNotifySelection(true);
    setTimeout(() => {
      setNotifySelection(false);
    }, 2000);
  }, [choosing, myChance, drawer]);

  useEffect(() => {
    if (myChance || choosing)
      return;
    if (currentWord) {
      setWordReveal(true);
      setTimeout(() => {
        setWordReveal(false);
      }, 2000);
    }
  }, [myChance, currentWord]);

  return (
    <>
      <Notification open={choosing && myChance && !currentWord}>
        <div className="flex flex-col items-center space-y-4">
          <h2 className="font-display text-2xl">🎨 Pick a Word!</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {memorizedWord}
          </div>
        </div>
      </Notification>
      <Notification open={wordReveal}>
        <h2 className="font-display text-2xl">
          The word was: <span className="text-gradient-rainbow font-bold">{currentWord}</span>
        </h2>
      </Notification>
      <Notification open={notifySelection}>
        <>
          {choosing ? (
            <span className="text-xl">
              <span className="highlight font-bold">{drawer?.name}</span> is choosing a word 🤔
            </span>
          ) : (
            <span className="text-xl">
              <span className="highlight font-bold">{drawer?.name}</span> starts drawing! 🖌️
            </span>
          )}
        </>
      </Notification>
    </>
  );
};

export default observer(EventNotifier);