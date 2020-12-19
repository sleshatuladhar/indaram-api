const jwt = require('jsonwebtoken')
const boom = require('boom')

const tokenManagement = {
    verifyToken(req, res, next) {
        if (!req.header('authorization')) {
            return res.send(boom.unauthorized('Token Required'))
        }

        let token = req.headers['authorization']

        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                return res.status(403).send(boom.forbidden('The token supplied to the request is invalid.Please try with valid token.'))
            }
            req.user = decoded
            next()
        })
    },

    generateToken(user, rememberMe) {
        let expiresIn = 86400 //expires in 24 hours
        if (rememberMe) expiresIn = 2592000 //expires in 30 days
        let token = jwt.sign(user,
            'secret',
            {
                expiresIn: expiresIn
            }
        )
        return { auth: true, token: token }
    }
}

module.exports = tokenManagement
