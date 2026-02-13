import  { useEffect, useRef, useState } from 'react'
import Canavas from './components/Canavas';
import  { canvasService } from './service/CanvasServices';

const App = () => {
  const [drawing, setDrawing] = useState(false);
  const [pencil, setPencil] = useState(0);
  const [height,setHeight] = useState(window.innerHeight/2);
  const [width, setWidth] = useState(window.innerWidth/2);

  const containerRef = useRef<HTMLDivElement>(null);

  const onDrawing = (
    context : CanvasRenderingContext2D,
    sx:number,  //startpoint(sx,sy)
    sy:number,
    cx:number, // currentPoint(cx,cy)
    cy:number,
  )=>{
    if(!drawing || !context) return;
    if(pencil==0){
      canvasService.drawOnCanvas(sx,sy,cx,cy);
      canvasService.searlizeCanvas([pencil,sx,sy,cx,cy]);

    }else if (pencil==1){
      //erase
      canvasService.eraseOnCanvas(cx,cy,20);
      canvasService.searlizeCanvas([pencil,cx,cy])
    }
  };

  const StartDrawing = ()=>setDrawing(true);
  const endDrawing = ()=>setDrawing(false);
  const  onExit = ()=>{
    if(drawing){
      setDrawing(false);
    }
  }
  const selectEraser =()=>setPencil(1);
  const selectPencil =()=>setPencil(0);

  useEffect(()=>{
    window.addEventListener("resize",(event:any)=>{
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      return()=>{
        window.removeEventListener("resize",()=>{});
      }
    })
  },[containerRef.current])

  return (
    <div className='h-screen w-screen'>
      <div className='w-full h-96 mx-auto border-2 border-black rounded-md'
      ref={containerRef}
      >
        <Canavas
        onDraw={onDrawing}
        onStart={StartDrawing}
        onStop={endDrawing}
        onEnd={onExit}
        className='bg-white w-full h-full'
        height={height}
        width={width}
        />
      </div>
      <div className='mt-4 flex justify-center space-x-4 h-1/10'>
      <button  className='border-2 px-2' onClick={selectPencil}>Pencil</button>
      <button  className='border-2 px-2' onClick={selectEraser}>Eraser</button>
      </div>

    </div>
  )
}

export default App