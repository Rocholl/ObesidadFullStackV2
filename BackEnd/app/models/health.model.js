module.exports = (sequelize, Sequelize) => {
    const Health = sequelize.define("health", {
        idHealths: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        edad: {
            type: Sequelize.DOUBLE,
        },
        sexo: {
            type: Sequelize.STRING,
        },
    
        num_lista: {
            type: Sequelize.INTEGER,
        },
      
    }, { timestamps: false });
    Health.associate = function(models) {
        Health.hasMany(models.healthExtend,{

            foreignKey: 'idHealth'
        })
        Health.belongsTo(models.centros,{as:'centros',
        foreignKey: 'idCentro'
    });
     
    };
        //  
    return Health;
};