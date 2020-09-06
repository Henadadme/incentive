// const Parent = require("../models/Parent");

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
    }
}