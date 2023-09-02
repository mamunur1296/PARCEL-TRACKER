
export class GeneralError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }
    getCode() {
      return 500; // Default to Internal Server Error (500)
    }
  }
  
  export class BadRequest extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
      }
    getCode() {
      return 400;
    }
  }
  
  export class NotFound extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "NotFound";
      }
    getCode() {
      return 404;
    }
  }
  