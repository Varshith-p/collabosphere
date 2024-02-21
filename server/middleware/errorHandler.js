import { StatusCodes } from "http-status-codes";
import { logEvents } from "./logEvents";

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.log(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export default errorHandler;
