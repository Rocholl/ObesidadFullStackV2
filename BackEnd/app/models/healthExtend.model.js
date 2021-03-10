module.exports = (sequelize, Sequelize) => {
    const healthExtend = sequelize.define("healthExtend", {
       

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATEONLY
        },
        peso: {
            type: Sequelize.DOUBLE,
        },
        percent_Grasa:{
            type: Sequelize.DOUBLE,
        },
        percent_Hidratacion:{
            type: Sequelize.DOUBLE,
        },
        peso_Muscular: {
            type: Sequelize.DOUBLE,
        },
        masa_Muscular: {
            type: Sequelize.DOUBLE,
        },
        peso_Oseo:{
            type: Sequelize.DOUBLE,
        },
        kilocalorias:{
            type: Sequelize.DOUBLE,
        },
        edad_Metabolica:{
            type: Sequelize.DOUBLE,
        },
        altura: {
            type: Sequelize.DOUBLE,
        },
        masa_Viseral: {
            type: Sequelize.DOUBLE,
        },    
        perimetro_Abdominal: {
            type: Sequelize.DOUBLE,
        },   
     
        
        actividad_Fisica:{
            type: Sequelize.DOUBLE,
        },
     

      
    }, { timestamps: false });
    healthExtend.associate = function(models) {
        healthExtend.belongsTo(models.health,{
            foreignKey: 'idHealth'
        })
       
     
    };
        //  
    return healthExtend;
};