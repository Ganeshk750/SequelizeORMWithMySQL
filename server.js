const express = require("express");
//const Sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
const app = express();

const connection = new Sequelize("test", "root", "ganesh", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const User = connection.define("User", {
  uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
  name: {
     type: Sequelize.STRING,
     validate: {
         len: [3]
     }
  },
  bio: {
      type: Sequelize.TEXT,
      validate: {
          contains: {
              args: ['foo'],
              msg: 'Error: Field must contain foo'
          }
      }
  }
});

connection
  //   .authenticate()
  .sync({
    logging: console.log,
    force: true,
  })
  .then(() => {
    // User.create({
    //   name: "JOE",
    //   bio: "This is Test Bio",
    // });
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
