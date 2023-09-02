
export const processRequest = async (req, res, next) => {
    try {
      // Capture the correlation ID from the request headers
      let correlationId = req.headers["x-correlation-id"];
  
      // Generate a new correlation ID if it doesn't exist
      if (!correlationId) {
        correlationId = Date.now().toString();
  
        // Set the correlation ID in the request headers
        req.headers["x-correlation-id"] = correlationId;
      }
  
      // Set the correlation ID in the response headers
      res.set("x-correlation-id", correlationId);
  
      // Continue processing the request
      return next();
    } catch (error) {
      // Pass the error to the error handling middleware
      return next(error);
    }
  };
  