var app = require('../server/server');
var request = require('supertest');
var chaiExpect = require('chai').expect;
var Sequelize = require('sequelize');
var sequelize = require('../server/config/db_connection').sequelize;
var User = require('../server/api/user/userModel');
var Quiz = require('../server/api/quiz/quizModel');
var testData = require('./testdata');

describe('[ *** US#1 User creates an acount *** ]', () => {

    describe('@@@ SCENARIO 1 – All data entered correctly @@@', () => {

        it('should get back user object with attached token and id', (done) => {

            User.sync({ force: true }).then(() => {
                request(app)
                    .post('/api/auth/signup')
                    .send(testData.user1)
                    .set('Accept', 'application/json')
                    .expect('Contect-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        chaiExpect(res.body).to.be.an('object');
                        chaiExpect(res.body).have.property("id");
                        chaiExpect(res.body).have.property("token");
                        chaiExpect(res.body.name).to.be.deep.equal(testData.user1.name);
                        chaiExpect(res.body.email).to.be.deep.equal(testData.user1.email);
                        chaiExpect(res.body.master).to.be.deep.equal(testData.user1.master);
                        chaiExpect(res.body.password).to.be.deep.equal(testData.user1.password);
                        done();
                    });
            });
        });
    });

    describe('@@@ SCENARIO 2 – If one of the field is empty @@@', () => {

        it('should get back an error message', (done) => {

            User.sync({ force: true }).then(() => {
                delete testData.user2.name;
                request(app)
                    .post('/api/auth/signup')
                    .send(testData.user2)
                    .set('Accept', 'application/json')
                    .expect('Contect-Type', /json/)
                    .expect(500)
                    .end(function (err, res) {
                        //console.log('ERROR message:ERROR message:', res.body);
                        chaiExpect(res.body).to.be.deep.equal("notNull Violation: user.name cannot be null");
                        done();
                    });
            });
        });

    });

    describe('@@@ SCENARIO 3 – If email address is already in the system @@@', () => {

        it('should get back an error message', (done) => {

            User.sync({ force: true }).then(() => {
                request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end(() => {
                    request(app)
                        .post('/api/auth/signup')
                        .send(testData.user1)
                        .set('Accept', 'application/json')
                        .expect('Contect-Type', /json/)
                        .expect(500)
                        .end(function (err, res) {
                            chaiExpect(res.body).to.be.deep.equal("Validation error");
                            done();
                        });
                });
           
            });
        });
    });

});

