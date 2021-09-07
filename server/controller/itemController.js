require("dotenv").config()
const { Item } = require("../models/");


class ItemController {
    static addItem(req, res, next) {
        const {name, thumbnail, price, stock} = req.body

        console.log(req.body)
        Item.create({ name, thumbnail, price, stock })
        .then((data) => {
            res.status(201).json({
                message: "Add Item Success!",
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

    static getAll(req, res, next) {
        Item.findAll()
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
        const itemId = req.params.id

        if (!itemId) {
            res.status(422).json({
                message: "Data couldn't be processed"
            })
        } else {
            Item.findOne({
                where: { id: itemId },
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
        const {name, thumbnail, price, stock} = req.body
        const itemId = req.params.id

        if (!itemId) {
            res.status(422).json({
                message: "Data Couldnt be Processed",
            })
        } else {
            Cart.findOne({ where: { id: itemId } })
                .then((data) => {
                    data.update({ name, thumbnail, price, stock }, { where: { id: itemId } })
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
        const itemId = req.params.id

        if (!itemId) {
            res.status(422).json({
                message: "Data Couldnt be Processed",
            })
        } else {
            Item.destroy({ where: { id: itemId } })
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
        const {name, thumbnail, price, stock} = req.body
        if (!name || !thumbnail || !price || !stock) {
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

module.exports = ItemController