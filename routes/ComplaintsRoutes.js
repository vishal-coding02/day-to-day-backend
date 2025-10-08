const express= require("express")
const compalintsRouter = express.Router()
const { verifyToken } = require("../services/Auth");
const {usersComplaints} = require('../controllers/Complaints')

compalintsRouter.post("/help/complaint", verifyToken, usersComplaints)

module.exports = compalintsRouter