import React, { useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import styles from "./Chat.module.css";
import { useSelector } from "react-redux";

const Chat = ({ socket }) => {
  const [isSelectColor, setSelectColor] = useState(true);
  const [text, setText] = useState("");
  const { message, name } = useSelector((state) => state.room);

  const sendMessage = (e) => {
    e.preventDefault();

    if(!text) return;

    const messageBody = text;
    socket.emit("newChat", {
      body: messageBody,
      senderId: socket.id,
      name : name,
    });
    setText("");
  };

  const styleConfig = (flag) => {
    if (flag) {
      const obj = {
        width: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems : "center",
        height : "fit-content",
        backgroundColor : "#b6e1ea",
        paddingRight : "30px",
        paddingLeft : "10px",
        maxWidth : "12rem",
        borderRadius : "10px",
        borderEndEndRadius : "50px",
        marginLeft : "auto",
        overflowWrap : "break-word"
      };
  
      return obj;
    } else {
      const obj = {
        width: "auto",
        display: "flex",
        justifyContent: "space-between",
        height : "fit-content",
        alignItems : "center",
        backgroundColor : "#c9c9c9",
        paddingLeft : "30px",
        paddingRight : "10px",
        borderRadius : "10px",
        borderBottomLeftRadius : "40px",
        maxWidth : "21rem",
        marginRight : "auto",
        overflowWrap : "break-word"
      };
      return obj;
    }
  };
  
  const styleConfigChatPull = () => {
    if(!isSelectColor){
      const obj = {
        display : "flex",
        alignItems : "center",
        transform : "translateX(92%)",
      }
      return obj;
    }
    else{
      const obj = {
        display : "flex",
        alignItems : "center",
        transform : "translateX(0%)",
      }
      return obj;
    }
  }

  
  return (
    <div className={styles.chatContainer} style={styleConfigChatPull()}>
      <div
        className={styles.chatBoxContainer}

      >
        <div
          className={styles.chatBoxPull}
          onClick={() => {
            setSelectColor(!isSelectColor);
          }}
        >
          {isSelectColor ? <IoMdArrowForward /> : <IoMdArrowBack />}
        </div>
        <div style={{ width: "21rem"}}>
        <div className={styles.messageDisplayContainer}>
          <div style={{marginTop : "auto"}}>
          {message.map((item, id) => {
            return (
              <div style={{display : "flex", padding : "2px 5px"}}>
                {item.ownedByCurrentUser && <p className={styles.singleMessageContainer}>({item.name})</p>}       
              <div key={id}  style={styleConfig(item.ownedByCurrentUser)}>
                <p className={styles.singleMessageContainer} style={item.ownedByCurrentUser ? {backgroundColor : "#b6e1ea", overflowWrap : "break-word", maxWidth : "13rem"} : {backgroundColor : "#c9c9c9",  overflowWrap : "break-word", maxWidth : "13rem"}}>
                  {item.body}
                </p>
              </div>
                {!item.ownedByCurrentUser && <p className={styles.singleMessageContainer}>({item.name})</p>}  
              </div>
            );
          })}
          </div>
        </div>
        <div>
          <form className={styles.messageTypeContainer} onSubmit={(e) => sendMessage(e)}>
            <input
              value={text}
              type="text"
              onChange={(e) => 
                setText(e.target.value)
              }
              placeholder="Enter message"
            />
            <button type="button" onClick={(e) => sendMessage(e)}>Send</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};


export default Chat;
