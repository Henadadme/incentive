/**
 * ParentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const ParentAuthService = require("../services/ParentAuthService");



module.exports = {
    create: function(req, res, next) {
        const { email, password, fullName } = req.body;
        ParentAuthService.createParent({
            email,
            password,
            fullName
        }).then(parent => {
            console.log(parent)
            res.status(201).json({
                parent
            })
        }).catch((error) => {
            console.log(error)
            res.badRequest({ error })
        })
    }


};