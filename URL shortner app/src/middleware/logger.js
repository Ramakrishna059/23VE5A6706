const logger = {
  log: (message, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      data,
    };
    console.info("CustomLogger:", JSON.stringify(logEntry, null, 2));
  },
};

export default logger;
