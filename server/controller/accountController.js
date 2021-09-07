require("dotenv").config()
const { Account } = require("../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AccountController {
    static register(req, res, next) {
        const { name, email, password } = req.body
        Account.create({ name, email, password })
        .then((data) => {
            res.status(201).json({
                message: "Register Success!",
                result: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal Server Error",
                result: err,
            })
        })
    }

    static login (req,res, next){

        const {email, password} = req.body

        Account.findOne({where : {
            email: email, isAdmin: false
        }})
        .then((data) => {
            bcrypt.compare(password, data.password)
            .then((isHashed) => {
                if(!isHashed){
                    res.status(200).json({
                        message: "Wrong Email or Password"
                    })
                } else {
                    jwt.sign({
                        name: data.name,
                        email: data.email,
                        isAdmin: data.isAdmin
                    }, process.env.SECRET_KEY,
                    (err, token) => {
                        if (err){
                            console.log("error creating a token", err)
                        } else {
                            res.status(200).json({
                                message: "Login success",
                                token: token
                            })
                        }
                    }
                    )
                }
            })
        })
        .catch((err) => {
            res.status(404).json({
                message: "User Not Found, Please Register.",
                log: err
            })
        })
    }

    static getAll(req, res, next) {
        Account.findAll({ attributes: ["name", "email", "isAdmin"] })
        .then((data) => {
            res.status(200).json({
                message: "Get Data Success!",
                result: data
            })
        }).catch((err) => {
            res.status(500).json({
                message: "Internal Server Error",
                log: err
            })
        })
    }

    static getOne(req, res, next) {
        const accountId = req.params.id

        if (!accountId) {
            res.status(422).json({
                message: "Data couldn't be processed"
            })
        } else {
            Account.findOne({
                where: { id: accountId },
                attributes: ["name", "email", "isAdmin"]
            })
            .then((data) => {
                res.status(200).json({
                    message: "Get One success",
                    data: data
                })
            }).catch((err) => {
                res.status(500).json({
                        message: "Internal Server Error",
                        log: err
                    })
                })
        }
    }


    static update(req, res, next) {
        const { name, email, password } = req.body
        const accountId = req.params.id

        if (!accountId) {
            res.status(422).json({
                message: "Data Couldnt be Processed",
            })
        } else {
            Account.findOne({ where: { id: accountId } })
                .then((data) => {
                    data.update({ name, email, password }, { where: { id: accountId } })
                        .then((updated) => {
                            res.status(200).json({
                                message: "Update Success",
                                result: updated
                            })
                        }).catch((err) => {
                            res.status(500).json({
                                message: "Internal Server Error",
                                log: err
                            })
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Internal Server Error",
                        log: err
                    })
                })

        }
    }

    static delete(req, res, next) {
        const accountId = req.params.id

        if (!accountId) {
            res.status(422).json({
                message: "Data Couldnt be Processed",
            })
        } else {
            Account.destroy({ where: { id: accountId } })
                .then((data) => {
                    res.status(200).json({
                        message: "Delete Data Success",
                        result: data
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Delete failed",
                        log: err
                    })
                })
        }
    }

    static checkAllBody(req, res, next) {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            console.log("Failed to validate all body")
            res.status(422).json({
                message: "Unprocessable Data"
            })
        } else {
            console.log("Success")
            next()
        }
    }
}

module.exports = AccountController