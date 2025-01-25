import { Entity, PrimaryKey, Property, ManyToOne, Ref } from '@mikro-orm/core';
    import { v4 } from 'uuid';
    import { User } from './User';

    @Entity()
    export class ExamSchedule {
      @PrimaryKey()
      id: string = v4();

      @ManyToOne(() => User, { ref: true })
      user!: Ref<User>;

      @Property()
      subject!: string;

      @Property({ type: 'date' })
      examDate!: Date;

      @Property()
      duration!: number;

      @Property({ default: 'medium' })
      priority: 'low' | 'medium' | 'high' = 'medium';

      @Property({ type: 'json', nullable: true })
      studyBlocks?: Array<{
        date: Date;
        duration: number;
        completed: boolean;
      }>;
    }
