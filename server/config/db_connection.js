var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var sequelize = new Sequelize(
    'mscproject',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: {
            $and: Op.and,
            $or: Op.or,
            $eq: Op.eq,
            $gt: Op.gt,
            $lt: Op.lt,
            $lte: Op.lte,
            $like: Op.like
        },
        define: {
            timestamps: false
        },
       logging: false
    }

);

module.exports = {
    Sequelize: sequelize,
    sequelize: sequelize
};
