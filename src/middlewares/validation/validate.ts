import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import { ErrorHandler } from "../../errors/errorHandler";


const validate = (schema: ObjectSchema<any>, typeSchema: "body" | "query" | "params" = "body") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validateAsync(req[typeSchema]);
      req[typeSchema] = validated;
      next();
    } catch (err: any) {
      next(new ErrorHandler(err.message, 400));
    }
  };
};

export { validate };
