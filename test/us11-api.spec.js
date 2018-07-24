var app = require('../server/server');
var request = require('supertest');
var chaiExpect = require('chai').expect;
var Sequelize = require('sequelize');
var sequelize = require('../server/config/db_connection').sequelize;
var User = require('../server/api/user/userModel');
var Quiz = require('../server/api/quiz/quizModel');
var testData = require('./testdata');

describe('[ *** US#11 List of available quizzes *** ]', () => {

    describe('@@@ SCENARIO 1 – User request quizzes list @@@', () => {

        it('should get back user object with attached token and id', (done) => {
            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;

                    Quiz.sync({ force: true }).then(() => {
                        request(app).post('/api/quizzes').send(testData.quiz1).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                            request(app).post('/api/quizzes').send(testData.quiz2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                request(app).post('/api/quizzes').send(testData.quiz3).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                    
                                    request(app)
                                        .get('/api/quizzes')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `Bearer ${token}`)
                                        .expect('Content-Type', /json/)
                                        .expect(200)
                                        .end((err, res) => {
                                            chaiExpect(res.body).to.be.an('array');
                                            chaiExpect(res.body).to.be.an('array').of.length(3);
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

    describe('@@@ SCENARIO 2 – If user is not logged in @@@', () => {

        it('should get back user object with attached token and id', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;

                    Quiz.sync({ force: true }).then(() => {
                        request(app).post('/api/quizzes').send(testData.quiz1).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                            request(app).post('/api/quizzes').send(testData.quiz2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                request(app).post('/api/quizzes').send(testData.quiz3).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect(200).end(() => {
                                    
                                    request(app)
                                        .get('/api/quizzes')
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
            });
        });
    });
});
