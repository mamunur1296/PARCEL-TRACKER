import { GeneralError } from "../utill/errors.js";

export const errorHandler = async (err, req, res, next) => {
  let code = 500;

  if (err instanceof GeneralError) {
    code = err.getCode();
  }

  // Log the error
  console.error(err);

  let correlationId = req.headers["x-correlation-id"];

  return res.status(code).json({
    correlationId,
    message:err.message,
  });
};
