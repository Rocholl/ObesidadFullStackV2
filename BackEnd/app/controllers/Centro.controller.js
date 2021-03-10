const db = require("../models");
const Centro = db.centros;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');

const Healths = db.healths;
const HealthsExtend = db.healthExtend;

// Create and Save a new Centro
// req --> request (contains the body)
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.ID_whis || !req.body.Nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/

    // Create a Centro


    // Save Centro in the database
    Centro.create({
        idCentro: req.body.idCentro,
        nombre: req.body.nombre,
        codigo_Postal: req.body.codigo_Postal,
        idDistrito: req.body.idDistrito,
        lat: parseFloat(req.body.lat),
        long: parseFloat(req.body.long)

    })
        .then(centro => {
            res.send(centro);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Centro."
            });
        });
};

// Retrieve all Centros from the database.
exports.findAll = (req, res) => {

    Centro.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Centros."
            });
        });
};

// Find a single Centro with an id
exports.findOne = (req, res) => {
    let id = req.params.id;
    Centro.findByPk(id)
        .then(data => {

            if (!data) {
                res.status(400).send({
                    message: "No Centro found with that id"
                })
            }
            res.send(data);
            return;
        })
        .catch(err => {
            console.log(err.message);

            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Centro with id"
            });
            return;
        });
};
exports.findAllCentroIncludeHealhtExtendAverages = (req, res) => {
    

    db.sequelize.query(`SELECT AVG(peso),AVG(percent_Grasa) ,AVG(percent_Hidratacion) ,AVG(peso_Muscular) 
    ,AVG(masa_Muscular) ,AVG(peso_Oseo) ,AVG(kilocalorias),
    AVG(edad_Metabolica) ,AVG(altura) ,AVG(masa_Viseral) ,AVG(perimetro_Abdominal) ,AVG(actividad_Fisica) 
      from healthextends where idHealth in(SELECT idHealths FROM health  WHERE idCentro = ` + req.params.id+ `)`).then(data => {
      
        if (!data) {
            res.status(400).send({
                message: "No Centro found with that id"
            })
        }

        return data;
    }).catch(err => {
        console.log(err.message);

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Centro with id"
        });
        return;
    })
        
};
exports.findAllCentroIncludeHealhtBySex = (req, res) => {
    
    let sex = req.body.sex;
   
    db.sequelize.query(`SELECT AVG(peso),AVG(percent_Grasa) ,AVG(percent_Hidratacion) ,AVG(peso_Muscular) 
    ,AVG(masa_Muscular) ,AVG(peso_Oseo) ,AVG(kilocalorias),
    AVG(edad_Metabolica) ,AVG(altura) ,AVG(masa_Viseral) ,AVG(perimetro_Abdominal) ,AVG(actividad_Fisica) 
      from healthextends where idHealth in(SELECT idHealths FROM health  WHERE sexo = ` + sex+ `)`).then(data => {
      
        if (!data) {
            res.status(400).send({
                message: "No Centro found with that id"
            })
        }

        return data;
    }).catch(err => {
        console.log(err.message);

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Centro with id"
        });
        return;
    })
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    let id = req.body.id;


    const centro = {
        idCentro: req.body.Id_Centro,
        nombre: req.body.nombre,
        codigo_Postal: req.body.codigo_Postal,
        idMunicipios: req.body.idMunicipios,
        lat: parseDouble(req.body.lat),
        long: parseDouble(req.body.long)
    };
    Centro.update(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Centros."
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;
    Centro.delete(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Centros."
            });
        });
};