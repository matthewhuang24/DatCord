import React from 'react';
import Message from '../components/Message';

const MessageContainer = props => {
    
    const messages = props.messageList.map(message => {
        return(<Message
            key={message.id}
            id={message.id}
            message={message.message}
            user_id={message.user_id}
            deleteMessage={props.deleteMessage}
        />)
    })
    
    return(
        <div id="messageContainer">
            {messages}
        </div>
    )
}

export default MessageContainer;