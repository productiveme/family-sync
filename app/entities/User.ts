import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
    import { v4 } from 'uuid';
    import { Profile } from './Profile';
    import { Activity } from './Activity';
    import { ActivityAssignment } from './ActivityAssignment';
    import { Project } from './Project';
    import { ExamSchedule } from './ExamSchedule';
    import { Notification } from './Notification';

    @Entity()
    export class User {
      @PrimaryKey()
      id: string = v4();

      @Property({ unique: true })
      email!: string;

      @Property({ nullable: true })
      name?: string;

      @Property()
      role: 'parent' | 'child' = 'child';

      @Property()
      passwordHash!: string;

      @Property()
      createdAt: Date = new Date();

      @OneToMany(() => Profile, profile => profile.user)
      profiles = new Collection<Profile>(this);

      @OneToMany(() => Activity, activity => activity.createdBy)
      activities = new Collection<Activity>(this);

      @OneToMany(() => ActivityAssignment, assignment => assignment.user)
      activityAssignments = new Collection<ActivityAssignment>(this);

      @OneToMany(() => Project, project => project.assignedTo)
      projects = new Collection<Project>(this);

      @OneToMany(() => ExamSchedule, exam => exam.user)
      examSchedules = new Collection<ExamSchedule>(this);

      @OneToMany(() => Notification, notification => notification.user)
      notifications = new Collection<Notification>(this);
    }
