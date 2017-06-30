const self = {
  getCurrentUser(req, res) {
    const outputFields = [ 'username', 'firstName', 'lastName' ];
    const user = outputFields.reduce(function(acc, curr) {
      acc[curr] = req.user[curr];
      return acc;
    }, { });
    res.status(200).json(user);
  },
};

module.exports = self;
