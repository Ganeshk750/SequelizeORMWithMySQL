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
    //freezeTableName: true,
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


const Post = connection.define('Post', {
  // id: {
  //   primaryKey: true,
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4
  // },
  title: Sequelize.STRING,
  content: Sequelize.TEXT
})

const Comment = connection.define('Comment', {
  the_comment: Sequelize.STRING
})



Post.belongsTo(User, {as : 'UserRef' , foreignKey: 'userId'}) //puts foreignKey UserId in Post table
Post.hasMany(Comment, {as: 'All_Comments'}) //foreignKey = PostId in comment table
connection
  //   .authenticate()
  .sync({
    // logging: console.log,
    // force: true,
  })
  // .then(() => {
  //   User.bulkCreate(_USERs)
  //     .then((users) => {
  //       console.log("Success adding users");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // })
  //---------Assocation----------//
  .then(() => {
    Post.create({
      userId: 1,
      title: "First Post",
      content: "post content 1",
    });
  })
  //---------Assocation----------//
  //---Assocation OnTOMany ------//
  // .then(() => {
  //   Post.create({
  //     userId: 1,
  //     title: "Second Post",
  //     content: "post content 2",
  //   });
  // })
  // .then(() => {
  //   Post.create({
  //     userId: 2,
  //     title: "Third Post",
  //     content: "post content 3",
  //   });
  // })

  // .then(() => {
  //   Comment.create({
  //     PostId: 1,
  //     the_comment: "First comment",
  //   });
  // })
  // .then(() => {
  //   Comment.create({
  //     PostId: 1,
  //     the_comment: "Second comment"
  //   });
  // })
  //---Assocation OnTOMany ------//
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(() => {
    console.log("Unable to connect to the database");
  });


  //---------Assocation Ist method----------//
   app.get('/allposts', (req, res) => {
     Post.findAll({
       include: [{
         model: User, as: 'UserRef'
       }],
     })
       .then((posts) => {
         res.json(posts);
       })
       .catch((error) => {
         console.log(error);
         res.status(404).send(error);
       });
   })

   //---------Assocation Ist Method Ends----------// 
   //---------Assocation 2nd Method ----------//  
  app.get("/singlepost", (req, res) => {
    Post.findByPk("1", {
      include: [
        { 
          model: Comment, as: "All_Comments",
           attributes: ["the_comment"] 
          },{
            model: User, as: 'UserRef'
          }
      ],
    })
      .then((posts) => {
        res.json(posts);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  });
//---------Assocation 2nd Method Ends----------// 


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

// app.delete("/remove", (req, res) => {
//   User.destroy({
//     where: {
//       id: '50'
//     }
//   })
//     .then(() => {
//       res.send('User Successfully Deleted!!');
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(404).send(error);
//     });
// });


// app.put("/update", (req, res) => {
//   User.update({
//     name: "Ganesh",
//     password: "password"
//   }, {where: { id: '55' }})
//     .then((rows) => {
//       res.json(rows);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(404).send(error);
//     });
// });


// app.get("/findOne", (req, res) => {
//   User.findByPk('55')
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(404).send(error);
//     });
// });


// app.get("/find", (req, res) => {
//   User.findAll({
//     where: {
//       name: {
//         [Op.like]: "Br%",
//       },
//     },
//   })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(404).send(error);
//     });
// });

// app.get("/findalld", (req, res) => {
//   User.findAll({
//     where: {
//       name: "Miranda",
//     },
//   })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(404).send(error);
//     });
// });

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

// app.post("/post", (req, res) => {
//   const newUser = req.body.user;
//   User.create({
//     name: newUser.name,
//     email: newUser.email,
//     password: newUser.password
//   })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(404).send(error);
//     });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on prort " + port);
});
