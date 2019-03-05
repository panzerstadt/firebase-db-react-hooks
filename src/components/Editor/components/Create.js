import React, { useState, useEffect } from "react";
import firebase from "../../../libs/firebase";

import styles from "./Create.module.css";

export const Add = ({ databaseRef = "dev-playground/data", children }) => {
  const [state, setState] = useState({ url: "", title: "", imageData: "" });

  const [dbRef, setDbRef] = useState("");
  useEffect(() => {
    const ref = firebase.database().ref(databaseRef);
    setDbRef(ref);
  }, []);

  const handleChange = e => {
    const { value, name } = e.target;

    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("adding / updating db!");
    console.log(state);
    if (state.title) {
      // NOPE
      // firebase
      //   .database()
      //   .ref(databaseRef + "/" + state.title)
      //   .set(state);
      dbRef.push(state);
    } else {
      dbRef.push(state);
    }
  };

  return (
    children || (
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h3>CREATE - Add</h3>
        <label className={styles.inputLabel}>
          title:{" "}
          <input
            className={styles.addInput}
            type="text"
            name="title"
            value={state.title}
            onChange={handleChange}
          />
        </label>
        <label className={styles.inputLabel}>
          image url / base64:{" "}
          <input
            className={styles.addInput}
            type="text"
            name="imageData"
            value={state.imageData}
            onChange={handleChange}
          />
        </label>
        <label className={styles.inputLabel}>
          website url:{" "}
          <input
            className={styles.addInput}
            type="text"
            name="url"
            value={state.url}
            onChange={handleChange}
          />
        </label>
        <label className={styles.inputLabel}>
          type:{" "}
          <input
            className={styles.addInput}
            type="text"
            name="type"
            value={state.type}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Add / Update" onClick={handleSubmit} />
      </form>
    )
  );
};
