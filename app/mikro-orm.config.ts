import { defineConfig } from '@mikro-orm/core';
    import { SqliteDriver } from '@mikro-orm/sqlite';
    import { User } from './entities/User';
    import { Profile } from './entities/Profile';
    import { Activity } from './entities/Activity';
    import { ActivityAssignment } from './entities/ActivityAssignment';
    import { Project } from './entities/Project';
    import { ExamSchedule } from './entities/ExamSchedule';
    import { Notification } from './entities/Notification';
    import { Migrator } from '@mikro-orm/migrations';

    export default defineConfig({
      entities: [User, Profile, Activity, ActivityAssignment, Project, ExamSchedule, Notification],
      dbName: 'data.db',
      driver: SqliteDriver,
      debug: true,
      migrations: {
        path: 'app/migrations',
        pattern: /^[\w-]+\d+\.[tj]s$/,
        disableForeignKeys: false,
        transactional: true,
        emit: 'ts',
        tableName: 'mikro_orm_migrations',
      },
      extensions: [Migrator],
    });
