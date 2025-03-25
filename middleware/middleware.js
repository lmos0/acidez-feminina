const jwt = require('jsonwebtoken');
const User = require('../model/User');

function authenticate(req, res, next) {
    const token = req.cookies.authToken;

    if (!token) {
       // return res.status(401).json({ error: 'Token não fornecido' });
       return res.render('401')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        req.user = decoded; // Salva os dados do usuário no request para uso posterior
        next(); // Prossegue com a requisição
    });
}

module.exports = authenticate;