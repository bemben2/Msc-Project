var app = require('../server/server');
var request = require('supertest');
var chaiExpect = require('chai').expect;
var Sequelize = require('sequelize');
var sequelize = require('../server/config/db_connection').sequelize;
var User = require('../server/api/user/userModel');
var Quiz = require('../server/api/quiz/quizModel');
var testData = require('./testdata');

describe('[ *** US#3 Turn on/off quiz visibility *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('should have propierty active set as true', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Quiz.sync({ force: true }).then(() => {
                        request(app).post('/api/quizzes').send(testData.quiz1).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            var quzzToDeactivate = res.body;
                            quzzToDeactivate.active = true;
                            request(app)
                                .put(`/api/quizzes/${quzzToDeactivate.id}`)
                                .send(quzzToDeactivate)
                                .set('Authorization', `Bearer ${token}`)
                                .set('Accept', 'application/json')
                                .expect('Contect-Type', /json/)
                                .expect(200)
                                .end((err, res) => {
                                  //  chaiExpect(res.status).to.be.equal(200);
                                    chaiExpect(res.body).have.property("active");
                                    chaiExpect(res.body.active).to.be.deep.equal(true);
                                    done();
                                });
                        });
                    });
                });
            });
        });
    });

    describe('@@@ SCENARIO 2 – If user is not logged in @@@', () => {

        it('should gets back an error message', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user2).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Quiz.sync({ force: true }).then(() => {
                        request(app).post('/api/quizzes').send(testData.quiz1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            var quzzToDeactivate = res.body;
                            quzzToDeactivate.active = true;
                            request(app)
                                .put(`/api/quizzes/${quzzToDeactivate.id}`)
                                .send(quzzToDeactivate)
                                .set('Accept', 'application/json')
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
    });
});

