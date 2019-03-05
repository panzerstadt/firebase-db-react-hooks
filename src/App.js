import React, { Component, useState } from "react";

// svg modules
import { ReactComponent as Logo } from "./logo.svg";

// css modules
import styles from "./App.module.css";
import "./App.global.css";

// components
import Editor from "./components/Editor";

export default () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Logo className={styles.logo} />
        <h1>Editor + FirebaseDB.</h1>
      </header>
      <Editor />
    </div>
  );
};
