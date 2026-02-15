import React, { useCallback, useState } from 'react'
import store from '../store'
import { roundService } from '../service/RoundServices';

interface Props{ }

const ChatArea :React.FC<Props> = () => {
    const [message, setMessage] = useState("")
    const{me ,myChance} = store.gameStore;
    const handleOnchange = useCallback((event:any)=>{
        if(!myChance){
            setMessage(event.target.value);
        }
    },[myChance])

    const {chats} = store.chatStore;

    const sendMessage = ()=>{
        if(me && message.trim() !== '' && !myChance){
            store.chatStore.addChat({by:me , message:message.trim()});
            roundService.chatClient(message.trim());
            setMessage('')
        }
    }

  return (
    <div>ChatArea</div>
  )
}

export default ChatArea