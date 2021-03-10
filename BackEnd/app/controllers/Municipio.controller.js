const db = require("../models");
const Municipio = db.municipios;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
const { Sequelize } = require("../models");
// Create and Save a new usuario
// req --> request (contains the body)
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.ID_whis || !req.body.Nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/

    // Create a usuario
    const municipio = {
        idMunicipios: req.body.idMunicipios,
        nombre: req.body.nombre,
        isla: req.body.isla
        
    };

    // Save usuario in the database
    Municipio.create(municipio)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the usuario."
            });
        });
};

// Retrieve all usuarios from the database.
exports.findAll = (req, res) => {

    Municipio.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving usuarios."
            });
        });
};
exports.findHealths =(req, res) => {




}
// Find a single usuario with an id
exports.findOne = (req, res) => {
    let id = req.params.id;
    Municipio.findByPk(id)
        .then(data => {
            console.log("estos son los datos")
            console.log(data);
            if (!data) {
                res.status(400).send({
                    message: "No usuario found with that id"
                })
            }
            res.send(data);
            return;
        })
        .catch(err => {
            console.log(err.message);
            console.log("hola");
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving usuario with id"
            });
            return;
        });
};
exports.findHealthbyMunicipio= (req,res)=>{
    db.sequelize.query(`SELECT * from healthsExtend INNER JOIN centros   
       ON healths.idCentros = centros.idCentro 
    HAVING centros.idMunicipios =` +req.params.id).then((result) => {
       res.json(result);
    }).catch((err) => {
       res.status(500).send({
           message: err.message || "Some error occurred while retrieving Healths."
       });
    });
   
   }
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    let id = req.body.id;


    const municipio = {
        idMunicipio: req.body.idMunicipio,
        nombre: req.body.nombre,
        isla: req.body.isla
    };
    Municipio.update(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving usuarios."
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;
    Municipio.delete(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving usuarios."
            });
        });
};