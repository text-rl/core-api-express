import express from "express";

export function getBasePath(req: express.Request): string{
    return `${req.protocol}://${req.get('host')}`
}
