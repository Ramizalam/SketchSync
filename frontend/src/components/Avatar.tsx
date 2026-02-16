import {  ImgHTMLAttributes, useMemo } from "react";
import React from 'react'
import store from "../store";
import { GameStateEnum } from "../enums/GameState";
import { observer } from "mobx-react-lite";

interface Props extends ImgHTMLAttributes<HTMLImageElement>{
    name:string,
    score:number,
    pos?:number
    id: string
}


const Avatar : React.FC<Props> = ({name,src,score,pos,id}) => {

    const{gameState,myId} = store.gameStore;

    const myAvatar = useMemo(()=>{return myId=== id},[myId])

  const posClass = pos === 1? 'text-orange-500 scale-110':
                  pos === 2?'text-blue-500 scale-105':
                  pos === 3?'text-green-600 scale-102': 
                  myAvatar && gameState !== GameStateEnum.END? 'text-green-700 hover:scale-110':
                  'text-black:hover:scale-110';

  return (
    <div className={`h-full w-36 relative shrink-0 hover:scale-110 ${posClass}`}>
        <img src={src} alt="avatar"  className="absoloute bottom-0 right-0 left-0 w-full hover:bottom-2" />
        <div className={`absolute text-center w-24  bottom-1 bg-white rounded-lg opacity-0 shadow-lg  left-4 text-lg`}>
            <h1>{name}</h1>
            {gameState!==GameStateEnum.LOBBY &&  <h1>Score:-{score}</h1> }
        </div>
    </div>
  )
}

export default observer(Avatar);