const self = {
  getUserProfile(user) {
    if (!user) {
      return { isAuthenticated: false };
    }

    const outputFields = [ 'username', 'firstName', 'lastName' ];
    const profile = outputFields.reduce(function(acc, curr) {
      acc[curr] = user[curr];
      return acc;
    }, { isAuthenticated: true });
    return profile;
  },

  saveUser(user) {
    return user.save();
  },
};

Object.assign(module.exports, self);
