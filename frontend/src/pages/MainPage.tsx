import React, { useCallback, useEffect, useState } from "react";
import { gameServices } from "../service/GameServices";
import { gameStore } from "../store/GameStore";
import { UserRole } from "../model/entities/Player";
import Header from "../components/Header";
import Input from "../components/Input";
import { isLarge, isMedium, isSmall, useBreakPoint } from "../hooks/useBreakPoint";
import AvatarCanvasArea from "../components/AvatarCanvasArea";
import avatarImage from "../assets/avatarImage.png";
import { canvasService } from "../service/CanvasServices";
import { FiHelpCircle } from "react-icons/fi"
import { TiPencil } from "react-icons/ti"
import { BiEraser } from "react-icons/bi"
import { AiOutlineClear } from "react-icons/ai"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"

interface Props {
  roomId: string;
}

const MainPage: React.FC<Props> = ({ roomId }) => {
  const [name, setName] = useState("");
  const [defaultavatar, setDefaultavatar] = useState(true);

  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState(0);


  const breakPoint = useBreakPoint();
  const handleInput = (e: any) => {
    setName(e.target.value);
  };

  const handlePlay = () => {
    if (!name?.trim()) return;
    if (!roomId?.trim()) {
      gameServices.createRoomClient({
        id: gameStore.myId || "",
        name: name,
        role: UserRole.CREATOR,
        score: 0,
        avatar: defaultavatar ? "" : canvasService.canvasToUrl()
      });
    } else {
      gameServices.joinRoomClient(roomId, {
        id: gameStore.myId || "",
        name: name,
        role: UserRole.JOINER,
        score: 0,
        avatar: defaultavatar ? "" : canvasService.canvasToUrl()
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePlay();
    }
  };

  useEffect(() => {
    if (!roomId?.trim()) return;
    if (!name?.trim()) return;
    gameServices.joinRoomClient(roomId, {
      id: gameStore.myId || "",
      name: name,
      role: UserRole.JOINER,
      score: 0,
    });
  }, []);

  const handleDefault = useCallback(() => {
    setDefaultavatar(t => !t)
  }, [])

  const selectPencil = () => {
    setTool(0);
  };

  const selectEraser = () => {
    setTool(1);
  };

  const selectClear = () => {
    canvasService.clearCanvas();
    setTool(0);
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="main-card w-full max-w-4xl lg:flex lg:flex-row">
        {/* Left side - Avatar drawing */}
        <div className="avatar-draw-section lg:w-2/5 p-5">
          <Header className="lg:hidden mx-auto">SketchSync</Header>
          <h2 className="text-center font-display text-xl mb-3" style={{ color: 'var(--color-purple-dark)' }}>
            🎨 Draw Your Avatar
          </h2>
          <div className="p-3">
            {/* Avatar canvas */}
            <div className="canvas-frame mx-auto aspect-square max-w-[240px] lg:max-w-full">
              <div className={`${defaultavatar ? "hidden" : ""} w-full h-full`}>
                <AvatarCanvasArea tool={tool} drawing={drawing} setDrawing={setDrawing} />
              </div>
              <div className={`${!defaultavatar ? "hidden" : ""} w-full h-full flex items-center justify-center bg-white`}>
                <img src={avatarImage} className="object-contain w-full h-full p-2" />
              </div>
            </div>

            {/* Drawing tools */}
            <div className="flex gap-3 justify-center mt-3">
              <button className={`game-btn-icon ${tool === 0 ? 'active' : ''}`} onClick={selectPencil} title="Pencil">
                <TiPencil className="w-5 h-5" />
              </button>
              <button className={`game-btn-icon ${tool === 1 ? 'active' : ''}`} onClick={selectEraser} title="Eraser">
                <BiEraser className="w-5 h-5" />
              </button>
              <button className="game-btn-icon" onClick={selectClear} title="Clear">
                <AiOutlineClear className="w-5 h-5" />
              </button>
              <button className="game-btn-icon" onClick={handleDefault} title="Random Avatar">
                <GiPerspectiveDiceSixFacesRandom className="w-5 h-5" />
              </button>
            </div>

            {/* Name input */}
            <div className="mt-4 max-w-[280px] mx-auto">
              <Input
                value={name}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={"Enter your name"}
              />
            </div>
          </div>
        </div>

        {/* Right side - Play */}
        <div className="play-section lg:w-3/5 relative">
          {!(isMedium(breakPoint) || isLarge(breakPoint) || isSmall(breakPoint)) && (
            <Header className="mx-auto">SketchSync</Header>
          )}
          <div className="animate-float">
            <p className="font-display text-lg text-center mb-2" style={{ color: 'var(--color-dark)' }}>
              Draw, Guess & Have Fun! 🎉
            </p>
          </div>
          <button onClick={handlePlay} className="play-btn">
            🚀 Play!
          </button>
          <button className="game-btn-icon absolute bottom-4 right-4" title="Help">
            <FiHelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};


export default React.memo(MainPage);