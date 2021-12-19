import e from "express";
import {Guid} from "guid-typescript";

export type ConnectedUserIdRequest = e.Request & { userId: Guid }
export type Environment = "Development" | "Production" | string
