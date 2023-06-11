import React, { useState } from "react";
import "./TabBar.scss";

const tabOptions = [
  { id: "tweets", label: "推文" },
  { id: "replies", label: "回復" },
  { id: "likes", label: "喜歡的內容" },
];

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("tweets");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabBar">
      {tabOptions.map((option) => (
        <button
          key={option.id}
          className={`tabButton ${activeTab === option.id ? "active" : ""}`}
          onClick={() => handleTabClick(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
