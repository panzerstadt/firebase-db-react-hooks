import React, { useState, useEffect } from "react";

import styles from "./index.module.css";

import { Add } from "./components/Create";
import { Update } from "./components/Update";
import { ReadFromFirebase } from "./components/Read";

const DB = "dev-playground/data";

const Editor = () => {
  const [editorState, setEditorState] = useState({});

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
      <h3>editor.</h3>
      {/* C */}
      <Add databaseRef={DB} />
      {/* R */}
      <DisplayDatabase />
      <Update />
      <br />
    </div>
  );
};

export default Editor;
