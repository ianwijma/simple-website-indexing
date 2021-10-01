import { Response } from "express";

const defaultResponse = (success: boolean, message: string) => ({
  success,
  message,
});

export function sendSuccess(res: Response, message: string, data?: any): void {
  const json = defaultResponse(true, message);
  res.json(data ? { ...json, data } : json);
}

export function sendError(res: Response, error: Error, data?: any): void {
  const json = defaultResponse(true, error.message);
  res.json(data ? { ...json, data } : json);
}
