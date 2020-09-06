// const Parent = require("../models/Parent");

const Parent = require("../models/Parent");

function doesParentEmailExist(email) {
    return new Promise((resolve, reject) => {
        Parent.findOne({ email: email }).exec((err, parent) => {
            if (err) return reject(err)
            return resolve(!!parent);
        })
    })
}

module.exports = {
    createParent: (values) => {
        const email = values.email;
        return new Promise((resolve, reject) => {
            doesParentEmailExist(email).then(
                parentExist => {
                    if (parentExist) {
                        return reject('Email already in use')
                    }
                    Parent.create(values).exec((createError, parent) => {

                        if (createError) {
                            return reject(createError)
                        }

                        return resolve(parent)
                    })
                }
            )
        })
    },
    validateParentPassword: function(email, password) {
        return new Promise((resolve, reject) => {
            Parent.findOne({ email: email }).exec((err, parent) => {
                if (err) return reject(err)
                if (!parent) return reject('No parent found')
                user.validatePassword(password).then(
                    isValidPassword => {
                        resolve({ isValidPassword, parent })
                    }
                ).catch((e) => {
                    reject(e)
                })
            })
        })
    },
    authenticateParentByEmailAndPassword: function(email, password) {
        return new Promise((resolve, reject) => {
            ParentAuthService.validateParentPassword(email, password).then(({ isValidPassword, parent }) => {
                if (!isValidPassword) {
                    return reject('Invalid Password')
                }
                //TO:DO Implement JWT here callind the function
                resolve(parent)
            }).catch(reject)
        })
    }
}