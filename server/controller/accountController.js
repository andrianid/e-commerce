const { Account } = require("../models/");

class AccountController {
    static register(req, res, next) {
        const { name, email, password } = req.body;

        if (!name | !email | !password) {
            res.status(422).json({ message: "Data could not be processed" })
        } else {
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
            Account.destroy({where: {id: accountId}})
            .then((data) => {
                res.status(200).json({
                    message: "Delete Data Success",
                    result: data
                })
            }) .catch((err) => {
                res.status(500).json({
                    message: "Delete failed",
                    log: err
                })
            })
        }
    }
}

module.exports = AccountController