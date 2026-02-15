import React, { useCallback, useEffect, useRef, useState } from 'react'
import { canvasService } from '../service/CanvasServices';
import { canvasStore } from '../store/CanvasStore';

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
}

interface Point{
    X:number,
    Y:number
}

const Canavas : React.FC<Props> = ({onStart,onDraw,onEnd,onStop,className}:Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [start,setStart] = useState<Point>({X:0,Y:0})
    const {Height,Width} = canvasStore;
    useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas) return;
        canvas.height = Height;
        canvas.width = Width;
        canvas.style.height = "100%";
        canvas.style.width = "100%";
    },[Height,Width])

    const startDrawing = useCallback(({nativeEvent}:any)=>{
        let { offsetX , offsetY} = nativeEvent;
        const canvas = canvasRef.current;
        if(!canvas) return;
        if(window.TouchEvent){
            if(nativeEvent.changedTouches?.length){
                offsetX = nativeEvent.changedTouches[0].clientX - canvas.offsetLeft;
                offsetY = nativeEvent.changedTouches[0].clientY - canvas.offsetTop;
            }
        }

        const bound  = canvas.getBoundingClientRect();
        const normalizeX = offsetX / bound.width;
        const normalizeY = offsetY / bound.height;
        setStart({X: normalizeX, Y: normalizeY});
        onStart();
    },[onStart,start,canvasRef])

    const finishDrawing = useCallback(()=>{
        onStop()
    },[])

    const canvasLeave = useCallback(()=>{
        onEnd();
    },[onEnd])

   const draw = useCallback(({nativeEvent}:any)=>{
        let {offsetX,offsetY} = nativeEvent; 
        const canvas = canvasRef.current;
        if(!canvas) return;
        if(window.TouchEvent){
            if(nativeEvent.changedTouches?.length){
                offsetX = nativeEvent.changedTouches[0].clientX - canvas.offsetLeft
                offsetY = nativeEvent.changedTouches[0].clientY - canvas.offsetTop
            }
        }
        const bound= canvas.getBoundingClientRect(); // returns an object which contain canvas width,height and location of canvas
        const normalizeX = offsetX/bound.width;  
        const normalizeY = offsetY/bound.height;  
        const context = canvas.getContext("2d")
        if(!context) return;
        onDraw(context,start.X,start.Y,normalizeX,normalizeY);
        setStart({X:normalizeX ,Y:normalizeY})
    },[onDraw,start])


  return (
      <canvas
       ref={canvasRef}
       onMouseDown={startDrawing}
       onMouseMove={draw}
       onMouseUp={finishDrawing}
       onMouseLeave={canvasLeave}
       onTouchStart={startDrawing}
       onTouchEnd={finishDrawing}
       onTouchMove={draw}
       className={className}
       >
       </canvas>
  )
}

export default React.memo( Canavas) ;