import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import StatsPage from "./Pages/StatsPage";
import logger from "./middleware/logger"; // Custom logging middleware

function App() {
  const [links, setLinks] = useState(() => {
    const stored = localStorage.getItem("shortLinks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("shortLinks", JSON.stringify(links));
  }, [links]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage links={links} setLinks={setLinks} />} />
        <Route path="/stats" element={<StatsPage links={links} />} />
        <Route path="/:shortcode" element={<RedirectHandler links={links} setLinks={setLinks} />} />
      </Routes>
    </Router>
  );
}

const RedirectHandler = ({ links, setLinks }) => {
  const { shortcode } = useParams();
  const link = links.find((l) => l.code === shortcode);

  if (!link) return <div style={{ padding: 20 }}>⚠️ Short URL not found</div>;
  if (Date.now() > link.expiry) return <div style={{ padding: 20 }}>⛔ This link has expired</div>;

  useEffect(() => {
    // Log and redirect
    const updatedLinks = links.map((l) =>
      l.code === shortcode
        ? {
            ...l,
            clicks: [
              ...l.clicks,
              {
                timestamp: new Date().toISOString(),
                source: document.referrer || "Direct",
              },
            ],
          }
        : l
    );

    logger.log("Redirect triggered", {
      shortcode,
      target: link.url,
      time: new Date().toISOString(),
    });

    setLinks(updatedLinks);

    // Redirect to the original long URL
    window.location.href = link.url;
  }, [shortcode]);

  return <div style={{ padding: 20 }}>🔗 Redirecting to {link.url}...</div>;
};

export default App;
