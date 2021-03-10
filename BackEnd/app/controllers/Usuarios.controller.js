const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jst = require('jsonwebtoken');
const authConfig = require('../config/Auth.config.js');

const { QueryTypes } = require('sequelize');
const { Sequelize } = require("../models");
// Create and Save a new usuario
// req --> request (contains the body)
exports.create = (req, res) => {
    console.log(req.body);
    let password = bcrypt.hashSync(req.body.password,Number.parseInt(authConfig.rounds));
 

    // Save usuario in the database
    Usuario.create({
        idUsuarios: req.body.idUsuarios,
        username: req.body.username,
        password:   password,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
    
        idCentro: Number.parseInt(req.body.idCentro)
    })
        .then(usuario => {

            let token = jst.sign({usuario: usuario},authConfig.secret, {
                expiresIn: authConfig.expires
            })
            res.json({
                usuario: usuario,
                token: token
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the usuario."
            });
        });
};

// Retrieve all usuarios from the database.
exports.findAll = (req, res) => {

    Usuario.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving usuarios."
            });
        });
};

// Find a single usuario with an id
exports.findOne = (req, res) => {
    let id = req.params.id;
    Usuario.findByPk(id)
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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    let id = req.body.id;


    const usuario = {
        idUsuarios: req.body.Id_usuario,
        Username: req.body.Username,
        Password:req.body.Password,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellido,
        Rol: req.body.Rol,
        Id_Centro: req.body.Id_Centro
    };
    Usuario.update(id)
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
    Usuario.delete(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving usuarios."
            });
        });
};
exports.addCursos= (req,res)=>{
    let idUsuarios = req.params.idUsuario;
    let idCursos = req.params.idCursos ;
    Usuario.findByPk(idUsuarios)
.then(usuario => {

    if (!data) {
        res.status(400).send({
            message: "No usuario found with that id"
        })
    }
    usuario.setCursos(idCursos);
  
})
.catch(err => {
    console.log(err.message);
 
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving usuario with id"
    });
    return;
});


}
exports.getClass=(req,res)=>{
    Usuario.findByPk(req.params.id)
    .then(usuario => {
    
        if (!usuario) {
            res.status(400).send({
                message: "No usuario found with that id"
            })
        }
       
        usuario.getCursos().then(data=>{
            console.log(data)
            res.send(data)
        })
        return;
    })
    .catch(err => {
        console.log(err.message);
     
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving usuario with id"
        });
        return;
    });
    

}


