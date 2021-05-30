const routes = require("express").Router();
const milldres = require("../milldre/auteticacao");
const Task = require("../Schema/Tasks");
const Project = require("../Schema/Project");
const erroGobal={
  erro:"Ouve um erro enesperado da aplicacao!! volte a tentar mas tarde"
}
routes.use(milldres);

routes.get("/",  async (req, res) => {
  try{
    const project = await Project.find().populate("user");
    res.status(200).render("Home",project);
  }catch(erro){
    res.render("pages/404/index",erroGobal)
  }
})

routes.post("/home/new/peoject", async (req, res) => {
  try{
    const {
      titulo,
      discricao,
      Tasks} = req.body;
    
    const project = await Project.create(
      {
        titulo,
        discricao,
        user:req.userId
      }
    ).populate("user")
    
    await Promise.all(Tasks.map(async task => {
      const projectTask = await new Task(
        {
          ...task,
          Project:project._id
        }).save();
      project.Tasks.push(projectTask);
    }));
    await project.save();
    res.render("Home",{project})

  } catch(erro) {
    res.render("pages/404/index",erroGobal)
  }
})

routes.get("/home/:project", async (req, res) => {
    try{
      const project = await Project.findById(req.params.project).populate("user");
    res.send({project});
    } catch(erro) {
      res.render("pages/404/index",erroGobal)
    }
})

routes.delete("/:project", async (req, res) => {
    try{
      await Project.findOneAndDelete({
        _id:req.params.project
      }).populate("user");
      res.send({done:"deletado com secesso!"});
    } catch(erro) {
      res.render("pages/404/index",erroGobal)
    }
} )


routes.put("/home/:project", async (req, res) => {
  try{
    const {
      titulo,
      discricao,
      Tasks
    } = req.body;
    
    const project = await Project.findOneAndUpdate(req.params.project, 
      {
        titulo,
        discricao
      },
      {
        new:true
      }
    )
    Project.Tasks = [];
    await Task.deleteOne(
    {
      Project:project._id
    })
    await Promise.all(Tasks.map(async task => {
      const projectTask = await new Task(
        {
          ...task,
          Project:project._id
        }
      ).save();
      project.Tasks.push(projectTask);
    }));
    await project.save();
    res.send({project})

  } catch(erro) {
    res.render("pages/404/index",erroGobal)
  }
})


module.exports = app =>  app.use("/home", routes);  
