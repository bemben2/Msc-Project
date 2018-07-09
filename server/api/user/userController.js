
exports.params = function (req, res, next, id) {
    // find user if exist and atach it to 
    var user = {
        'id': '1',
        'firstname': 'Michal',
        'lastname': 'Smigiel',
        'role': 'creator'
    };
    // User.find(id, function (err, user) {
    //     if (err) {
    //         next(err);
    //     } else if (user) {
    //         req.user = user;
    //         next();
    //     } else {
    //         next(new Error('failed to load user'));
    //     }
    // });
    // if (err) {
    //     next(err);
    // } else {
        if (id === user.id) {
            req.user = user;
            next();
        } else {
            next(new Error('failed to load user'));
        }
    // }
};

exports.get = function (req, res, next) {
    res.json({ 'user': 'GET respond' });
    // if (err) {
    //     next(err);
    // }
};

exports.post = function (req, res, next) {
    res.json({ 'user': 'POST respond' });
    // if (err) {
    //     next(err);
    // }
};

exports.getOne = function (req, res, next) {
   // res.json({ 'user': 'GET one respond' });
    res.json(req.user);
    // if (err) {
    //     next(err);
    // }
};

exports.put = function (req, res, next) {
    res.json({ 'user': 'PUT respond' });
    // if (err) {
    //     next(err);
    // }
};