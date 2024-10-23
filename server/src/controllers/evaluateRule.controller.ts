import compare from "../helpers/compare";
import asyncHandler from "../utils/asyncHandler";

import { Request, Response } from "express";

export const evaluateRule = asyncHandler(async (req: Request, res: Response) => {
    const { rule, data } = req.body;
    console.log(data);
    try {
        
        if (!rule || !data) {
            res
                .status(400)
                .json({
                    success: false,
                    message: 'Rule and data are required',
                });
            return;
        }
       
        const result = compare(rule, data);
        console.log(rule);
        console.log(data)
        res
            .status(200)
            .json({
                result,
                data,
                success: true,
                message: 'Rule evaluated successfully',
            });
    }
    catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: 'Internal Server Error',
            });
    }
    
});