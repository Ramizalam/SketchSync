import React, { useEffect, useRef, useState } from 'react'
import { canvasService } from '../service/CanvasServices';

interface Props{

    onDraw:(
        context:CanvasRenderingContext2D,
        sx:number,
        sy:number,
        cx:number,
        cy:number,
    )=> void;
    
    onStart:()=>void;
    onStop:()=>void;
    onEnd:()=>void;
    className?:string;
    height:number;
    width:number;
}

interface Point{
    X:number,
    Y:number
}

const Canavas = ({onStart,onDraw,onEnd,onStop,height,width,className}:Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [start,setStart] = useState<Point>({X:0,Y:0})

    useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;
        canvas.height = height;
        canvas.width = width;
        canvas.style.height = "100%";
        canvas.style.width = "100%";
        canvasService.setCanvas(canvas);

    },[width,height])

    const startDrawing = ({nativeEvent}:any)=>{
        const {offsetX,offsetY} = nativeEvent;
        const canvas = canvasRef.current;
        if(!canvas) return;
        const bound= canvas.getBoundingClientRect();
        const normalizeX = offsetX/bound.width;
        const normalizeY = offsetY/bound.height;

        setStart({X:normalizeX ,Y:normalizeY})

        onStart();
    }

    const finishDrawing = ()=>{
        onEnd()
    }
   const draw = ({nativeEvent}:any)=>{
        const {offsetX,offsetY} = nativeEvent; 
        const canvas = canvasRef.current;
        if(!canvas) return;
        const context = canvas.getContext("2d")
        if(!context) return;
        const bound= canvas.getBoundingClientRect();
        const normalizeX = offsetX/bound.width;
        const normalizeY = offsetY/bound.height;  
        onDraw(context,start.X,start.Y,normalizeX,normalizeY);
        setStart({X:normalizeX ,Y:normalizeY})
    }

    const canvasLeave =()=>{
        onStop();
    }

  return (
      <canvas
       ref={canvasRef}
       onMouseDown={startDrawing}
       onMouseMove={draw}
       onMouseUp={finishDrawing}
       onMouseLeave={canvasLeave}
       className={className}
       >
       </canvas>
  )
}

export default Canavas