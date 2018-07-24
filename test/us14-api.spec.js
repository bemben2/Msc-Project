var app = require('../server/server');
var request = require('supertest');
var chaiExpect = require('chai').expect;
var Sequelize = require('sequelize');
var sequelize = require('../server/config/db_connection').sequelize;
var User = require('../server/api/user/userModel');
var Quiz = require('../server/api/quiz/quizModel');
var testData = require('./testdata');

// describe('[ *** US#14 Quiz result *** ]', () => {

//     describe('@@@ SCENARIO 1 – User request quizzes list @@@', () => {

//         it('should get back user object with attached token and id', (done) => {
//             User.sync({ force: true }).then(() => {
//                 request(app).post('/api/auth/signup').send(testData.user1).set('Accept', 'application/json').expect('Contect-Type', /json/).expect(200).end((err, res) => {
//                     var token = res.body.token;
//                 });
//             });
//         });
//     });
// });