// var app = require('../server/server');
// var request = require('supertest');
// var chaiExpect = require('chai').expect;
// var Sequelize = require('sequelize');
// var sequelize = require('../server/config/db_connection').sequelize;
// var User = require('../server/api/user/userModel');
// var Quiz = require('../server/api/quiz/quizModel');
// var Question = require('../server/api/question/questionModel');
// var testData = require('./testdata');

// describe('[ *** Question opreations *** ]', () => {
//     describe('[ When Quiz Master update question *** ]', () => {
//         it('it should receive back updated object', (done) => {
//             Question.sync({ force: true }).then(() => {
//                 request(app)
//                     .post('/api/questions')
//                     .send(testData.question1)
//                     .set('Accept', 'application/json')
//                     .expect('Contect-Type', /json/)
//                     .expect(200)
//                     .end((err, res) => {
//                         var questionToBeUpdated = res.body;
//                         questionToBeUpdated.title = "Updated title 1";
//                         request(app)
//                             .put('/api/questions/1')
//                             .send(questionToBeUpdated)
//                             .set('Accept', 'application/json')
//                             .expect('Contect-Type', /json/)
//                             .expect(200)
//                             .end((err, res) => {
//                                 chaiExpect(res.status).to.be.equal(200);
//                                 chaiExpect(res.body.title).to.be.equal(questionToBeUpdated.title);
//                                 done();
//                             });
//                     });
//             });
//         });
//     });
//     describe('[ When Quiz Master request question by quiz id *** ]', () => {
//         it('it should receive list of questions', (done) => {
//             Question.sync({ force: true }).then(() => {
//                 request(app).post('/api/questions').send(testData.question1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end(() => {
//                     request(app).post('/api/questions').send(testData.question2).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end(() => {
//                         request(app).post('/api/questions').send(testData.question3).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end(() => {
//                             request(app).post('/api/questions').send(testData.question4).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end(() => {
//                                 request(app)
//                                     .get('/api/questions/quiz/1')
//                                     .set('Accept', 'application/json')
//                                     .expect('Content-Type', /json/)
//                                     .expect(200)
//                                     .end((err, res) => {
//                                         chaiExpect(res.body).to.be.an('array');
//                                         chaiExpect(res.body).to.be.an('array').of.length(3);
//                                         done();
//                                     });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });

//     describe('[ When Quiz Master create question *** ]', () => {

//         it('it should be saved in the database', (done) => {
//             Question.sync({ force: true }).then(() => {
//                 request(app)
//                     .post('/api/questions')
//                     .send(testData.question1)
//                     .set('Accept', 'application/json')
//                     .expect('Contect-Type', /json/)
//                     .expect(200)
//                     .end((err, res) => {
//                         Question.findById(1).then((question) => {
//                             chaiExpect(question.title).to.be.deep.equal(testData.question1.title);
//                             chaiExpect(question.body).to.be.deep.equal(testData.question1.body);
//                             chaiExpect(question.quizId).to.be.deep.equal(testData.question1.quizId);
//                         });
//                         done();
//                     });
//             });
//         });

//         it('it should return object with id propierty', (done) => {
//             Question.sync({ force: true }).then(() => {
//                 request(app)
//                     .post('/api/questions')
//                     .send(testData.question1)
//                     .set('Accept', 'application/json')
//                     .expect('Contect-Type', /json/)
//                     .expect(200)
//                     .end((err, res) => {
//                         chaiExpect(res.body).have.property("id");
//                         done();
//                     });
//             });
//         });
//     });

// });
