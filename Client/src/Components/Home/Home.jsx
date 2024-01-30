import React, { useRef, useState } from "react";
import styles from "./Home.module.css";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const copyRef = useRef(null);

  const [URL, setURL] = useState("https://doodle-sketch.netlify.app/");
  // const [URL, setURL] = useState("http://localhost:5173/");
  const [showLinkContainer, SetshowLinkContainer] = useState(false);
  const [input, setInput] = useState(null);

  const handleClickGeneratorLink = () => {
    const unique_id = uuid();
    const formattedId = unique_id.replace(/-/g, "").slice(0, 16);
    const truncatedId = formattedId.replace(/(.{4})/g, "$1-");
    setURL((prev) => {
      const lastSlashIndex = prev.lastIndexOf("/");
      if (lastSlashIndex === prev.length - 1) {
        const new_URL = prev + `room/${truncatedId.slice(0, -1)}`;
        return new_URL;
      }
      const resultString = prev.substring(0, lastSlashIndex + 1);
      const new_URL = resultString + `${truncatedId.slice(0, -1)}`;

      return new_URL;
    });
    SetshowLinkContainer(true);
  };

  const handleClickGotoRoomId = () => {
    const room_id = input;
    if (!room_id) {
      alert("No room id entered");
      return;
    }
    navigate(`/room/${room_id}`);
  };

  const handleGotoRecentlyCreatedLink = () => {
    const lastSlashIndex = URL.lastIndexOf("/");
    const resultString = URL.substring(lastSlashIndex + 1, URL.length);
    navigate(`/room/${resultString}`);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.linkboxContainer}>
        <h3 className={styles.homeHeader}>Share and start</h3>
        <div className={styles.linkContaier}>
          <button
            className={styles.newLinkButton}
            onClick={handleClickGeneratorLink}
          >
            New Link
          </button>
          <div className={styles.enterRoomIdContainer}>
            <input
              value={input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleClickGotoRoomId}>Go</button>
          </div>
        </div>
        {showLinkContainer ? (
          <div className={styles.newLinkContainer}>
            <input ref={copyRef} type="text" value={URL} />
            <button onClick={() => navigator.clipboard.writeText(URL)}>
              Copy
            </button>
            <button onClick={handleGotoRecentlyCreatedLink}>Go</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
