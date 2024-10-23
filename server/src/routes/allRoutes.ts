import { Router } from "express";
import {buildAST} from "../controllers/buildAST.controller";
import {combineRulesController} from "../controllers/combineRules.controller";
import { evaluateRule } from "../controllers/evaluateRule.controller";
import { getRulesController } from "../controllers/getRules.controller";

const router = Router();

router.route("/create_rule").post(buildAST);
router.route("/combine_rules").post(combineRulesController);
router.route("/evaluate_rule").post(evaluateRule);


router.route("/get_rules").get(getRulesController)


export default router;