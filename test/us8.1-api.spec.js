var app = require('../server/server');
var request = require('supertest');
var chaiExpect = require('chai').expect;
var Sequelize = require('sequelize');
var sequelize = require('../server/config/db_connection').sequelize;
var User = require('../server/api/user/userModel');
var Quiz = require('../server/api/quiz/quizModel');
var Question = require('../server/api/question/questionModel');
var Answer = require('../server/api/answer/answerModel');
var testData = require('./testdata');


describe('[ *** US#8.1 Create answer *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('gets back answer object with attached id', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Answer.sync({ force: true }).then(() => {
                        request(app)
                            .post('/api/answers')
                            .send(testData.answer1)
                            .set('Accept', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .expect('Contect-Type', /json/)
                            .expect(200)
                            .end((err, res) => {
                                chaiExpect(res.body).have.property("id");
                                chaiExpect(res.body).have.property("result");
                                chaiExpect(res.body).have.property("questionId");
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
                    Question.sync({ force: true }).then(() => {
                        request(app)
                            .post('/api/answers')
                            .send(testData.answer1)
                            .set('Accept', 'application/json')
                            //.set('Authorization', `Bearer ${token}`)
                            .expect('Contect-Type', /json/)
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

    describe('@@@ SCENARIO 3 – If one of the field is empty @@@', () => {

        it('gets back an error message', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Question.sync({ force: true }).then(() => {
                        delete testData.answer1.content
                        request(app)
                            .post('/api/answers')
                            .send(testData.answer1)
                            .set('Accept', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .expect('Contect-Type', /json/)
                            .expect(200)
                            .end((err, res) => {
                                chaiExpect(res.body).to.be.deep.equal("notNull Violation: answer.content cannot be null");
                                done();
                            });
                    });
                });
            });
        });
    });

});