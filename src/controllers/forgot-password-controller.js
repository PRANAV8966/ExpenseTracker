const { MailService } = require('../services/mail-service.js');

const Sender = require('../config/email-config.js');


class forgotController {
    constructor() {
         this.mailService = new MailService();
    }

    async SendMail(req, res) {
        try {
            await this.mailService.SendMail(req.body.userId, req.query.token);
            return res.status(200).json({
                success:true,
                message: 'successfully sent email',
                error:{}
            });
        } catch (error) {
            console.log('error while sending the mail', error);
            return res.status(500).json({
                success:false,
                message:'failed to send email',
                error:error
            });
        }
    }
    
    async checkUser(req, res) {
        try {
            const user = await this.mailService.checkUser(req.body.email);
            return res.status(200).json({
                data:user,
                success:true,
                message: 'successfully sent email',
                error: {}
            });
        } catch (error) {
            console.log('error while fetching the user', error);
            return res.status(500).json({
                success:false,
                message:'failed to fetch user or no user exist',
                error:error
            });
        }
    }

    async update(newPassword, token) {
        try {
            await this.mailService.update(newPassword, token);
            return true;
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'failed to update user or no user exist',
                error:error
            });
        }
    }
}

module.exports = {
    forgotController
}