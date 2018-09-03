const app = require('../server/server');
const request = require('supertest');
const chaiExpect = require('chai').expect;
const Sequelize = require('sequelize');
const sequelize = require('../server/config/db_connection').sequelize;
const User = require('../server/api/user/userModel');
const Answer = require('../server/api/answer/answerModel');
const testData = require('./testdata');

describe('[ *** US#12 List of answers for given question *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('gets back answer list', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Answer.sync({ force: true }).then(() => {
                        request(app).post('/api/answers').send(testData.answer7).set('Accept', 'application/json').set('Authorization', `Bearer ${token}`).expect('Contect-Type', /json/).expect(200).end(() => {
                            request(app).post('/api/answers').send(testData.answer8).set('Accept', 'application/json').set('Authorization', `Bearer ${token}`).expect('Contect-Type', /json/).expect(200).end(() => {
                                request(app).post('/api/answers').send(testData.answer9).set('Accept', 'application/json').set('Authorization', `Bearer ${token}`).expect('Contect-Type', /json/).expect(200).end(() => {
                                    request(app)
                                        .get('/api/answers/question/3')
                                        .set('Accept', 'application/json')
                                        .set('Authorization', `Bearer ${token}`)
                                        .expect('Contect-Type', /json/)
                                        .expect(200)
                                        .end((err, res) => {
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

        it('gets back an error message', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;

                    Answer.sync({ force: true }).then(() => {
                        request(app).post('/api/answers').send(testData.answer4).set('Accept', 'application/json').set('Authorization', `Bearer ${token}`).expect('Contect-Type', /json/).expect(200).end(() => {
                            request(app).post('/api/answers').send(testData.answer5).set('Accept', 'application/json').set('Authorization', `Bearer ${token}`).expect('Contect-Type', /json/).expect(200).end(() => {
                                request(app).post('/api/answers').send(testData.answer6).set('Accept', 'application/json').set('Authorization', `Bearer ${token}`).expect('Contect-Type', /json/).expect(200).end(() => {
                                    request(app)
                                        .get('/api/answers/question/2')
                                        .set('Accept', 'application/json')
                                        //.set('Authorization', `Bearer ${token}`)
                                        .expect('Contect-Type', /json/)
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
