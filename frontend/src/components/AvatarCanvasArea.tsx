import { memo, useCallback } from "react"
import React, { Dispatch } from 'react'
import { canvasService } from "../service/CanvasServices"
import Canavas from "./Canavas"

interface Props{
  tool:number,
   drawing:boolean,
   setDrawing: Dispatch<React.SetStateAction<boolean>>
}


const AvatarCanvasArea : React.FC<Props> = ({tool,drawing,setDrawing}) => {

  const onDrawing = useCallback((
      context: CanvasRenderingContext2D,
      startX:number,
      StartY:number,
      currentX:number,
      currentY:number
  )=>{  
    if(!context || !drawing) return;

    if(tool==0){
      canvasService.drawOnCanvas(startX,StartY,currentX,currentY)
    }else if(tool==1){
      canvasService.eraseOnCanvas(currentX,currentY,20)
    }
  },[drawing,tool])

  const startDrawing = useCallback(()=>{setDrawing(true)},[]);

  const endDrawing = useCallback(()=>{setDrawing(false)},[])

  const onExit = useCallback(()=>{setDrawing(false)},[])

  return (
    <div className="w-full h-full rounded-md">
     <Canavas onDraw={onDrawing} onStart={startDrawing} onEnd={endDrawing} onStop={onExit}/>
    </div>
  )
}

export default  memo(AvatarCanvasArea) ;