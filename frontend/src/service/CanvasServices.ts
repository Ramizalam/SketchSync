import { canvasStore } from "../store/CanvasStore";
import { gameServices } from "./GameServices";

class CanvasService{
    private static _instance : CanvasService|null;
    private _canvas:HTMLCanvasElement|null=null;
    private _batchArray : Array<Array<number>> =[];
    private readonly _batchTime=50; //wait 50 milisecond to accumalilate all the command and then send it 
    private _isRequiredSending =false;


    private constructor (){};

    public setCanvas(canvas: HTMLCanvasElement){
        this._canvas =canvas;
    }
    public static getInstance():CanvasService{
        if(!CanvasService._instance){
           CanvasService._instance = new CanvasService();
        }
        return CanvasService._instance;
    }

    public drawOnCanvas(
        startX :number,
        startY:number,
        currentX:number,
        currentY:number
    ){
        if(!this._canvas) return;
        const context = this._canvas.getContext("2d");
        if(!context) return;

        startX*= this._canvas.width;
        startY *=this._canvas.height;

        currentX *= this._canvas.width;
        currentY *= this._canvas.height;

        context.beginPath();
        //create a line from start to current point
        context.moveTo(startX,startY);
        context.lineTo(currentX,currentY);
        //fill that line with black color and set linewidth ==2
       context.strokeStyle = "black";
        context.lineWidth =2;
        //renders the line
        context.stroke();
    }

    public eraseOnCanvas(
        currentX : number,
        currentY : number,
        size =20
    ){
        if(!this._canvas) return;
        const context = this._canvas.getContext('2d');
        if(!context) return;

        currentX *= this._canvas.width;
        currentY *= this._canvas.height;

        // it color the eraser with white color becaue we are using "fill" and whenever the the erase move it keep on conloring with white eraser
        context.fillStyle = "white";
        // draw white color eraser
        context.fillRect(currentX,currentY,size,size)

    }

    public searlizeCanvas(command :Array<number>){
        //instance of sending the cordinates/command pixel by pixel we are sending a batch of commands together after _batchtime
        this._batchArray.push(command)
       if(!this._isRequiredSending){
           setTimeout(() => {
            gameServices.drawClient(this._batchArray);
            this._batchArray =[];
            this._isRequiredSending = false;
          }, this._batchTime);
       }
       this._isRequiredSending =true;
    }

    public clearCanvas(){
        const canvas = canvasStore.Canvas;
        if(!canvas) return;

        const context  =canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        context?.clearRect(0,0,width,height);
    }
}

export const  canvasService = CanvasService.getInstance();