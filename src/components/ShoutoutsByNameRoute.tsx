import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import QueryStringParams from "../models/QueryStringParams";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/shoutoutService";
import AddShoutoutForm from "./AddShoutoutForm";
import Shoutoutcard from "./Shoutoutcard";
import "./ShoutoutsByNameRoute.css";

const ShoutoutsByNameRoute = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const name: string | undefined = useParams().name;

  const getAndSetShoutouts = (params: QueryStringParams): void => {
    getShoutouts(params).then((response) => {
      setShoutouts(response);
    });
  };

  const addShoutoutHandler = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  const deleteAShoutout = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  useEffect(() => {
    getAndSetShoutouts({ to: name });
  }, [name]);

  return (
    <div className="ShoutoutsByNameRoute">
      <h2>Shoutouts for {name}</h2>
      <Link to="/">Back to all shoutouts</Link>
      <AddShoutoutForm onAddNewShoutout={addShoutoutHandler} name={name!} />
      <ul>
        {shoutouts.map((item) => (
          <Shoutoutcard
            shoutout={item}
            key={item._id}
            onDeleteAShoutout={deleteAShoutout}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShoutoutsByNameRoute;
