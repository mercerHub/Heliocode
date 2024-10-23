import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { parseRule } from "../helpers/parser";
import astSchema from "../schemas/astSchema";

export const buildAST = asyncHandler(async (req: Request, res: Response) => {

    const { ruleString , name} = req.body;
    if(!ruleString) {
        res
        .status(400)
        .json({
            success: false,
            message: 'Rule string is required ',
        });
        return;
    }
    if(!name) {
        res
        .status(400)
        .json({
            success: false,
            message: 'Name is required ',
        });
    }
    const parseResult = parseRule(ruleString);

    const instanceInDb = await astSchema.create({ast:parseResult,name});

    if(!instanceInDb) {
        res
        .status(400)
        .json({
            success: false,
            message: 'Failed to create AST instance in Database',
        });
    }
    
    res
    .status(200)
    .json({
        parseResult,
        instanceInDb,
        success: true,
        message: 'AST built successfully',
    });
});