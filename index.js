const express = require("express");
const path = require("path");
const bodyParder = require("body-parser");
const handlebars = require("express-handlebars");
const app = express();

 // Configuracao para express aceitar Json!
app.use(bodyParder.json())
app.use(bodyParder.urlencoded({extended:true}));
// Usando os arquivos do front!
app.use(express.static(path.join(__dirname)));
 //Engine Handlebars
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
//Usando controls No app!
require("./back-end/controls/userControls")(app);
// Usando controls de pessoas autenticados
require("./back-end/controls/userControlsAuth")(app);

app.listen(3003, () => {
  console.log("server up port:", 3003);
})
