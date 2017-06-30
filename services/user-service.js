const self = {
  saveUser(user) {
    return user.save();
  },
};

Object.assign(module.exports, self);
