const app = require('../server/server');
const request = require('supertest');
const chaiExpect = require('chai').expect;
// const Sequelize = require('sequelize');
// const sequelize = require('../server/config/db_connection').sequelize;
const User = require('../server/api/user/userModel');
const Answer = require('../server/api/answer/answerModel');
const testData = require('./testdata');

describe('[ *** US#14 Delete answer *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('gets back confirmation message', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Answer.sync({ force: true }).then(() => {
                        request(app).post('/api/answers').send(testData.answer1).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            let answerToDelete = res.body;
                            request(app)
                                .delete(`/api/answers/${answerToDelete.id}`)
                                .send(answerToDelete)
                                .set('Authorization', `Bearer ${token}`)
                                .set('Accept', 'application/json')
                                .expect('Contect-Type', /json/)
                                .expect(200)
                                .end((err, res) => {
                                    // console.log(res.body);
                                    chaiExpect(res.body).to.be.deep.equal("answer deleted");
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
                    Answer.sync({ force: true }).then(() => {
                        request(app).post('/api/answers').send(testData.answer2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            let answerToDelete = res.body;
                            request(app)
                                .delete(`/api/questions/${answerToDelete.id}`)
                                .send(answerToDelete)
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
