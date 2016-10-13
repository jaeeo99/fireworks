exports.apiGET = function(req, res) {
    res.render('socketview/index', { title: 'get' });
};

exports.apiPOST = function(req, res) {
    res.render('users', { title: 'post' });
};