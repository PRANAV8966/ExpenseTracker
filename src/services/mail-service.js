const db = require('../models/index.js');
const user = db.users;

const Sender = require('../config/email-config.js');
const { EMAIL_ID } = require('../config/server-config.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/server-config.js');

class MailService {

    async SendMail(userId, token) {
        try {
            const User = await user.findByPk(userId);
            const mailBody = `here is the link to reset your account password is\n http://localhost:3000/api/SecureUpdatePassword/?TID=${token} \n valid for One Hour`
            const info = Sender.sendMail({
            from: EMAIL_ID,
            to: User.dataValues.email,
            subject: "password reset link",
            text: mailBody
        })
        return {message: 'called update password'};
        } catch (error) {
          console.log('error while sending the mail', error);
          throw error;
        }
    }
    
    async checkUser(email) {
        try {
            const User = await user.findOne({
                where : {
                    email: email
                }
            });

            if (!User) {
                throw {error: 'no user found with the submitted email address'};
            }
            const newToken = jwt.sign({email:User.email, id:User.id}, jwtKey, {expiresIn: '1h'});
            return newToken;
        } catch (error) {
            console.log('error while fetching the user', error);
            throw error;
        }
    }

    async update(newPassword, userEmail) {
        try {
            const status = await user.update({
                password: newPassword
            }, {
                where : {
                    email: userEmail
                }
            });
            if (!status) {
                console.log('error throwed');
                throw {error: 'something went wrong while updating the password'};
            }
            return {message: "successfully updated the password"};
        } catch (error) {
            console.log('failed to update password', error);
            throw error;
        }
    }
}

module.exports = {
    MailService
}