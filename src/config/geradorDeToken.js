const jwt = require("jsonwebtoken");
function criarToken(props = {}){
  return token = jwt.sign(props, autenticacao.previ,{
    expiresIn:86400
  });
}
module.exports = criarToken;

