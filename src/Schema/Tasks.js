const mongoose = require("../modls/userModels");

const TasksSchema = mongoose.Schema({
  titulo:{
    type:String,
    require:true
  },
  Project:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"Project"
  },
  toUser:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"User"
  },
  complete:{
    type:Boolean,
    require:true,
    default:false
  },
  createdAt:{
    type:Date,
    require:true,
    default:Date.now
  }
});

const Tasks = mongoose.model("Tasks", TasksSchema);

module.exports = Tasks;
