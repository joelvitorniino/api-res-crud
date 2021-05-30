const routes = require("express").Router()
const bcrypt = require("bcryptjs");
const Users =  require("../Schema/User");
//const criarToken = require("../config/geradorDeToken");
const erroGobal={
  erro:"Ouve um erro enesperado da aplicacao!! volte a tentar mas tarde"
}
const  autenticacao =  require("../config/autenticacao.json");
routes.get("/", (req, res) => {
  res.render("pages/login/index");
})
routes.post("/cadastrar",  async (req, res) => {
  try{
    console.log(req.body)
    const user = await Users.create(req.body);
    user.senha = undefined;
      /*,token:criarToken({id:user.id})*/
    res.status(401).redirect("/home");
  }catch(erro){
    console.log(erro)
    res.status(404).render("pages/404/index",erroGobal);
  }
});


routes.post("/login",  async (req, res) => {
  try{
    const {email, senha} = req.body;
    const user = await Users.findOne({email}).select("+senha");
    if(!user){
      res.status(401).send({erro:"Dados invalidos tente novamente"});
    }
    const value = await bcrypt.compare(senha, user.senha);
    console.log(value)
    if(!value){
      res.status(401).send({erro:"Senha Invalida tente novamente"});
    }
    user.senha = undefined;
    /*,token:criarToken({id:user.id})*/
    res.status(200).render("pages/registro/index");
  }catch(erro){
    res.status(404).render("pages/404/index",erroGobal);
  }
});



module.exports = app => app.use("/user", routes);
