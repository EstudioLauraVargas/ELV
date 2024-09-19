require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } = require("../config/envs");

//-------------------------------- CONFIGURACION PARA TRABAJAR LOCALMENTE-----------------------------------
const sequelize = new Sequelize(
    `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
  ); 
  // -------------------------------------CONFIGURACION PARA EL DEPLOY---------------------------------------------------------------------
  // const sequelize = new Sequelize(DB_DEPLOY , {
  //       logging: false, // set to console.log to see the raw SQL queries
  //       native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  //       dialectOptions: {
  //         ssl: {
  //           require: true,
  //           rejectUnauthorized: false,
  //         }
  //       },
  //     }
  //   );

//----------------------------------------**--------------------------------------------------------
  const basename = path.basename(__filename);

  const modelDefiners = [];
  
  fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });
  
  modelDefiners.forEach((model) => model(sequelize));
  // Capitalizamos los nombres de los modelos ie: product => Product
  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
  ]);
  sequelize.models = Object.fromEntries(capsEntries);
  
 
  const { User, Course, Subscription, Video, Payment, OrderCompra, CourseVideos } = sequelize.models;


/////////////////////////////////////////RELACIONES//////////////////////////////////////



// Relación User -> Subscription (uno a muchos)
User.hasMany(Subscription, {
  foreignKey: 'document', 
});
Subscription.belongsTo(User, {
  foreignKey: 'document',
});

// Relación Course -> Subscription (uno a muchos)
Course.hasMany(Subscription, {
  foreignKey: 'idCourse', 
});
Subscription.belongsTo(Course, {
  foreignKey: 'idCourse',
});

// Relación Course -> Video (muchos a muchos)
Course.belongsToMany(Video, {
  through: 'CourseVideos',
  foreignKey: 'idCourse',
  otherKey: 'idVideo',
});
Video.belongsToMany(Course, {
  through: 'CourseVideos',
  foreignKey: 'idVideo',
  otherKey: 'idCourse',
});

// Relación OrderCompra -> User (uno a muchos)
OrderCompra.belongsTo(User, {
  foreignKey: 'document',
  allowNull: false,
});
User.hasMany(OrderCompra, {
  foreignKey: 'document',
});

// Relación OrderCompra -> Subscription (uno a muchos)
OrderCompra.hasMany(Subscription, {
  foreignKey: 'orderId',
});
Subscription.belongsTo(OrderCompra, {
  foreignKey: 'orderId',
});

// Relación OrderCompra -> Payment (uno a uno)
OrderCompra.hasOne(Payment, {
  foreignKey: 'orderId', 
  allowNull: false,
});
Payment.belongsTo(OrderCompra, {
  foreignKey: 'orderId',
});


//-----------------------------------**---------------------------------------



module.exports = {
    ...sequelize.models, 
  conn: sequelize, 
};
