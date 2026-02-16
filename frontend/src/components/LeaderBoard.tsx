import React from 'react'
import store from '../store'
import { observer } from 'mobx-react';


interface Props{}

const LeaderBoard: React.FC<Props> = () => {
  const {topScorers} = store.gameStore;
  return (
    <div>
      <h2 className='text-center'>LeaderBoard</h2>
      <div  className='flex  justify-between'>
        <h2 className='underline'>postion</h2>
        <h2 className='text-green-700'>Name</h2>
        <h2 className='underline'>Score</h2>
      </div>
      {topScorers.map((player,index)=>{
        const colorClass = index===0?"text-orange-400" : index===1?"text-blue-400":index===2 ?"text-green-400":"text-black";
        return(
          <div className={`flex justify-between ${colorClass}`}>
            <h2>{index+1}</h2>
            <h2>{player.name}</h2>
            <h2>{player.score}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default  observer(LeaderBoard);