const express = require("express");
//const Sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
const app = express();

const connection = new Sequelize("test", "root", "ganesh", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    //timestamps: false,
  },
});

const User = connection.define("User", {
  uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
   first: Sequelize.STRING,
   last: Sequelize.STRING,
   full_name: Sequelize.STRING,
   bio: Sequelize.TEXT
  },{
    hooks:{
      beforeValidate: () =>{
        console.log('before Validate');
      } ,
      afterValidate: () => {
        console.log('after validate');
      },
      beforeCreate: (user) => {
        user.full_name = `${user.first} ${user.last}`
        console.log('before Create');
      },
      afterCreate: () => {
        console.log('after Create');
      }
    }
  }

);

connection
  //   .authenticate()
  .sync({
    logging: console.log,
    force: true,
  })
  .then(() => {
    User.create({
      first: "JON",
      last: "DOE",
      bio: "This is Test Bio",
    });
  })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(() => {
    console.log("Unable to connect to the database");
  });


  app.get('/', (req, res) => {
      User.create({
        name: "JOE",
        bio: "This is Test Bio",
      })
      .then(user =>{
          res.json(user);
      })
      .catch(error => {
         console.log(error);
         res.status(404).send(error);
      })
  })

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on prort " + port);
});
