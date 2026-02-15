import React from 'react'
import { userBreakingPoint } from '../hooks/useBreakPoint';

interface Props{
    currentOption:number;
    handleOption:(val:number)=>void;
}

const GamePage: React.FC<Props> = ({handleOption,currentOption}) => {
        const  breakPoint = userBreakingPoint();
  return (
    <div>
        <div>
            
        </div>



    </div>
  )
}

export default GamePage