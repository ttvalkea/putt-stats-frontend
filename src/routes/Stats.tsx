import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPuttResults } from "../database";
import { apiPuttResult } from "../types";
import { groupBy, orderBy } from "lodash";
import { parseISO } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import PuttPercentageComponent from "../components/PuttPercentageComponent";

export default function Stats() {
  const [stats, setStats] = useState([] as apiPuttResult[]);
  const [showUndonePutts, setShowUndonePutts] = useState(false);
  const handleShowUndonePuttsChange = () => {
    setShowUndonePutts(!showUndonePutts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const puttResults = await getPuttResults();
      if (!puttResults) {
        toast.error("An error occured trying to get putt results.");
      } else {
        setStats(puttResults);
      }
    };

    fetchData();
  }, []);

  const getStatsGroupedByDay = (
    stats: apiPuttResult[]
  ): { day: string; putts: apiPuttResult[] }[] => {
    const groupedStats = groupBy(
      stats.filter((p) => !p.isUndone || showUndonePutts),
      (result: apiPuttResult) => {
        const parsedDate = parseISO(result.puttTimestamp);
        return `${parsedDate.getFullYear()}-${
          parsedDate.getMonth() + 1
        }-${parsedDate.getDate()}`;
      }
    );

    // Modify the dictionary into an array
    const objectArrayForStats: { day: string; putts: apiPuttResult[] }[] = [];
    Object.entries(groupedStats).forEach(([key, value]) => {
      objectArrayForStats.push({ day: key.toString(), putts: value });
    });

    return objectArrayForStats;
  };

  const statsForADayTables: any[] = [];
  const statsGroupedByDayAndSortedByDay = orderBy(
    getStatsGroupedByDay(stats),
    ["day"],
    ["desc"]
  );
  for (let index = 0; index < statsGroupedByDayAndSortedByDay.length; index++) {
    const statsForADay = statsGroupedByDayAndSortedByDay[index];
    statsForADayTables.push(
      <h3 key={`day-title-${statsForADay.day}`}>{statsForADay.day}</h3>
    );

    const puttsForADayOrdered = orderBy(
      statsForADay.putts,
      ["puttResultId"],
      ["desc"]
    );

    const styleForPercentageElement = { padding: "10px" };
    statsForADayTables.push(
      <div
        key={`percentage-element-${statsForADay.day}`}
        style={{ marginBottom: "10px" }}
      >
        <span style={styleForPercentageElement}>
          <PuttPercentageComponent
            putts={puttsForADayOrdered.filter(
              (p) => p.distance >= 4 && p.distance <= 10
            )}
            header="C1"
          />
        </span>
        <span style={styleForPercentageElement}>
          <PuttPercentageComponent
            putts={puttsForADayOrdered.filter((p) => p.distance > 10)}
            header="C2"
          />
        </span>
        <span style={styleForPercentageElement}>
          <PuttPercentageComponent
            putts={puttsForADayOrdered.filter((p) => p.distance < 4)}
            header="BE"
          />
        </span>
      </div>
    );

    const puttElementsForADay: any[] = [];
    for (let i = 0; i < puttsForADayOrdered.length; i++) {
      const putt = puttsForADayOrdered[i];
      const style = {
        backgroundColor: putt.isMade ? "#1e3" : "#a00",
        color: putt.isMade ? "#111" : "#fff",
        padding: "6px",
        margin: "4px",
        fontWeight: "bold",
        borderRadius: "25px",
        opacity: putt.isUndone ? "20%" : "100%",
        width: "25px",
      };
      puttElementsForADay.push(
        <div key={putt.puttResultId} style={style}>
          {putt.distance === 21 ? "20+" : putt.distance}
        </div>
      );
    }

    statsForADayTables.push(
      <div
        key={`day-stat-container-${statsForADay.day}`}
        style={{
          display: "flex",
          maxWidth: "100vw",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingBottom: "50px",
        }}
      >
        {puttElementsForADay}
      </div>
    );
  }

  return (
    <main className="App">
      <ToastContainer />
      <h2>Putting stats</h2>
      <Link to="/" style={{ fontSize: "20px" }}>
        Back to marking
      </Link>
      <br />
      <input
        type="checkbox"
        id="show-undone-putts-checkbox"
        checked={showUndonePutts}
        onChange={handleShowUndonePuttsChange}
        style={{ marginTop: "20px" }}
      />
      <label htmlFor="show-undone-putts-checkbox">Show undone putts</label>
      <br />
      {statsForADayTables}
    </main>
  );
}
