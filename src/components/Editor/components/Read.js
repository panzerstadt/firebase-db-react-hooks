import React, { useState, useEffect } from "react";
import firebase from "../../../libs/firebase";

import ReactJson from "react-json-view";

export const ReadFromFirebase = (databaseRef = "dev-playground", callback) => {
  return firebase
    .database()
    .ref(databaseRef)
    .on("value", snapshot => {
      const vals = snapshot.val();
      callback(vals);
    });
};

export const ShowDB = ({ databaseRef = "dev-playground", onDBUpdate }) => {
  const [dbState, setDBState] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref(databaseRef)
      .on(
        "value",
        snapshot => {
          const vals = snapshot.val();
          setDBState(vals);
          if (onDBUpdate) onDBUpdate(vals);
        },
        [dbState]
      );
  }, []);

  return (
    <ReactJson
      style={{ overflow: "hidden" }}
      src={dbState}
      theme="summerfruit"
    />
  );
};
