const app = require('../server/server');
const request = require('supertest');
const chaiExpect = require('chai').expect;
const Sequelize = require('sequelize');
const sequelize = require('../server/config/db_connection').sequelize;
const User = require('../server/api/user/userModel');
const Quiz = require('../server/api/quiz/quizModel');
const testData = require('./testdata');

describe('[ *** US#5 Update quiz *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('gets back updated quiz object', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Quiz.sync({ force: true }).then(() => {
                        request(app).post('/api/quizzes').send(testData.quiz2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            var quzzToUpdate = res.body;
                            quzzToUpdate.category = "Brand new category";
                            request(app)
                                .put(`/api/quizzes/${quzzToUpdate.id}`)
                                .send(quzzToUpdate)
                                .set('Authorization', `Bearer ${token}`)
                                .set('Accept', 'application/json')
                                .expect('Contect-Type', /json/)
                                .expect(200)
                                .end((err, res) => {
                                    //  chaiExpect(res.status).to.be.equal(200);
                                   // console.log(res.body);
                                    chaiExpect(res.body).have.property("category");
                                    chaiExpect(res.body.category).to.be.deep.equal("Brand new category");
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
                            var quzzToUpdate = res.body;
                            quzzToUpdate.category = "Brand new category";
                            request(app)
                                .put(`/api/quizzes/${quzzToUpdate.id}`)
                                .send(quzzToUpdate)
                                //.set('Authorization', `Bearer ${token}`)
                                .set('Accept', 'application/json')
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
    });
});
