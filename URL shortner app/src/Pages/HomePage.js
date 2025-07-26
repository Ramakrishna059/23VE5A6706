import React, { useState } from "react";
import UrlForm from "../components/UrlForm";
import { Link } from "react-router-dom";
import logger from "../utils/logger";
const generateCode = () => Math.random().toString(36).substring(2, 7);
const HomePage = ({ links, setLinks }) => {
  const handleShorten = ({ url, code, validity }) => {
    const shortcode = code || generateCode();
    const existing = links.find((l) => l.code === shortcode);
    if (existing) return alert("Shortcode already exists");
    const createdAt = Date.now();
    const expiry = createdAt + ((validity || 30) * 60 * 1000);
    const newLink = {
      url, code: shortcode, createdAt, expiry, clicks: []
    };
    logger.log("Short URL created", newLink);
    setLinks([...links, newLink]);
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Shorten a URL</h2>
      <UrlForm onShorten={handleShorten} />
      <h3>Shortened URLs</h3>
      <ul>
        {links.map((l) => (
          <li key={l.code}>
            <a href={`/${l.code}`}>http://localhost:3000/{l.code}</a> → {l.url} <br />
            Expires: {new Date(l.expiry).toLocaleString()}
          </li>
        ))}
      </ul>
      <Link to="/stats">View Stats</Link>
    </div>
  );
};
export default HomePage;
