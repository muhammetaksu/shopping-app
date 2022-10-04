const express = require("express");
const router = express.Router();
const auth = require("../controller/auth/auth");

router
    .route("/")

    .post(auth.login);

router
    .route("/admin")

    .post(auth.adminLogin);
module.exports = router;
