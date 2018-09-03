const app = require('../server/server');
const request = require('supertest');
const chaiExpect = require('chai').expect;
const Sequelize = require('sequelize');
const sequelize = require('../server/config/db_connection').sequelize;
const User = require('../server/api/user/userModel');
const Quiz = require('../server/api/quiz/quizModel');
const Question = require('../server/api/question/questionModel');
const Answer = require('../server/api/answer/answerModel');
const testData = require('./testdata');
const Result = require('../server/api/result/resultModel');

describe('[ *** US# 22 Take a quiz and see quiz result *** ]', () => {
    describe('@@@ SCENARIO  1 – User correctly sent answer to the server @@@', () => {

        it('should get back corrected results ', (done) => {
            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Result.sync({ force: true }).then(() => {
                        request(app)
                            .post('/api/results/check ')
                            .send(testData.resultsToCheck)
                            .set('Accept', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .end((err, res) => {
                                chaiExpect(res.body).have.property("id");
                                chaiExpect(res.body).have.property("userId");
                                chaiExpect(res.body).have.property("quizId");
                                chaiExpect(res.body).have.property("finishedAt");
                                chaiExpect(res.body).have.property("answers");
                                chaiExpect(res.body.answers).to.be.an('array');
                                chaiExpect(res.body.answers).to.be.an('array').of.length(3);
                                done();
                            });
                    });
                });
            });
        });
    });


    describe('@@@ SCENARIO 2 – If user is not logged in @@@', () => {

        it('should gets back an error message ', (done) => {
            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Result.sync({ force: true }).then(() => {
                        request(app)
                            .post('/api/results/check ')
                            .send(testData.resultsToCheck)
                            .set('Accept', 'application/json')
                            //.set('Authorization', `Bearer ${token}`)
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .end((err, res) => {
                                chaiExpect(res.body).to.be.deep.equal("No authorization token was found");
                                done();
                            });
                    });
                });
            });
        });
    });

    // describe('@@@ SCENARIO 1 – User request quizzes list @@@', () => {

    //     it('should get back user object with attached token and id', (done) => {

    //         request(app)
    //             .post('/api/results/check ')
    //             .send(testData.resultsToCheck)
    //             .set('Accept', 'application/json')
    //             //.set('Authorization', `Bearer ${token}`)
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 console.log(res.body);
    //                 chaiExpect(res.body).have.property("id");
    //                 chaiExpect(res.body).have.property("finishedAt");
    //                 chaiExpect(res.body).have.property("quizId");
    //                 chaiExpect(res.body).have.property("quserId");
    //                 chaiExpect(res.body.results).to.be.an('array');
    //                 chaiExpect(res.body.results).to.be.an('array').of.length(12);
    //                 done();
    //             });
    //     });
    // });
});