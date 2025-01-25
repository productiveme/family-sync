import { Entity, PrimaryKey, Property, ManyToOne, Ref } from '@mikro-orm/core';
    import { v4 } from 'uuid';
    import { User } from './User';

    @Entity()
    export class Project {
      @PrimaryKey()
      id: string = v4();

      @Property()
      title!: string;

      @Property({ nullable: true })
      description?: string;

      @Property({ type: 'date', nullable: true })
      dueDate?: Date;

      @Property({ default: 'planned' })
      status: 'planned' | 'in_progress' | 'completed' = 'planned';

      @ManyToOne(() => User, { ref: true })
      assignedTo!: Ref<User>;

      @Property({ type: 'json', nullable: true })
      materials?: {
        items: Array<{
          id: string;
          name: string;
          quantity: number;
          acquired: boolean;
        }>;
      };

      @Property({ default: 0 })
      progress: number = 0;
    }
