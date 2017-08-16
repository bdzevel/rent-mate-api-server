const ROLES = {
  FULL_ADMIN: 'FULL_ADMIN',
  BASIC_ADMIN: 'BASIC_ADMIN',
  LANDLORD: 'LANDLORD',
  TENANT: 'TENANT',
  USER: 'USER',
};

const ACTIONS = {
  READ_OWN_PROFILE: 'READ_OWN_PROFILE',
  WRITE_OWN_PROFILE: 'WRITE_OWN_PROFILE',

  READ_ANY_LISTING: 'READ_ANY_LISTING',
  WRITE_ANY_LISTING: 'WRITE_ANY_LISTING',
  WRITE_OWN_LISTING: 'WRITE_OWN_LISTING',

  READ_ANY_PROPERTY: 'READ_ANY_PROPERTY',
  WRITE_ANY_PROPERTY: 'WRITE_ANY_PROPERTY',
  READ_OWN_PROPERTY: 'READ_OWN_PROPERTY',
  WRITE_OWN_PROPERTY: 'WRITE_OWN_PROPERTY',
};

const ACTIONS_PER_ROLE = {
  [ROLES.FULL_ADMIN]: Object.keys(ACTIONS).map(k => ACTIONS[k]),
  [ROLES.BASIC_ADMIN]: Object.keys(ACTIONS).map(k => ACTIONS[k]),
  [ROLES.USER]: [
    ACTIONS.READ_OWN_PROFILE,
    ACTIONS.WRITE_OWN_PROFILE,
    ACTIONS.READ_ANY_LISTING,
  ],
  [ROLES.TENANT]: [
    ACTIONS.READ_OWN_PROFILE,
    ACTIONS.WRITE_OWN_PROFILE,
    ACTIONS.READ_ANY_LISTING,
  ],
  [ROLES.LANDLORD]: [
    ACTIONS.READ_OWN_PROFILE,
    ACTIONS.WRITE_OWN_PROFILE,
    ACTIONS.READ_ANY_LISTING,
    ACTIONS.WRITE_OWN_LISTING,
    ACTIONS.READ_OWN_PROPERTY,
    ACTIONS.WRITE_OWN_PROPERTY,
  ],
};

module.exports = {
  ROLES,
  ACTIONS,
  ACTIONS_PER_ROLE,
};
