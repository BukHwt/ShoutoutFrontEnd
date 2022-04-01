import axios from "axios";
import QueryStringParams from "../models/QueryStringParams";
import Shoutout from "../models/Shoutout";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getShoutouts = async (
  params: QueryStringParams
): Promise<Shoutout[]> => {
  return (await axios.get(baseURL, { params })).data;
};

export const addShoutout = async (shoutout: Shoutout): Promise<Shoutout> => {
  return (await axios.post(baseURL, shoutout)).data;
};

export const deleteShoutout = async (id: string): Promise<void> =>
  (await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)).data;
