import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import astSchema from "../schemas/astSchema";

export const getRulesController = asyncHandler(async(req:Request, res:Response) => {
    const allRules = await astSchema.find();

    res
    .status(200)
    .json({
        allRules,
        success: true,
        message: 'All rules fetched successfully',
    });
})