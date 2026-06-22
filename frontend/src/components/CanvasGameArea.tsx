import { observer } from "mobx-react";
import React, { useCallback, useRef, useState } from "react";
import { canvasService } from "../service/CanvasServices";
import store from "../store";
import Canvas from "./Canavas";
import { TiPencil } from "react-icons/ti"
import { BiEraser } from "react-icons/bi"
import { AiOutlineClear } from "react-icons/ai"

interface Props { }

const CanvasGameArea: React.FC<Props> = (props) => {
  const [drawing, setDrawing] = useState(false);
  const [pencil, setPencil] = useState(0);

  const { myChance, choosing } = store.gameStore

  const containerRef = useRef<HTMLDivElement>(null)

  const onDrawing = useCallback(
    (
      context: CanvasRenderingContext2D,
      startX: number,
      startY: number,
      currentX: number,
      currentY: number
    ) => {
      if (!context || !drawing || !myChance) return;
      if (pencil === 0) {
        canvasService.drawOnCanvas(startX, startY, currentX, currentY);
      } else if (pencil === 1) {
        canvasService.eraseOnCanvas(currentX, currentY, 20);
      }
      canvasService.searlizeCanvas([
        pencil,
        currentX,
        currentY,
        startX,
        startY,
      ]);
    },
    [drawing, pencil]
  );

  const startDrawing = useCallback(() => {
    if (myChance && !choosing)
      setDrawing(true);
  }, [myChance, choosing]);

  const endDrawing = useCallback(() => {
    setDrawing(false);
  }, [myChance, choosing]);

  const selectPencil = () => {
    if (myChance && !choosing)
      setPencil(0);
  }

  const selectEraser = () => {
    if (myChance && !choosing)
      setPencil(1);
  }

  const selectClear = () => {
    if (!myChance && !choosing)
      return;
    canvasService.clearCanvas();
    canvasService.searlizeCanvas([2]);
    setPencil(0);
  }

  const onExit = useCallback(() => {
    if (myChance && !choosing && drawing)
      setDrawing(false);
  }, [myChance, choosing, drawing])

  return (
    <div className="h-full flex flex-col">
      <div className="canvas-frame flex-1 min-h-0" ref={containerRef}>
        <Canvas onDraw={onDrawing} onStart={startDrawing} onStop={endDrawing} onEnd={onExit} className="bg-white w-full h-full" />
      </div>
      <div className="canvas-tools mt-2">
        <button
          className={`game-btn-icon ${pencil === 0 && myChance ? 'active' : ''}`}
          onClick={selectPencil}
          title="Pencil"
        >
          <TiPencil className="w-5 h-5" />
        </button>
        <button
          className={`game-btn-icon ${pencil === 1 && myChance ? 'active' : ''}`}
          onClick={selectEraser}
          title="Eraser"
        >
          <BiEraser className="w-5 h-5" />
        </button>
        <button
          className="game-btn-icon"
          onClick={selectClear}
          title="Clear"
        >
          <AiOutlineClear className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};



export default observer(CanvasGameArea);