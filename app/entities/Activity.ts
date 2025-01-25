import { Entity, PrimaryKey, Property, ManyToOne, Ref, Collection, OneToMany } from '@mikro-orm/core';
    import { v4 } from 'uuid';
    import { User } from './User';
    import { ActivityAssignment } from './ActivityAssignment';

    @Entity()
    export class Activity {
      @PrimaryKey()
      id: string = v4();

      @Property()
      title!: string;

      @Property({ nullable: true })
      description?: string;

      @Property()
      type!: string;

      @Property({ type: 'date' })
      startTime!: Date;

      @Property({ type: 'date' })
      endTime!: Date;

      @Property({ nullable: true })
      location?: string;

      @Property({ type: 'json', nullable: true })
      recurring?: {
        frequency: 'daily' | 'weekly' | 'monthly';
        days?: number[];
        endDate?: Date;
      };

      @ManyToOne(() => User, { ref: true })
      createdBy!: Ref<User>;

      @OneToMany(() => ActivityAssignment, assignment => assignment.activity)
      activityAssignments = new Collection<ActivityAssignment>(this);
    }
