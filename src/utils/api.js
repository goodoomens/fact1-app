import axios from "axios";
import { get } from "lodash";

const apiUrls = {
  events: {
    api: "https://ergast.com/api/f1/current.json",
    path: "MRData.RaceTable.Races",
    local: require("@/api/f1_current.json"),
  },
  driverStandings: {
    api: "https://ergast.com/api/f1/current/driverStandings.json",
    path: "MRData.StandingsTable.StandingsLists[0].DriverStandings",
    local: require("@/api/f1_current_driverStandings.json"),
  },
  constructorStandings: {
    api: "https://ergast.com/api/f1/current/constructorStandings.json",
    path: "MRData.StandingsTable.StandingsLists[0].ConstructorStandings",
    local: require("@/api/f1_current_constructorStandings.json"),
  },
};

function extractDataFromJson(local, path) {
  return get(local, path);
}

async function fetchDataWithFallback({
  key = null,
  customApiUrl = null,
  customPath = null,
}) {
  const { api, path, local } = key ? apiUrls[key] : {};

  const apiUrl = customApiUrl || api;
  const dataPath = customPath || path;

  if (!apiUrl || !dataPath) {
    throw new Error(
      "Either key or customApiUrl and customPath must be provided"
    );
  }

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return extractDataFromJson(data, dataPath);
  } catch (error) {
    console.error(
      `Error fetching data for ${key || "custom"} from API:`,
      error
    );
    console.error("*** Falling back to local JSON data ***");
    return extractDataFromJson(local, dataPath);
  }
}

export { fetchDataWithFallback };
