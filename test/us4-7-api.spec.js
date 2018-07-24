var app = require('../server/server');
var request = require('supertest');
var chaiExpect = require('chai').expect;
var Sequelize = require('sequelize');
var sequelize = require('../server/config/db_connection').sequelize;
var User = require('../server/api/user/userModel');
var Quiz = require('../server/api/quiz/quizModel');
var testData = require('./testdata');

describe('[ *** US#4-7 Create quiz *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('gets back quiz object with attached id', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Quiz.sync({ force: true }).then(() => {
                        request(app)
                            .post('/api/quizzes')
                            .send(testData.quiz1)
                            .set('Accept', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .expect('Contect-Type', /json/)
                            .expect(200)
                            .end((err, res) => {
                                chaiExpect(res.body).have.property("id");
                                done();
                            });
                    });
                });
            });
        });
    });

    describe('@@@ SCENARIO 2 – If user is not logged in @@@', () => {

        it('gets back an error message', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Quiz.sync({ force: true }).then(() => {
                        request(app)
                            .post('/api/quizzes')
                            .send(testData.quiz1)
                            .set('Accept', 'application/json')
                            //.set('Authorization', `Bearer ${token}`)
                            .expect('Contect-Type', /json/)
                            .expect(500)
                            .end((err, res) => {
                                chaiExpect(res.body).to.be.deep.equal("No authorization token was found");
                                done();
                            });
                    });
                });
            });
        });
    });

    describe('@@@ SCENARIO 3 – If one of the field is empty @@@', () => {

        it('gets back an error message', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Quiz.sync({ force: true }).then(() => {
                        delete testData.quiz1.category;
                        request(app)
                            .post('/api/quizzes')
                            .send(testData.quiz1)
                            .set('Accept', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .expect('Contect-Type', /json/)
                            .expect(500)
                            .end((err, res) => {
                                chaiExpect(res.body).to.be.deep.equal("notNull Violation: quiz.category cannot be null");
                                done();
                            });
                    });
                });
            });
        });
    });
});