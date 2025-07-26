import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { isValidUrl, isValidShortcode } from "../utils/validator";
import logger from "../utils/logger";
const UrlForm = ({ onShorten }) => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [validity, setValidity] = useState("");
  const handleSubmit = () => {
    if (!isValidUrl(url)) return alert("Invalid URL");
    if (code && !isValidShortcode(code)) return alert("Invalid shortcode");
    if (validity && isNaN(validity)) return alert("Validity must be a number");
    logger.log("URL submitted", { url, code, validity });
    onShorten({ url, code, validity });
    setUrl(""); setCode(""); setValidity("");
  };
  return (
    <Stack spacing={2}>
      <TextField label="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <TextField label="Custom Shortcode (optional)" value={code} onChange={(e) => setCode(e.target.value)} />
      <TextField label="Validity in Minutes (optional)" value={validity} onChange={(e) => setValidity(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
    </Stack>
  );
};
export default UrlForm;
