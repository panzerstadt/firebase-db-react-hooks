import React, { useState, useEffect } from "react";

import styles from "./index.module.css";
import build from "./assets/crane.svg";

import { Add } from "./components/Create";
import { Update } from "./components/Update";
import { ReadFromFirebase } from "./components/Read";

const DB = "dev-playground/data";

const Editor = () => {
  const [editorState, setEditorState] = useState({});
  const [debug, toggleDebug] = useState(false);

  useEffect(() => {
    ReadFromFirebase(DB, setEditorState);
  }, []);

  const DisplayDatabase = () => {
    const keys = Object.keys(editorState);

    return (
      <>
        <h3>READ</h3>
        <ul>
          {keys.map((k, i) => (
            <li key={i}>
              {editorState[k].title} -> {editorState[k].url}
              <br />
              <img
                style={{ height: 100 }}
                src={editorState[k].imageData}
                alt="img"
              />
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className={styles.editorMain}>
      <button
        className={styles.editorBtn}
        style={{ backgroundColor: debug ? "rgb(255, 88, 88)" : "white" }}
        onClick={() => toggleDebug(!debug)}
      >
        <img src={build} height={20} alt="edit" />
      </button>
      <h3>editor.</h3>
      {/* C */}
      {debug && <Add databaseRef={DB} />}
      {/* R */}
      {debug && <DisplayDatabase />}
      {/* UD */}
      <Update />
    </div>
  );
};

export default Editor;
