const bcrypt = require('bcrypt');
const db = require("../models");
const jst = require('jsonwebtoken');
const authConfig = require('../config/Auth.config.js');
const Usuario = db.usuarios;
module.exports =
{
    signIn(req, res) {
      console.log(req.body);
        let { username, password } = req.body;
       
        Usuario.findOne({
            where: {
                username: username

            }
        }).then(async usuario => {
            console.log(usuario);
            if (!usuario) {
                res.status(404).json({ msg: "User not found" })
            } else {
                let check = await bcrypt.compare(password, usuario.password);
                if (check) {
              

                    let token = jst.sign({ usuario: usuario }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    })

                    res.json({
                        usuario: usuario,
                        token: token
                    })

                } else {
                    res.status(401).json({ msg: "Password doesnt match" })
                }
            }
        }).catch(err => {
            res.status(500).json(err)
        })
    },
    isAuthenticated(req, res, next) {
        // check header or url parameters or post parameters for token
        // var token = req.body.token || req.query.token;
        var token = req.token;
        if (!token) {
          return res.status(400).json({
            error: true,
            message: "Token is required."
          });
        }
        // check token that was passed by decoding token using secret
        // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
        jwt.verify(token, process.env.AUTH_SECRET, function (err, user) {
          if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
          });
      
          Usuario.findByPk(usuario.id)
            .then(data => {
              // return 401 status if the userId does not match.
              if (!user.id) {
                return res.status(401).json({
                  error: true,
                  message: "Invalid user."
                });
              }
              // get basic user details
              next();
            })
            .catch(err => {
              res.status(500).send({
                message: "Error retrieving User with id=" + id
              });
            });
        });
      }



}