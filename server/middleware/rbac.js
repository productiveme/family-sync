const ROLES = {
  ADMIN: 'admin',
  PARENT: 'parent',
  CHILD: 'child'
};

const PERMISSIONS = {
  CREATE_ACTIVITY: ['admin', 'parent'],
  UPDATE_ACTIVITY: ['admin', 'parent'],
  DELETE_ACTIVITY: ['admin', 'parent'],
  VIEW_ACTIVITY: ['admin', 'parent', 'child'],
  MANAGE_USERS: ['admin'],
  MANAGE_PROFILES: ['admin', 'parent']
};

export const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const hasPermission = PERMISSIONS[permission].includes(req.user.role);
    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

export const roleGuard = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const hasRole = roles.includes(req.user.role);
    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

export { ROLES, PERMISSIONS };
