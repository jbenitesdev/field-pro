import React, { useEffect, useState } from "react";

import "./App.css";
import GrowthStage from "./Graphics/Graphics";
import axios from "axios";

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json"
      )
      .then((response) => {
        console.log(response);
        setData(response.data);
      });
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex" }} className="teste">
        <GrowthStage data={data} />
      </div>
    </div>
  );
}

export default App;
