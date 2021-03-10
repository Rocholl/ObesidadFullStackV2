module.exports = (sequelize, Sequelize) => {
    const Municipio = sequelize.define("municipios", {
        idMunicipios: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        isla: {
            type: Sequelize.STRING           
        }

      
    },  {
    
        timestamps: false
    });
    Municipio.associate = function(models) {
        Municipio.hasMany(models.distrito, {
       
          as: 'fk_Id_Municipios',
          foreignKey: 'idMunicipio'
         
        })
    };
    return Municipio;
};