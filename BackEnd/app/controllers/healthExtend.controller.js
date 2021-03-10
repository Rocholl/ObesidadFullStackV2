const db = require("../models");
const sequelize = require("../models/index");
const HealthsExtend = db.healthExtend;
const Op = db.Sequelize.Op;
const Centro = db.centros;
const Health = db.health;
const Distrito = db.distrito;

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
    const healths = {
        idHealth: req.body.idHealth,
        fecha: Date.now(),
        peso: req.body.peso,
        percent_Grasa: req.body.percent_Grasa,
        percent_Hidratacion: req.body.percent_Hidratacion,
        peso_Muscular: req.body.peso_Muscular,
        masa_Muscular: req.body.masa_Muscular,
        peso_Oseo: req.body.peso_Oseo,
        edad: req.body.edad,
        kilocalorias: req.body.kilocalorias,
        altura: req.body.altura,
        edad_Metabolica: req.body.edad_Metabolica,



        masa_Viseral: req.body.masa_Viseral,

        perimetro_Abdominal: req.body.perimetro_Abdominal,
        actividad_Fisica: req.body.actividad_Fisica,




    };

    // Save usuario in the database
    HealthsExtend.create(healths)

        .then(data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the usuario."
            });
        });



}









// Retrieve all usuarios from the database.
exports.findAll = (req, res) => {

    HealthsExtend.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving usuarios."
            });
        });
};
exports.findHealthbyDistrito = async (req, res) => {
    let countInfra = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [0, 11] }
        },
        include: {
            model: Health,
            attributes: [],
           
            include: {
                model: Centro,
                attributes: [],
                as: "centros",
                include: {
                    model: Distrito,
                    attributes: [],
                    where:{
                        idDistrito: req.params.id
                    }
                }
            }
        }
    })
    let countNormo = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [12, 22] }
        },
        include: {
            model: Health,
            attributes: [],
           
            include: {
                model: Centro,
                attributes: [],
                as: "centros",
                include: {
                    model: Distrito,
                    attributes: [],
                    where:{
                        idDistrito: req.params.id
                    }
                }
            }
        }
    })
    let countSobre = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [23, 30] }
        },
        include: {
            model: Health,
            attributes: [],
           
            include: {
                model: Centro,
                attributes: [],
                as: "centros",
                include: {
                    model: Distrito,
                    attributes: [],
                    where:{
                        idDistrito: req.params.id
                    }
                }
            }
        }
    })
    let countObeso = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [31, 100] }
        },
        include: {
            model: Health,
            attributes: [],
           
            include: {
                model: Centro,
                attributes: [],
                as: "centros",
                include: {
                    model: Distrito,
                    attributes: [],
                    where:{
                        idDistrito: req.params.id
                    }
                }
            }
        }
        }
    )
    let data= {infrapeso: countInfra,normopeso:countNormo,sobrepeso:countSobre,obesidad:countObeso}
    await res.json(data);
}


exports.healthExtendByAgeAverages = async (req, res) => {
    let countInfra = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [0, 11] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                edad: req.params.edad
            }
        }
    })
    let countNormo = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [12, 22] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                edad: req.params.edad
            }
        }
    })
    let countSobre = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [23, 30] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                edad: req.params.edad
            }
        }
    })
    let countObeso = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [31, 100] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                edad: req.params.edad
            }
        }
    })
    let data= {infrapeso: countInfra,normopeso:countNormo,sobrepeso:countSobre,obesidad:countObeso}
    await res.json(data);
}
exports.healthExtendByPhisicalAverages = async (req, res) => {
    let countInfra = await HealthsExtend.count({
        where: {

            actividad_Fisica:req.params.ph
        }
    })
    let countNormo = await HealthsExtend.count({
        where: {

            actividad_Fisica:req.params.ph
        }
    })
    let countSobre = await HealthsExtend.count({
        where: {

            actividad_Fisica:req.params.ph
        }
    })
    let countObeso = await HealthsExtend.count({
        where: {

            actividad_Fisica:req.params.ph
        }
    })
    let data= {infrapeso: countInfra,normopeso:countNormo,sobrepeso:countSobre,obesidad:countObeso}
    await res.json(data);
 
}



exports.CentersAverage = async (req, res) => {
    let countInfra = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [0, 11] }
        }
    })
    let countNormo = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [12, 22] }
        }
    })
    let countSobre = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [23, 30] }
        }
    })
    let countObeso = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [31, 100] }
        }
    })
    let data= {infrapeso: countInfra,normopeso:countNormo,sobrepeso:countSobre,obesidad:countObeso}
    await res.json(data);
}
exports.SequelizeOnlyAverageByCentro = async (req, res) => {
    let countInfra = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [0, 11] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                idCentro: req.params.id
            }
        }
    })
    let countNormo = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [12, 22] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                idCentro: req.params.id
            }
        }
    })
    let countSobre = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [23, 30] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                idCentro: req.params.id
            }
        }
    })
    let countObeso = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [31, 100] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                idCentro: req.params.id
            }
        }
    })
    let data= {infrapeso: countInfra,normopeso:countNormo,sobrepeso:countSobre,obesidad:countObeso}
    await res.json(data);

}
exports.SequelizeOnlyAverageBySex = async (req, res) => {
    let countInfra = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [0, 11] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                sexo: req.params.sex
            }
        }
    })
    let countNormo = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [12, 22] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                sexo: req.params.sex
            }
        }
    })
    let countSobre = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [23, 30] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                sexo: req.params.sex
            }
        }
    })
    let countObeso = await HealthsExtend.count({
        where: {

            percent_Grasa: { [Op.between]: [31, 100] }
        },
        include: {
            model: Health,
            attributes: [],
            where: {
                sexo: req.params.sex
            }
        }
    })
    let data= {infrapeso: countInfra,normopeso:countNormo,sobrepeso:countSobre,obesidad:countObeso}
    await res.json(data);
    
}
exports.SequelizeOnlyAverage = async (req, res) => {
    HealthsExtend.findAll({
        raw: true,
        attributes: {
            exclude: [
                "id",
                "fecha",
                "peso",
                "percent_Grasa",
                "percent_Hidratacion",
                "peso_Muscular",
                "masa_Muscular",
                "peso_Oseo",
                "kilocalorias",
                "edad_Metabolica",
                "altura",
                "masa_Viseral",
                "perimetro_Abdominal",
                "actividad_Fisica",
                "idHealth"
            ], include: [
                [Sequelize.col('health->centros.nombre'), 'nombre'],
                [Sequelize.col('health->centros.lat'), 'lat'],
                [Sequelize.col('health->centros.long'), 'long'],
                [Sequelize.fn('AVG', Sequelize.col('percent_Grasa')), 'percent_Grasa'],
                [Sequelize.fn('AVG', Sequelize.col('percent_Hidratacion')), 'percent_Hidratacion'],
                [Sequelize.fn('AVG', Sequelize.col('peso_Muscular')), 'peso_Muscular'],
                [Sequelize.fn('AVG', Sequelize.col('masa_Muscular')), 'masa_Muscular'],
                [Sequelize.fn('AVG', Sequelize.col('peso_Oseo')), 'peso_Oseo'],
                [Sequelize.fn('AVG', Sequelize.col('kilocalorias')), 'kilocalorias'],
                [Sequelize.fn('AVG', Sequelize.col('altura')), 'altura'],
            ]
        },
        group: ["nombre", "lat", "long"],
        include: [{
            model: Health,
            attributes: [],

            include: [{
                model: Centro,
                attributes: [],
                as: "centros"
            }]
        }]
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err.message);

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Centro with id"
        });
        return;
    })

}
