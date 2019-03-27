import React, { useState, useEffect } from "react";

// svg modules
import { ReactComponent as Logo } from "./logo.svg";

// css modules
import styles from "./App.module.css";
import "./App.global.css";

// components
import Editor from "./components/Editor";

export default () => {
  const [header, setHeader] = useState(true);
  useEffect(() => {
    setTimeout(() => setHeader(false), 10000);
  }, []);

  return (
    <div className={styles.app}>
      {header && (
        <header className={styles.header}>
          <Logo className={styles.logo} />
          <h1>Editor + FirebaseDB.</h1>
        </header>
      )}

      <Editor />
    </div>
  );
};
