module.exports = app => {
    const Centro = require("../controllers/Centro.controller.js");
    const Health = require("../controllers/healthExtend.controller.js");
    var router = require("express").Router();
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    var request = require ('request');
    // Create a new Centro
    router.post("/", Centro.create);

    // Retrieve all Centros
    router.get("/", Centro.findAll);

    // Retrieve a single Centro with id

     
    router.get('/report/:id', async function(req,res){

        let datos= await   Health.CenterAverageReport(req.params.id);
    
         let data = {
             template:{ "shortid": "Qewrgm9Wza",},
             data:  datos,
             options:{
                 preview:true
             }
         };
 
         let options ={
             uri:'https://localhost:5489/api/report',
             method:'POST',
             json:data,
         }
        
      await   request(options).pipe(res);
 
 
     } )


    router.get("/:id", Centro.findOne);

    // Update a Centro with id
    router.put("/:id", Centro.update);

    // Delete a Centro with id
    router.delete("/:id", Centro.delete);
    





    app.use('/api/centro', router);
};