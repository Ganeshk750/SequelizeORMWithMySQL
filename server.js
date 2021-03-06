const express = require("express");
const _USERs = require("./users.json");
//const Sequelize = require("sequelize");

const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
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
  // uuid: {
  //     type: Sequelize.UUID,
  //     primaryKey: true,
  //     defaultValue: Sequelize.UUIDV4,
  //     allowNull: false
  //   },
  //  first: Sequelize.STRING,
  //  last: Sequelize.STRING,
  //  full_name: Sequelize.STRING,
  //  bio: Sequelize.TEXT
  // },{
  //   hooks:{
  //     beforeValidate: () =>{
  //       console.log('before Validate');
  //     } ,
  //     afterValidate: () => {
  //       console.log('after validate');
  //     },
  //     beforeCreate: (user) => {
  //       user.full_name = `${user.first} ${user.last}`
  //       console.log('before Create');
  //     },
  //     afterCreate: () => {
  //       console.log('after Create');
  //     }
  //   }
  // }

  //*Adding new Model*//

  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
    },
  },
});

connection
  //   .authenticate()
  .sync({
    // logging: console.log,
    //force: true,
  })
  // .then(() => {
  //   User.bulkCreate(_USERs)
  //       .then(users => {
  //         console.log('Success adding users');
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  // })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(() => {
    console.log("Unable to connect to the database");
  });

/* app.get('/', (req, res) => {
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
  }) */

app.delete("/remove", (req, res) => {
  User.destroy({
    where: {
      id: '50'
    }
  })
    .then(() => {
      res.send('User Successfully Deleted!!');
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});


app.put("/update", (req, res) => {
  User.update({
    name: "Ganesh",
    password: "password"
  }, {where: { id: '55' }})
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});


app.get("/findOne", (req, res) => {
  User.findByPk('55')
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});


app.get("/find", (req, res) => {
  User.findAll({
    where: {
      name: {
        [Op.like]: "Br%",
      },
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.get("/findalld", (req, res) => {
  User.findAll({
    where: {
      name: "Miranda",
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.get("/findall", (req, res) => {
  User.findAll()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.post("/post", (req, res) => {
  const newUser = req.body.user;
  User.create({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password
  })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on prort " + port);
});
