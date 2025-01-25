// Core data types for the application
export const ActivityType = {
  SCHOOL: 'school',
  SPORTS: 'sports',
  STUDY: 'study',
  PROJECT: 'project',
  OTHER: 'other'
};

export const UserRole = {
  PARENT: 'parent',
  CHILD: 'child'
};

export const colorMap = {
  [ActivityType.SCHOOL]: '#4CAF50',
  [ActivityType.SPORTS]: '#2196F3',
  [ActivityType.STUDY]: '#9C27B0',
  [ActivityType.PROJECT]: '#FF9800',
  [ActivityType.OTHER]: '#607D8B'
};
