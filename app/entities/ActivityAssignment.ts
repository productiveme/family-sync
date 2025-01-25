import { Entity, PrimaryKey, Property, ManyToOne, Ref } from '@mikro-orm/core';
    import { v4 } from 'uuid';
    import { Activity } from './Activity';
    import { User } from './User';

    @Entity()
    export class ActivityAssignment {
      @PrimaryKey()
      id: string = v4();

      @ManyToOne(() => Activity, { ref: true })
      activity!: Ref<Activity>;

      @ManyToOne(() => User, { ref: true })
      user!: Ref<User>;

      @Property({ type: 'json', nullable: true })
      checklist?: {
        items: Array<{
          id: string;
          text: string;
          completed: boolean;
        }>;
      };

      @Property({ default: 'pending' })
      status: 'pending' | 'ready' | 'completed' = 'pending';
    }
