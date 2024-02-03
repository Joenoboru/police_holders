
const policyholders = require("../controllers/policyholders");
const express = require("express");
const router = express.Router();

router.get("/api/policyholders/:code", policyholders.getPolicyholders)
router.get("/api/policyholders/:code/top", policyholders.getTopPolicyholders)

module.exports = router;
