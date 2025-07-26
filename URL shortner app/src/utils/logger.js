const logger = {
  log: (message, meta = {}) => {
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push({ timestamp: new Date().toISOString(), message, meta });
    localStorage.setItem("logs", JSON.stringify(logs));
  }
};
export default logger;
