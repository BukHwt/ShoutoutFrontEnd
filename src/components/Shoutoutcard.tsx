import { Link } from "react-router-dom";

import Shoutout from "../models/Shoutout";
import "./Shoutoutcard.css";

interface Props {
  shoutout: Shoutout;
  onDeleteAShoutout: (id: string) => void;
}

const Shoutoutcard = ({ shoutout, onDeleteAShoutout }: Props) => {
  return (
    <li className="Shoutoutcard">
      <Link to={`/user/${shoutout.to}`}>
        <h2>Shoutout to {shoutout.to}</h2>
      </Link>
      <h6>
        - from <img src={shoutout.avatar} alt="Avatar" /> {shoutout.from}
      </h6>
      <p>{shoutout.text}</p>
      <img src={shoutout.image} alt="shoutout" />
      <button onClick={() => onDeleteAShoutout(shoutout._id!)}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
};

export default Shoutoutcard;
