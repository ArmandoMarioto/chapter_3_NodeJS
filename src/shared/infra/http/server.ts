import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUI from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";

import "@shared/infra/typeorm";

import swaggerFiles from "../../../swagger.json";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFiles));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server listening on"));
