const express = require ('express')
const app = express()
const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_item_tracker_db')
const path = require('path')


const User = db.define('user',{
    name:{
        type:Sequelize.STRING
    }
})

const Thing = db.define('thing',{
    name:{
        type:Sequelize.STRING
    },
    ranking:{
        type:Sequelize.INTEGER,
        defaultValue:1
    }
})

Thing.belongsTo(User)
User.hasMany(Thing)

const seedData = async()=>{
    await db.sync({force: true})
    await Promise.all(
        ['Larry','Moe','Tom'].map(element=>User.create({name:element}))
        )
    await Promise.all([
        Thing.create({name:'Music',userId:1}),
        Thing.create({name:'Sports',userId:2}),
        Thing.create({name:'Painting',userId:1}),
        Thing.create({name:'Reading',userId:2})
    ])
        
}

seedData()


//app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/dist',express.static('dist'))
app.use('/assets',express.static('assets'))

app.get('/api/users',async(req,res,next)=>{
    try{
      res.send(await User.findAll({include:[Thing]}))
    }catch(err){
        next(err)
    }
})

app.post('/api/users',async(req,res,next)=>{
    try{
      res.status(201).send(await User.create(req.body))
    }catch(err){
        next(err)
    }
})

app.get('/api/things',async(req,res,next)=>{
    try{
        res.send(await Thing.findAll({
          order:[
              ['id', 'ASC'],
          ]
        }))
      }catch(err){
          next(err)
      }
  })

app.get('/api/things/rankingup/:id',async(req,res,next)=>{
    try{
      const thing = await Thing.findByPk(req.params.id)
      await Thing.update({ranking:thing.ranking+1},{where:{id:req.params.id}})
      res.send()
    }catch(err){
        next(err)
    }
})

app.get('/api/things/rankingdown/:id',async(req,res,next)=>{
    try{
        const thing = await Thing.findByPk(req.params.id)
        await Thing.update({ranking:thing.ranking-1},{where:{id:req.params.id}})
        res.send()
      }catch(err){
          next(err)
      }
  })

app.post('/api/things',async(req,res,next)=>{
    try{
      res.status(201).send(await Thing.create(req.body))
    }catch(err){
        next(err)
    }
})

app.delete('/api/users/:id',async(req,res,next)=>{
    try{
      const item = await User.findByPk(req.params.id)
      await item.destroy()
      res.status(204).send()
    }catch(err){
        next(err)
    }
})

app.delete('/api/things/:id',async(req,res,next)=>{
    try{
      const item = await Thing.findByPk(req.params.id)
      await item.destroy()
      res.status(204).send()
    }catch(err){
        next(err)
    }
})


app.post('/api/things/:id',async(req,res,next)=>{
    try{
      await Thing.update({userId:req.body.userId},{where:{id:req.params.id}})
      res.send()
    }catch(err){
        next(err)
    }
})



app.get('/',(req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,'index.html'))

    }catch(err){
        next(err)
    }
})



const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`App is listening at port:${port}`)
})