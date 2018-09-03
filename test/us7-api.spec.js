const app = require('../server/server');
const request = require('supertest');
const chaiExpect = require('chai').expect;
const Sequelize = require('sequelize');
const sequelize = require('../server/config/db_connection').sequelize;
const User = require('../server/api/user/userModel');
const Quiz = require('../server/api/quiz/quizModel');
const Question = require('../server/api/question/questionModel');
const testData = require('./testdata');

describe('[ *** US#7 Create question *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('gets back question object with attached id', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Question.sync({ force: true }).then(() => {
                        request(app)
                            .post('/api/questions')
                            .send(testData.question1)
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
                    Question.sync({ force: true }).then(() => {
                        request(app)
                            .post('/api/questions')
                            .send(testData.question1)
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
                        delete testData.question1.title
                        request(app)
                            .post('/api/questions')
                            .send(testData.question1)
                            .set('Accept', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .expect('Contect-Type', /json/)
                            .expect(200)
                            .end((err, res) => {
                                chaiExpect(res.body).to.be.deep.equal("notNull Violation: question.title cannot be null");
                                done();
                            });
                    });
                });
            });
        });
    });
});
