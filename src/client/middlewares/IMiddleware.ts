import express from "express";

export interface IMiddleware{
    handle(request: express.Request, response: express.Response, next: () => void): void;
}
