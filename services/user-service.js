const User = global.models.users;

const self = {
  saveUser(user) {
    return user.save();
  },
};

Object.assign(module.exports, self);
