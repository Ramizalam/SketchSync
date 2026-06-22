
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import Header from "../components/Header";
import { UserRole } from "../model/entities/Player";
import { gameServices } from "../service/GameServices";
import store from "../store";
import { FiShare2 } from "react-icons/fi"

interface Props { }

const LobbyPage: React.FC<Props> = (props) => {
  const { roomId, me, setting, players } = store.gameStore;

  const disabled = me?.role === UserRole.JOINER || players.length < 2;
  const roundOptions = Array(8)
    .fill(0)
    .map((_, index) => <option value={index + 3} key={index + 3}>{index + 3}</option>);

  const timeOptions = Array(8)
    .fill(45)
    .map((n, index) => (
      <option value={n + index * 15} key={n + index * 15}>{n + index * 15}s</option>
    ));

  const handleStartGame = () => {
    gameServices.startGameClient();
  };

  const handleRoundChange = (event: any) => {
    store.gameStore.setSetting({
      total_rounds: +event.target.value,
      round_time: setting.round_time,
    });
  };

  const handleTimeChange = (event: any) => {
    store.gameStore.setSetting({
      round_time: +event.target.value,
      total_rounds: setting.total_rounds,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.host + "/?" + roomId)
  }

  useEffect(() => {
    if (me && me.role === UserRole.CREATOR) gameServices.roomSyncClient({ settings: setting });
  }, [setting.round_time, setting.total_rounds, me?.role]);

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="lobby-card w-full max-w-md flex flex-col items-center space-y-5">
        <Header>SketchSync</Header>

        <div className="w-full space-y-2">
          <DropDown
            id="rounds"
            title="🎯 Rounds:"
            value={setting.total_rounds}
            onChange={handleRoundChange}
            disabled={disabled}
          >
            {roundOptions}
          </DropDown>
          <DropDown
            id="time"
            title="⏱️ Time:"
            value={setting.round_time}
            onChange={handleTimeChange}
            disabled={disabled}
          >
            {timeOptions}
          </DropDown>
        </div>

        <Button disabled={disabled} onClick={handleStartGame} variant="primary">
          🎮 Start Game
        </Button>

        <div className="invite-link-area w-full">
          <span className="font-display text-sm" style={{ color: 'var(--color-dark)', whiteSpace: 'nowrap' }}>
            🔗 Invite:
          </span>
          <a href={`/?${roomId}`} target={"_blank"} className="invite-link truncate flex-1">
            {roomId}
          </a>
          <button className="game-btn-icon" onClick={handleCopy} title="Copy Link" style={{ width: '34px', height: '34px', minWidth: '34px' }}>
            <FiShare2 className="w-4 h-4" />
          </button>
        </div>

        <p className="font-body text-sm animate-float" style={{ color: 'var(--color-blue)' }}>
          👥 {players.length} player{players.length !== 1 ? 's' : ''} in lobby...
        </p>
      </div>
    </div>
  );
};



export default observer(LobbyPage);
