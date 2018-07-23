// var app = require('../server/server');
// var request = require('supertest');
// var chaiExpect = require('chai').expect;
// var Sequelize = require('sequelize');
// var sequelize = require('../server/config/db_connection').sequelize;
// var User = require('../server/api/user/userModel');
// var Quiz = require('../server/api/quiz/quizModel');
// var testData = require('./testdata');

// var user = {
//     name: 'Michal Smigielasdf',
//     email: 'ms@gmal.com',
//     role: "quiz master",
//     password: "123"
// };

// var quiz1 = {
//     name: "First quiz",
//     category: "Quiz category",
//     duration: 90,
//     authorId: 1,
//     active: true,
//     level: "pro"
// };

// describe('[ *** Quizzies opreations *** ]', () => {
    
//     describe('[ When Quiz Master request quizzes  ]', () => {
//         // beforeEach(() => {
//         // });
//         it('should receive list of created by him quizes', (done) => {
//             User.sync({ force: true }).then(() => {
//                 // User.create(testData.user);
//                 request(app).post('/api/users').send(testData.user).set('Accept', 'application/json').end(() => {
//                     Quiz.sync({ force: true }).then(() => {
//                         request(app).post('/api/quizzes').send(testData.quiz1).set('Accept', 'application/json').expect(200).end(() => {
//                             request(app).post('/api/quizzes').send(testData.quiz2).set('Accept', 'application/json').expect(200).end(() => {
//                                 request(app).post('/api/quizzes').send(testData.quiz3).set('Accept', 'application/json').expect(200).end(() => {
//                                     request(app)
//                                         .get('/api/quizzes/user/1')
//                                         .set('Accept', 'application/json')
//                                         .expect('Content-Type', /json/)
//                                         .expect(200)
//                                         .end((err, res) => {
//                                             chaiExpect(res.body).to.be.an('array');
//                                             chaiExpect(res.body).to.be.an('array').of.length(2);
//                                             done();
//                                         });
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });



//     describe('[ When Quiz Master deactivate quiz ]', () => {
//         it('should have propierty active set as false', (done) => {
//             Quiz.sync({ force: true }).then(() => {
//                 request(app)
//                     .post('/api/quizzes')
//                     .send(testData.quiz1)
//                     .set('Accept', 'application/json')
//                     .expect('Contect-Type', /json/)
//                     .expect(200)
//                     .end((err, res) => {
//                         var quzzToDeactivate = res.body;
//                         quzzToDeactivate.active = false;
//                         //console.log("quzzToDeactivate", quzzToDeactivate);
//                         request(app)
//                             .put('/api/quizzes/')
//                             .send(quzzToDeactivate)
//                             .set('Accept', 'application/json')
//                             .expect('Contect-Type', /json/)
//                             .expect(200)
//                             .end((err, res) => {
//                                 //console.log('ERRRORRdddOR', err);
//                                 chaiExpect(res.status).to.be.equal(200);
//                                 done();
//                             });

//                     });
//             });
//         });
//     });
//     describe('[ When Quiz Master create quizz  ]', () => {
//         it('should return quiz object with id propierty', (done) => {
//             Quiz.sync({ force: true }).then(() => {
//                 request(app)
//                     .post('/api/quizzes')
//                     .send(testData.quiz1)
//                     .set('Accept', 'application/json')
//                     .expect('Contect-Type', /json/)
//                     .expect(200)
//                     .end((err, res) => {
//                         // console.log()
//                         chaiExpect(res.body).have.property("id");
//                         // expect(result.item).have.property("active");
//                         done();
//                     });
//             });
//         });
//     });



// });
//         // it('should have category', (done) => {
//         //     done();
//         // });
//         // it('should have category', (done) => {
//         //     done();
//         // });
