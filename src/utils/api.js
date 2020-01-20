// api.js

import { BASE_URL } from "../config/index";
import Axios from "axios";
// Axios.defaults.timeout = 10000;

const ENDPOINTS = {
  getBeers: "/v2/beers"
};

export const getBeers = (pageSize, pageNum) => {
  console.log("call getBeers: ");
  return Axios.get(
    BASE_URL + ENDPOINTS.getBeers + `?page=${pageNum}&per_page=${pageSize}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  )
    .then(res => {
      console.log("call getBeers: ", res);
      return res.data;
    })
    .catch(err => {
      console.log("call getBeers: ", err);
      // return err.response.data;
    });
};
