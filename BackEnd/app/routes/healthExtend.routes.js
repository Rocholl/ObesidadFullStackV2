module.exports = app => {
    const Health = require("../controllers/healthExtend.controller.js");

    var router = require("express").Router();

    // Create a new health
    router.post("/", Health.create);

    // Retrieve all healths
    router.get("/", Health.findAll);
    router.get("/maparray/",Health.SequelizeOnlyAverage);
    router.get("/centeraverage/:id",Health.SequelizeOnlyAverageByCentro);
    router.get("/pipebysex/:sex",Health.SequelizeOnlyAverageBySex);
    router.get("/pipebyage/:age",Health.healthExtendByAgeAverages);
    router.get("/pipebyphisicalactivity/:ph",Health.healthExtendByPhisicalAverages);
    router.get("/avg",Health.CentersAverage);
    router.get("/pipebydistrict/:id",Health.findHealthbyDistrito);




    


  // Delete a health with id


    app.use('/api/healthextend', router);
};