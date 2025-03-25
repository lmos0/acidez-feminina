const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const router = require('./routes/router')
const controller = require('./controllers/controllers')
const sequelize = require('./config/db')

const User = require('./model/User')

require('dotenv').config()

const app = express()

app.use(cors())

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser());

app.use('/', router)



const initDatabase = async () => {
    try {
        await sequelize.sync({force:false})
        const existingUser = await User.findOne({where: {email: process.env.EMAIL}})
        if (!existingUser) {
            await User.create({email: 'admin@acidezfeminina.com.br', password: process.env.PASSWORD})
            console.log('Usuário admin criado com sucesso');
            
        }
        console.log('Banco de dados sincronizado com sucesso');
        
    } catch (error) {
        console.error('Erro ao sincronizar banco de dados:', error);
        
    }
}


const PORT = process.env.PORT || 3000

initDatabase()
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`))