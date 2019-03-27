import React, { useState, useEffect } from "react";
import firebase from "../../../libs/firebase";
import ReactJson from "react-json-view";

import styles from "./Update.module.css";

import { ShowDB, ReadFromFirebase } from "./Read";
import { DataBlock } from "../blocks/index";

export const updateDB = (databaseRef = "dev-playground/data", data) => {
  if (data.title) {
    firebase
      .database()
      .ref(databaseRef + "/" + data.title)
      .set(data);
  } else {
    firebase
      .database()
      .ref(databaseRef)
      .push(data);
  }
};

export const Update = ({
  databaseRef = "dev-playground/data",
  onUpdated,
  children
}) => {
  const [state, setState] = useState({ url: "", title: "", imageBase64: "" });
  const [content, setContent] = useState("");

  // GET STUFF
  const [dbRef, setDbRef] = useState();
  const [dbState, setDBState] = useState({});
  useEffect(() => {
    const ref = firebase.database().ref(databaseRef);
    setDbRef(ref);

    ref.on("value", snapshot => {
      let data = snapshot.val();
      const keys = Object.keys(snapshot.val());
      keys.map(k => {
        data[k] = { ...data[k], uid: k };
      });
      setDBState(data);
    });
  }, []);

  // CREATE EDITABLE COMPONENTS
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    if (editable && dbRef) {
      const data = dbState;
      const keys = Object.keys(data);

      const output = keys.map((k, i) => {
        if (data[k].type === "data") {
          return (
            <Editable key={k} uid={k} toDelete={!dbState[k]}>
              <DataBlock
                data={data[k]}
                mode="edit"
                onUpdate={handleChange}
                uid={k}
              />
            </Editable>
          );
        } else {
          return (
            <Editable key={k} uid={k} toDelete={!dbState[k]}>
              <p key={k}>this block editing function is not supported yet.</p>
            </Editable>
          );
        }
      });

      setContent(output);
    } else if (!editable && dbRef) {
      const data = dbState;
      const keys = Object.keys(data);

      const output = keys.map((k, i) => {
        if (data[k].type === "data") {
          return <DataBlock key={k} data={data[k]} />;
        } else {
          return (
            <div key={k} style={{ margin: "1rem 0" }}>
              <ReactJson
                style={{ overflow: "hidden" }}
                src={data[k]}
                theme="summerfruit"
              />
            </div>
          );
        }
      });

      setContent(output);
    }
  }, [editable, dbRef, dbState]);

  const Editable = ({ children, uid, toDelete }) => {
    return (
      <div
        key={uid}
        className={styles.editable + " " + (toDelete ? styles.warning : "")}
      >
        <button
          className={styles.editButton}
          style={{
            visibility: editable ? "visible" : "hidden"
          }}
          onClick={() => handleDelete(uid)}
        >
          🧨
        </button>
        {children}
      </div>
    );
  };

  // EDITS
  const handleChange = d => {
    let newDBState = { ...dbState };
    newDBState[d.uid] = d;
    setDBState(newDBState);
  };
  // UPDATE / DELETE
  const handleDBUpdate = () => {
    // "publish" button
    const uidsToDelete = trashUID;
    firebase
      .database()
      .ref(databaseRef)
      .set(dbState);

    setEditable(false);
  };
  // PREPARE TO DELETE
  const [trashUID, setTrashUID] = useState([]);
  const handleDelete = v => {
    let newDBState = { ...dbState };
    delete newDBState[v];
    setDBState(newDBState);
    setTrashUID([...trashUID, v]);
  };

  return (
    <div>
      <h3>UPDATE (+DELETE)</h3>
      <button
        className={styles.modeButton}
        style={{ backgroundColor: editable ? "red" : "black" }}
        onClick={() => setEditable(!editable)}
      >
        edit
      </button>{" "}
      <button className={styles.modeButton} onClick={handleDBUpdate}>
        publish
      </button>
      <br />
      {content}
      <br />
      <h3>ALL DATA - REF</h3>
      <ShowDB />
    </div>
  );
};

export const bulkUpdateDB = (databaseRef = "dev-playground/data", data) => {
  return 0;
};
