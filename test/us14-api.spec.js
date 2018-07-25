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
describe('[ *** US#14 Quiz result *** ]', () => {

    describe('@@@ SCENARIO 1 – User request quizzes list @@@', () => {

        it('should get back results object with attached id and finishing time ', (done) => {
            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Quiz.sync({ force: true }).then(() => {
                        request(app).post('/api/quizzes').send(testData.quiz1).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                            Question.sync({ force: true }).then(() => {
                                request(app).post('/api/questions').send(testData.question1).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                    request(app).post('/api/questions').send(testData.question2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                        request(app).post('/api/questions').send(testData.question3).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                            request(app).post('/api/questions').send(testData.question4).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                Answer.sync({ force: true }).then(() => {
                                                    request(app).post('/api/answers').send(testData.answer1).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                        request(app).post('/api/answers').send(testData.answer2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                            request(app).post('/api/answers').send(testData.answer3).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                request(app).post('/api/answers').send(testData.answer4).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                    request(app).post('/api/answers').send(testData.answer5).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                        request(app).post('/api/answers').send(testData.answer6).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                            request(app).post('/api/answers').send(testData.answer7).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                                request(app).post('/api/answers').send(testData.answer8).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                                    request(app).post('/api/answers').send(testData.answer9).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                                        request(app).post('/api/answers').send(testData.answer10).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                                            request(app).post('/api/answers').send(testData.answer11).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                                                request(app).post('/api/answers').send(testData.answer12).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                                                                                    Result.sync({ force: true }).then(() => {
                                                                                                        request(app)
                                                                                                            .post('/api/results/check ')
                                                                                                            .send(testData.resultsToCheck)
                                                                                                            .set('Accept', 'application/json')
                                                                                                            .set('Authorization', `Bearer ${token}`)
                                                                                                            .expect('Content-Type', /json/)
                                                                                                            .expect(200)
                                                                                                            .end((err, res) => {
                                                                                                                console.log(res.body);
                                                                                                                chaiExpect(res.body).have.property("id");
                                                                                                                chaiExpect(res.body).have.property("userId");
                                                                                                                chaiExpect(res.body).have.property("quizId");
                                                                                                                chaiExpect(res.body).have.property("finishedAt");
                                                                                                                chaiExpect(res.body).have.property("answers");
                                                                                                                chaiExpect(res.body.answers).to.be.an('array');
                                                                                                                chaiExpect(res.body.answers).to.be.an('array').of.length(12);
                                                                                                                done();
                                                                                                            });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
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