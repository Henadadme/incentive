/**
 * Parent.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

function generatePasswordHash(password) {
    return bcrypt.genSalt(10) // 10 is default
        .then((salt) => {
            return bcrypt.hash(password, salt);
        })
        .then(hash => {
            return Promise.resolve(hash);
        });
}

module.exports = {

    attributes: {
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        fullName: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        role: {
            type: 'string',
            defaultsTo: 'admin'
        }
        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝



        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },
    toJSON: function() {
        const obj = this.toObject();

        return {
            id: obj.id,
            email: obj.email
        };
    },

    customToJson: function() {
        return _.omit(this, ['password'])

    },
    validatePassword: function(password) {
        return bcrypt.compare(password, this.toObject().password);

    },


    /**
     * Set user password
     * @param password
     * @returns {Promise}
     */
    setPassword: function(password) {
        return generatePasswordHash(password)
            .then(hash => {
                this.password = hash;
            });
    },

    beforeCreate: function(values, next) {
        generatePasswordHash(values.password)
            .then(hash => {
                delete(values.password);
                values.password = hash;
                next();
            })
            .catch(err => {
                /* istanbul ignore next */
                next(err);
            });
    }

};