var app = require('../server/server');
var request = require('supertest');
var chaiExpect = require('chai').expect;
var Sequelize = require('sequelize');
var sequelize = require('../server/config/db_connection').sequelize;
var User = require('../server/api/user/userModel');
var Quiz = require('../server/api/quiz/quizModel');
var Question = require('../server/api/question/questionModel');
var testData = require('./testdata');

describe('[ *** US#11 Details of selected quiz *** ]', () => {

    describe('@@@ SCENARIO 1 – User request quizzes list @@@', () => {

        it('should get back quiz object with attached atributes duration and number questions', (done) => {
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
                                                request(app)
                                                    .get('/api/quizzes/1')
                                                    .set('Accept', 'application/json')
                                                    .set('Authorization', `Bearer ${token}`)
                                                    .expect('Content-Type', /json/)
                                                    .expect(200)
                                                    .end((err, res) => {
                                                        //  console.log(res.body);
                                                        chaiExpect(res.body.questionNo).to.be.equal(3);
                                                        chaiExpect(res.body.duration).to.be.equal(90);
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
    
    describe('@@@ SCENARIO 1 – User request quizzes list @@@', () => {

        it('should get back quiz object with attached atributes duration and number questions', (done) => {
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
                                                request(app)
                                                    .get('/api/quizzes/1')
                                                    .set('Accept', 'application/json')
                                                    //.set('Authorization', `Bearer ${token}`)
                                                    .expect('Content-Type', /json/)
                                                    .expect(200)
                                                    .end((err, res) => {
                                                        // console.log(res.body);
                                                        chaiExpect(res.body).to.be.deep.equal("No authorization token was found");
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
