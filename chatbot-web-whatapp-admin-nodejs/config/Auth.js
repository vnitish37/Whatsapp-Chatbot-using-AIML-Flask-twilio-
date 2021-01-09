module.exports = {
    ensureauth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Login to view Dashboard');
        res.redirect('/login')
    }
}