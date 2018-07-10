var app = require('./server');
var request = require('supertest');
var chai = require('chai').expect;
var Sequelize = require('sequelize');
var sequelize = require('./config/db_connection').sequelize;
var User = require('./api/user/userModel');

var userCreator = {
    name: 'Michal Smigielasdf',
    email: 'ms@gmal.com',
    role: "creator",
    password: "123"
};

describe('User operation', function () {
    before(function () {
        // sequelize
        //     .authenticate()
        //     .then(() => {
        //         console.log('Connection has been established successfully.');
        //     })
        //     .catch(err => {
        //         console.error('Unable to connect to the database:', err);
        //     });
        // User.sync(
        //     { force: true }
        // );
        // .then(() => {
        //     // Table created
        //     return User.create(userCreator);
        // });
        // User.create(userCreator);
    });

    it('should create Quiz Master', function (done) {
        User.sync({ force: true })
            .then(() => {
                request(app)
                    .post('/api/users')
                    .send(userCreator)
                    .set('Accept', 'application/json')
                    .expect('Contect-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        //var userFromDB = User.findById(1);
                        chai(res.body).to.be.an('object');
                        chai(res.body.email).to.be.deep.equal(userCreator.email);
                        //console.log(resp.body);

                        done();
                    })
            });
    });
});