import { observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { roundService } from "../service/RoundServices";
import store from "../store";
import { GrSend } from "react-icons/gr"

interface Props { }

const ChatArea: React.FC<Props> = () => {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { me, myChance } = store.gameStore;
    const handleOnChange = useCallback((event: any) => {
        if (!myChance)
            setMessage(event.target.value);
    }, [myChance]);

    const { chats } = store.chatStore;

    const sendMessage = () => {
        if (me && message.trim() !== '' && !myChance) {
            store.chatStore.addChat({ by: me.name, message: message.trim() });
            roundService.chatClient(message.trim())
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats.length]);

    return (
        <div className="chat-container h-full">
            <div className="chat-header">
                💬 Chat
            </div>
            <div className="chat-messages" style={{ flex: 1, minHeight: 0 }}>
                {chats.map((chat, index) => (
                    <div className="chat-bubble" key={chat.by + chat.message + index}>
                        <span className="chat-sender">
                            {chat.by}:
                        </span>
                        {chat.message}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                <input
                    value={message}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    placeholder={myChance ? "You're drawing!" : "Type your guess..."}
                    className="chat-input"
                    disabled={myChance}
                />
                <button onClick={sendMessage} className="chat-send-btn" disabled={myChance}>
                    <GrSend />
                </button>
            </div>
        </div>
    );
};

ChatArea.defaultProps = {};

export default observer(ChatArea);