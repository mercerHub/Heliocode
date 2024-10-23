import { combineASTAndRule, combineASTs, combineRules } from "../helpers/combineRules";
import astSchema from "../schemas/astSchema";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

export const combineRulesController = asyncHandler(async (req: Request, res: Response) => {
    const { rules, names, mode ,ruleName} = req.body;
    try {
        if (mode === 'combineASTs') {
            if (!names || !Array.isArray(names)) {
                res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Names are required and should be an array',
                    });
                return;
            }
            const combinedAST = await combineASTs(names);

            const combinedRulesInstanceInDb = await astSchema.create({ ast: combinedAST ,name:ruleName});

            res
                .status(200)
                .json({
                    combinedRulesInstanceInDb,
                    combinedAST,
                    success: true,
                    message: 'ASTs combined successfully',
                });
            return;
        }
        else if (mode === 'combineASTAndRule') {
            if (!names || !Array.isArray(names)) {
                res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Names are required and should be an array',
                    });
                return;
            }
            if (!rules || !rules.length) {
                res
                    .status(400)
                    .json({
                        success: false,
                        message: 'Rules are required and should be an array',
                    });
                return;
            }
            const combinedASTAndRule = await combineASTAndRule(names, rules[0]);
            const combinedRulesInstanceInDb = await astSchema.create({ ast: combinedASTAndRule ,name:ruleName});
            res
                .status(200)
                .json({
                    combinedRulesInstanceInDb,
                    combinedASTAndRule,
                    success: true,
                    message: 'ASTs and Rule combined successfully',
                });
            return;
        }
        else if (mode === 'combineRules') {
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

            const combinedRulesInstanceInDb = await astSchema.create({ ast: combinedRules ,name:ruleName});
            res
                .status(200)
                .json({
                    combinedRulesInstanceInDb,
                    combinedRules,
                    success: true,
                    message: 'Rules combined successfully',
                });
            return;
        }
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({
                success: false,
                message: 'Something went wrong while combining rules',
            });
    }
});
