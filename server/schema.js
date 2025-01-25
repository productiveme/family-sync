export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    profiles: [Profile!]
  }

  type Profile {
    id: ID!
    name: String!
    grade: String
    subjects: [Subject!]
    activities: [Activity!]
    userId: ID!
  }

  type Subject {
    id: ID!
    name: String!
    targetHours: Float!
    completedHours: Float
  }

  type Activity {
    id: ID!
    title: String!
    type: String!
    startTime: String!
    duration: Int!
    description: String
    checklist: [ChecklistItem!]
    recurring: Boolean!
    daysOfWeek: [Int!]
    profileId: ID!
  }

  type ChecklistItem {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SubjectInput {
    name: String!
    targetHours: Float!
  }

  input ChecklistItemInput {
    text: String!
    completed: Boolean!
  }

  input ActivityInput {
    title: String!
    type: String!
    startTime: String!
    duration: Int!
    description: String
    checklist: [ChecklistItemInput!]
    recurring: Boolean!
    daysOfWeek: [Int!]
    profileId: ID!
  }

  type Query {
    me: User
    profiles: [Profile!]!
    profile(id: ID!): Profile
    activities(profileId: ID, type: String): [Activity!]!
    activity(id: ID!): Activity
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(name: String!, email: String!, password: String!, role: String!): AuthPayload!
    createProfile(name: String!, grade: String, subjects: [SubjectInput!]): Profile!
    updateProfile(id: ID!, name: String, grade: String, subjects: [SubjectInput!]): Profile!
    deleteProfile(id: ID!): Boolean!
    createActivity(input: ActivityInput!): Activity!
    updateActivity(id: ID!, input: ActivityInput!): Activity!
    deleteActivity(id: ID!): Boolean!
    updateChecklistItem(activityId: ID!, itemId: ID!, completed: Boolean!): Activity!
  }

  type Subscription {
    activityCreated(profileId: ID!): Activity!
    activityUpdated(profileId: ID!): Activity!
    checklistItemUpdated(activityId: ID!): Activity!
  }
`;

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) return null;
      const users = await getCollection('users');
      return users.findOne({ _id: user.id });
    },
    profiles: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const profiles = await getCollection('profiles');
      return profiles.find({ userId: user.id }).toArray();
    },
    profile: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const profiles = await getCollection('profiles');
      return profiles.findOne({ _id: id, userId: user.id });
    },
    activities: async (_, { profileId, type }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const activities = await getCollection('activities');
      const query = { userId: user.id };
      if (profileId) query.profileId = profileId;
      if (type) query.type = type;
      return activities.find(query).toArray();
    },
    activity: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const activities = await getCollection('activities');
      return activities.findOne({ _id: id, userId: user.id });
    }
  },

  Mutation: {
    login: async (_, { email, password }, { pubsub }) => {
      const users = await getCollection('users');
      const user = await users.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // In production, use proper password hashing
      if (password !== user.password) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken(user);
      return { token, user };
    },

    register: async (_, { name, email, password, role }, { pubsub }) => {
      const users = await getCollection('users');
      const existingUser = await users.findOne({ email: email.toLowerCase() });
      
      if (existingUser) {
        throw new Error('Email already registered');
      }

      // In production, hash the password
      const user = {
        name,
        email: email.toLowerCase(),
        password, // Should be hashed in production
        role,
        createdAt: new Date()
      };

      const result = await users.insertOne(user);
      user.id = result.insertedId;

      const token = generateToken(user);
      return { token, user };
    },

    createProfile: async (_, { name, grade, subjects }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      
      const profiles = await getCollection('profiles');
      const profile = {
        name,
        grade,
        subjects: subjects || [],
        userId: user.id,
        createdAt: new Date()
      };

      const result = await profiles.insertOne(profile);
      profile.id = result.insertedId;
      return profile;
    },

    createActivity: async (_, { input }, { user, pubsub }) => {
      if (!user) throw new Error('Not authenticated');
      
      const activities = await getCollection('activities');
      const activity = {
        ...input,
        userId: user.id,
        createdAt: new Date()
      };

      const result = await activities.insertOne(activity);
      activity.id = result.insertedId;

      pubsub.publish(`ACTIVITY_CREATED_${input.profileId}`, {
        activityCreated: activity
      });

      return activity;
    }
  },

  Subscription: {
    activityCreated: {
      subscribe: (_, { profileId }, { pubsub }) => 
        pubsub.subscribe(`ACTIVITY_CREATED_${profileId}`)
    },
    activityUpdated: {
      subscribe: (_, { profileId }, { pubsub }) => 
        pubsub.subscribe(`ACTIVITY_UPDATED_${profileId}`)
    },
    checklistItemUpdated: {
      subscribe: (_, { activityId }, { pubsub }) => 
        pubsub.subscribe(`CHECKLIST_UPDATED_${activityId}`)
    }
  },

  User: {
    profiles: async (user) => {
      const profiles = await getCollection('profiles');
      return profiles.find({ userId: user.id }).toArray();
    }
  },

  Profile: {
    activities: async (profile) => {
      const activities = await getCollection('activities');
      return activities.find({ profileId: profile.id }).toArray();
    }
  }
};

export const schema = {
  typeDefs,
  resolvers
};
