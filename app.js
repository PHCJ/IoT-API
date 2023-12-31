const express = require("express")
const app = express()
app.listen(8081, function(){
    console.log("Conectado com sucesso!")
})
const Sequelize = require("sequelize")
const sequelize = new Sequelize("test", "root", "",{
    host: "localhost",
    dialect: "mysql"
})
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(erro){
    console.log("Falha ao conectar: " + erro)
})
const Sensor = sequelize.define("sensors",{
    temperatura:{
        type: Sequelize.INTEGER
    },
    umidade:{
        type: Sequelize.INTEGER
    }
})

//Sensor.sync({force: true})
app.get("/",function(req, res){
    res.send("Projeto Esp - Daniela e Paulo")
})
app.get("/cadastrar/:item1/:item2",function(req, res){
    Sensor.create({
        temperatura: req.params.item1,
        umidade: req.params.item2,
    }).then(function(){
        console.log("Cadastrado com sucesso!")
    }).catch(function(erro){
        console.log("Falha ao cadastrar os dados: " + erro)
    })
    res.redirect("/")
})