import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import QueryStringParams from "../models/QueryStringParams";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/shoutoutService";
import AddShoutoutForm from "./AddShoutoutForm";
import "./Gallery.css";
import Shoutoutcard from "./Shoutoutcard";

const Gallery = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [searchParams] = useSearchParams();
  const to: string | null = searchParams.get("to");
  const from: string | null = searchParams.get("from");
  const queryStringParams: QueryStringParams = {
    ...(to ? { to } : {}),
    ...(from ? { from } : {}),
  };
  const getAndSetShoutouts = (params: QueryStringParams) => {
    getShoutouts({}).then((response) => {
      setShoutouts(response);
    });
  };
  const addNewShoutout = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts({});
    });
  };
  const deleteAShoutout = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts({});
    });
  };

  useEffect(() => {
    getAndSetShoutouts(queryStringParams);
  }, []);

  return (
    <div className="Gallery">
      <h2>All Shoutouts</h2>
      {user ? (
        <AddShoutoutForm onAddNewShoutout={addNewShoutout} name="" />
      ) : (
        <div>
          <p>Sign in to leave a shoutout</p>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      )}

      <ul>
        {shoutouts.map((item) => (
          <Shoutoutcard
            key={item._id}
            shoutout={item}
            onDeleteAShoutout={deleteAShoutout}
          />
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
