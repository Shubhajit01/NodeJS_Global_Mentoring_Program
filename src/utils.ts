import { plainToClassFromExist, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import express from 'express';

export const validateBodyDto =
  (dto: any) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const body = plainToInstance(dto, req.body);
    const errors = await validate(body, {
      forbidUnknownValues: true,
      whitelist: true,
    });
    if (errors.length) {
      res.json(errors);
      return;
    }
    next();
  };
