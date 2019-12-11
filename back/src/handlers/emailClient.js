const passport = require('passport');
const nodemailer = require('nodemailer');

function sendEmail (req, res) {
    passport.authenticate('jwt',(err, user, info) => {
        if(err) return res.status(500).json({ payload: { ok: false, message: err.message } })
        if (!user) return res.status(400).json({ payload: { ok: false, message: info.message } });
        const from = req.body.from;
        const recipients = req.body.to;
        const subject = req.body.name+": "+req.body.subject;
        const text = req.body.text;
        const forward = req.body.forward;

        let to = recipients;
        if(forward) {
            to = recipients+from;
        }

        const mailOptions = {
            from, to, subject, text
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 587,
            auth: {
                user: 'gifs_finder@sandbox1335509efaa24b8f8ad9e1b1e714b90f.mailgun.org',
                pass: '8184a5a0e78488a5cd2d3abac2eccf20-5645b1f9-6178eb1a'
            }
        });
        
        // send mail with defined transport object
        const sendMailPromise = (mailOpt) => {
            return new Promise((resolve, reject)=> {
                transporter.sendMail(mailOpt, (err, res) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            })
        }
        sendMailPromise(mailOptions)
            .then(() => {
                console.log("message:","Mail sent successfully!");
            })
            .catch(err => {
                console.log(err.message);
            })
        res.status(200).json({ payload: { ok: true, message: "Mail sent successfully!" } });
    })(req,res);
}

module.exports = {
    sendEmail
}