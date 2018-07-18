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

describe('[ *** Answer opreations *** ]', () => {
    describe('[ When Quiz Master delete answer *** ]', () => {
        it('it should be deleted in the database', (done) => {
            Answer.sync({ force: true }).then(() => {
                request(app).post('/api/answers').send(testData.answer1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end(() => {
                    request(app)
                        .delete('/api/answers/1')
                        .set('Accept', 'application/json')
                        .expect('Contect-Type', /json/)
                        .expect(204)
                        .end((err, res) => {
                            chaiExpect(res.status).to.be.deep.equal(204);
                            done();
                        });
                    });
            });
        });
    });

    describe('[ When Quiz Master create answer *** ]', () => {
        it('it should be saved in the database', (done) => {
            Answer.sync({ force: true }).then(() => {
                request(app)
                    .post('/api/answers')
                    .send(testData.answer1)
                    .set('Accept', 'application/json')
                    .expect('Contect-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        Answer.findById(1).then((answer) => {
                            chaiExpect(answer.content).to.be.deep.equal(testData.answer1.content);
                            chaiExpect(answer.result).to.be.deep.equal(testData.answer1.result);
                            chaiExpect(answer.questionId).to.be.deep.equal(testData.answer1.questionId);
                        });
                        done();
                    });
            });
        });

        it('it should return object with id propierty', (done) => {
            Answer.sync({ force: true }).then(() => {
                request(app)
                    .post('/api/answers')
                    .send(testData.answer1)
                    .set('Accept', 'application/json')
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
//describe('[ When Quiz Master create question *** ]', () => { });