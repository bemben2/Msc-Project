const app = require('../server/server');
const request = require('supertest');
const chaiExpect = require('chai').expect;
const Sequelize = require('sequelize');
const sequelize = require('../server/config/db_connection').sequelize;
const User = require('../server/api/user/userModel');
const Quiz = require('../server/api/quiz/quizModel');
const testData = require('./testdata');

describe('[ *** US#6 Delete quiz *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('gets back updated quiz object', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Quiz.sync({ force: true }).then(() => {
                        request(app).post('/api/quizzes').send(testData.quiz2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            let quizToDelete = res.body;
                            request(app)
                                .delete(`/api/quizzes/${quizToDelete.id}`)
                                .send(quizToDelete)
                                .set('Authorization', `Bearer ${token}`)
                                .set('Accept', 'application/json')
                                .expect('Contect-Type', /json/)
                                .expect(200)
                                .end((err, res) => {
                                    //  chaiExpect(res.status).to.be.equal(200);
                                    // console.log(res.body);
                                    chaiExpect(res.body).to.be.deep.equal("quiz deleted");
                                    done();
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
                    Quiz.sync({ force: true }).then(() => {
                        request(app).post('/api/quizzes').send(testData.quiz2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            let quizToDelete = res.body;
                            request(app)
                                .delete(`/api/quizzes/${quizToDelete.id}`)
                                .send(quizToDelete)
                                //.set('Authorization', `Bearer ${token}`)
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
