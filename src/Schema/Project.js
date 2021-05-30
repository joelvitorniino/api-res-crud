const mongoose = require("../modls/userModels");

const ProjectSchema = mongoose.Schema({
  titulo:{
    type:String,
    require:true
  },
  discricao:{
    type:String,
    require:true,
  },
  Tasks:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tasks",  
    require:true
  }],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  },
  createdAt:{
    type:Date,
    default:Date.now,
    require:true
  }
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
