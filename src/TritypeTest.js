import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "./components/ui/tabs";

import type1 from "./data/type1.json";
import type2 from "./data/type2.json";
import type3 from "./data/type3.json";
import type4 from "./data/type4.json";
import type5 from "./data/type5.json";
import type6 from "./data/type6.json";
import type7 from "./data/type7.json";
import type8 from "./data/type8.json";
import type9 from "./data/type9.json";

const types = {
  1: type1,
  2: type2,
  3: type3,
  4: type4,
  5: type5,
  6: type6,
  7: type7,
  8: type8,
  9: type9
};

const centerMap = {
  1: "Gut",
  8: "Gut",
  9: "Gut",
  2: "Heart",
  3: "Heart",
  4: "Heart",
  5: "Head",
  6: "Head",
  7: "Head"
};

const typeColors = {
  1: "#ff6f61",
  2: "#f06292",
  3: "#ba68c8",
  4: "#9575cd",
  5: "#7986cb",
  6: "#64b5f6",
  7: "#4dd0e1",
  8: "#4db6ac",
  9: "#81c784"
};

export default function TritypeTest() {
  const [checked, setChecked] = useState({});
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    document.querySelectorAll("[data-tab]").forEach((el) => {
      el.removeAttribute("data-tab-selected");
    });
    const selectedTab = document.querySelector(`[data-tab='${activeTab}']`);
    if (selectedTab) selectedTab.setAttribute("data-tab-selected", activeTab);
  }, [activeTab]);

  const handleCheck = (type, idx) => {
    const key = `${type}-${idx}`;
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const calculateResults = () => {
    const scores = {};
    const centerScores = { Gut: {}, Heart: {}, Head: {} };

    Object.keys(types).forEach((type) => {
      const items = types[type];
      const checkedCount = items.reduce(
        (acc, _, idx) => acc + (checked[`${type}-${idx}`] ? 1 : 0),
        0
      );
      const quotient = checkedCount / items.length;
      scores[type] = quotient;
      centerScores[centerMap[type]][type] = quotient;
    });

const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

// Get top type for each center
const centerWinners = {
  Gut: null,
  Heart: null,
  Head: null
};

for (const [type, score] of sortedScores) {
  const center = centerMap[type];
  if (!centerWinners[center]) {
    centerWinners[center] = type;
  }
}

// Final Tritype is one from each center
const tritype = Object.values(centerWinners)
  .filter(Boolean)
  .sort((a, b) => scores[b] - scores[a]);

    setResults({ scores: sortedScores, tritype });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-orange-500 drop-shadow-md">
          Tritype Checklist
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 sm:grid-cols-9 gap-2 mb-4 text-center">
            {Object.keys(types).map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                data-tab={type}
                className={`font-semibold rounded px-2 py-1 transition-all duration-200 shadow-md border ${
                  activeTab === type ? "ring-2 ring-offset-2 ring-white text-white" : "text-white/90"
                }`}
                style={{ backgroundColor: typeColors[type] }}
              >
                Type {type}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-hidden rounded-xl border bg-orange-50 max-h-[60vh] overflow-y-auto p-4">
            {Object.entries(types).map(([type, statements]) => (
              <TabsContent key={type} value={type}>
                <h2
                  className="text-lg font-semibold mb-4 drop-shadow-md"
                  style={{ color: typeColors[type] }}
                >
                  Type {type} Statements
                </h2>
                <div className="space-y-2">
                  {statements.map((text, idx) => (
                    <label key={idx} className="flex items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={checked[`${type}-${idx}`] || false}
                        onChange={() => handleCheck(type, idx)}
                      />
                      <span>{text}</span>
                    </label>
                  ))}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <div className="text-center">
          <Button onClick={calculateResults}>Submit</Button>
        </div>

        {results && (
          <div className="p-4 border rounded shadow bg-orange-100 text-center">
            <h2 className="text-xl font-semibold text-orange-700 mb-2 drop-shadow-md">
              Results
            </h2>
            <p className="mb-4">
              <strong>Most Likely Tritype:</strong> {results.tritype.join(" - ")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
              {Array.isArray(results.scores) &&
                results.scores.map(([type, score]) => (
                  <div
                    key={type}
                    className="flex justify-between items-center py-2 px-3 rounded text-white font-medium"
                    style={{ backgroundColor: typeColors[type] }}
                  >
                    <span>Type {type}</span>
                    <span>{(score * 100).toFixed(1)}%</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
