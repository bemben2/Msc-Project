// var app = require('../server/server');
// var request = require('supertest');
// var chaiExpect = require('chai').expect;
// var Sequelize = require('sequelize');
// var sequelize = require('../server/config/db_connection').sequelize;
// var User = require('../server/api/user/userModel');
// var Quiz = require('../server/api/quiz/quizModel');

// var userCreator = {
//     name: 'Michal Smigielasdf',
//     email: 'ms@gmal.com',
//     role: "quiz master",
//     password: "123"
// };

// describe('[ *** User operatios *** ]', () => {
//     describe('[ When Qizz Master or User create an acount ]', () => {

//         it('should get back user object', (done) => {
            
//             User.sync({ force: true }).then(() => {
//                 request(app)
//                     .post('/api/users')
//                     .send(userCreator)
//                     .set('Accept', 'application/json')
//                     .expect('Contect-Type', /json/)
//                     .expect(200)
//                     .end(function (err, res) {
//                         //var userFromDB = User.findById(1);
//                         chaiExpect(res.body).to.be.an('object');
//                         chaiExpect(res.body.name).to.be.deep.equal(userCreator.name);
//                         chaiExpect(res.body.email).to.be.deep.equal(userCreator.email);
//                         chaiExpect(res.body.role).to.be.deep.equal(userCreator.role);
//                         chaiExpect(res.body.password).to.be.deep.equal(userCreator.password);
//                         done();
//                     })
//             });
//         });

//     });

// });

