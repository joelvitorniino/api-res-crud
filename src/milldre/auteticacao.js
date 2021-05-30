//const jwt = require("jsonwebtoken");
const autenticacao = require("../config/autenticacao.json");
module.exports = (req, res, next) => {
//  const value = req.headers.autorisa;
  const value ="1234"
  const erro = {
    erro:"nao tem autorizacao para acessar esta pagina!"
  };
  if(!value){
    res.render("pages/404/index",erro);
  }
 /* const valueSplit = value.split(' ');
  if(valueSplit.length !== 2){
    res.send(erro);
  }
  const [nameToken, Token] = valueSplit;
  if(!/^Bearrer$/i.test(nameToken)){
    res.send(erro);
  }
 jwt.verify(Token, autenticacao.prive, (erro, decoded) => {
    if(erro){
      res.send(erro); 
    }*/
//    req.userId = decoded.id;
    req.userId = "60af10f4e5bb981207e8d0d8";
    return next();
  /*  })*/
}
