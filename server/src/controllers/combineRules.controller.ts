import {combineRules } from "../helpers/combineRules";
import astSchema from "../schemas/astSchema";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

export const combineRulesController = asyncHandler(async (req:Request, res:Response) => {
    const { rules } = req.body;

    if (!rules || !Array.isArray(rules)) {
        res
        .status(400)
        .json({
            success: false,
            message: 'Rules are required and should be an array',
        });
        return;
    }
    const combinedRules = combineRules(rules);

    const combinedRulesInstanceInDb = await astSchema.create({ast:combinedRules});
    res
    .status(200)
    .json({
        combinedRules,
        combinedRulesInstanceInDb,
        success: true,
        message: 'Rules combined successfully',
    });
});
