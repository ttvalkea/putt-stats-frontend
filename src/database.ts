import axios from "axios";
import { apiPuttResult, newPuttInsert } from "./types";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
  },
});

const headerConfiguration = {
  headers: {
    throwdata: true,
  },
};

const getPuttResults = async (): Promise<apiPuttResult[]> => {
  try {
    const res = await axiosInstance.get("/putt-results", headerConfiguration);
    const result = {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
    console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error occured on 'getPuttResults'");
    return [];
  }
};

const markNewPuttResult = async (puttData: newPuttInsert): Promise<any> => {
  try {
    const res = await axiosInstance.post(
      "/mark-putt",
      puttData,
      headerConfiguration
    );
    const result = {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
    console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error occured on 'markNewPuttResult'");
    return undefined;
  }
};

const undoLastPuttResult = async (): Promise<any> => {
  try {
    const result = await axiosInstance.put(
      "/undo-putt",
      null,
      headerConfiguration
    );
    console.log(result);
    return result.data;
  } catch (err) {
    console.log("Error occured on 'undoLastPuttResult'");
    return undefined;
  }
};

export { getPuttResults, markNewPuttResult, undoLastPuttResult };
