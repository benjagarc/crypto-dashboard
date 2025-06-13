import { errorCases, successCases } from "./cases";

export type ErrorCode = keyof typeof errorCases;

export type SuccesCode = keyof typeof successCases;
