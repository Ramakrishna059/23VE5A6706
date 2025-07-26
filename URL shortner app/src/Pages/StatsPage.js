import React from "react";
import {Link} from "react-router-dom";
const StatsPage = ({ links }) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Stats</h2>
      <ul>
        {links.map((l) => (
          <li key={l.code}>
            <strong>Short URL:</strong> <a href={`/${l.code}`}>http://localhost:3000/{l.code}</a><br />
            Clicks: {l.clicks.length}<br />
            {l.clicks.map((c, i) => (
              <div key={i}> - {c.timestamp} from {c.source}</div>
            ))}
          </li>
        ))}
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
};
export default StatsPage;
