const mongoose = require("../modls/userModels");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema({
  nome:{
    type:String,
    require:true
  },
  senha:{
    type:String,
    require:true,
    select:false
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  createdAt:{
    type:Date,
    require:true,
    default:Date.now
  }
});

UserSchema.pre("save", async function(next){
  const hash = await bcrypt.hash(this.senha, 8);
  this.senha = hash;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
