const app = require('../server/server');
const request = require('supertest');
const chaiExpect = require('chai').expect;
// const Sequelize = require('sequelize');
// const sequelize = require('../server/config/db_connection').sequelize;
const User = require('../server/api/user/userModel');
const Question = require('../server/api/question/questionModel');
const testData = require('./testdata');

describe('[ *** US#10 Delete question *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('gets back confirmation message', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                    var token = res.body.token;
                    Question.sync({ force: true }).then(() => {
                        request(app).post('/api/questions').send(testData.question1).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            let questionToDelete = res.body;
                            request(app)
                                .delete(`/api/questions/${questionToDelete.id}`)
                                .send(questionToDelete)
                                .set('Authorization', `Bearer ${token}`)
                                .set('Accept', 'application/json')
                                .expect('Contect-Type', /json/)
                                .expect(200)
                                .end((err, res) => {
                                    // console.log(res.body);
                                    chaiExpect(res.body).to.be.deep.equal("question deleted");
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
                    Question.sync({ force: true }).then(() => {
                        request(app).post('/api/questions').send(testData.question2).set('Authorization', `Bearer ${token}`).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
                            let questionToDelete = res.body;
                            request(app)
                                .delete(`/api/questions/${questionToDelete.id}`)
                                .send(questionToDelete)
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
