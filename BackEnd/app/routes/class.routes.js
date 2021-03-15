module.exports = app => {
    const Class = require("../controllers/Cursos.controller.js");
  
    var router = require("express").Router();

    // Create a new Class
    router.get("/:id",Class.findOne);

    // Retrieve all Classs
    router.post("/",Class.create);
    router.get("/",Class.findAll);
    router.delete("/",Class.delete);
   




    app.use('/api/class', router);
};