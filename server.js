const express = require('express')
const {sequelize, User, post} = require('./models')
const user = require('./models/user')

const app = express()

app.use(express.json())

app.get('/users', async(req, res) =>{
    try{
        const user = await User.findAll({include: 'posts'})

        return res.json(user)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'Something went wrong'})

    }
})

app.get('/users/:uuid', async (req, res)=>{
    try{
        const uuid = req.params.uuid
        const user = await User.findOne({
            where: {uuid}
        })
        return res.json(user)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error : "Something is wrong"})
    }

})

app.delete('/users/:uuid', async (req, res)=>{
    try{
        const uuid = req.params.uuid
        const user = await User.findOne({
            where: {uuid}
        })
        await user.destroy()
        return res.json({msg: 'User Deleted!!'})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error : "Something is wrong"})
    }

})

app.put('/users/:uuid', async (req, res)=>{
    try{
        const uuid = req.params.uuid
        const {name, email, role} = req.body
        const user = await User.findOne({
            where: {uuid}
        })
        user.name = name
        user.email = email
        user.role = role

        await user.save()
        return res.json({user})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error : "Something is wrong"})
    }

})


app.post('/users/posts', async (req, res)=>{
    try{
        const {userUuid, body} = req.body
        console.log(`${userUuid} ${body}`);
        const user = await User.findOne({
            where: {uuid : userUuid}
        })
        const posts = await post.create({body, userId: user.id})
        return res.json(posts)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error : "Something is wrong"})
    }

})

app.get('/posts', async (req, res)=>{
    try{
        
        const posts = await post.findAll({include: [User]
        })
       
        return res.json(posts)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error : "Something is wrong"})
    }

})


app.post('/users', async(req, res) =>{
    const {name, email, role} = req.body

    try{
        const user = await User.create({name, email, role})
        return res.json(user)
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
})

app.listen({port: 5000}, async ()=>{
    console.log('Server up on localhost 5000');
    // await sequelize.authenticate()
    console.log('Database connected');

})