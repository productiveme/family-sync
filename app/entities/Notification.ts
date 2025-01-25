import { Entity, PrimaryKey, Property, ManyToOne, Ref } from '@mikro-orm/core';
    import { v4 } from 'uuid';
    import { User } from './User';

    @Entity()
    export class Notification {
      @PrimaryKey()
      id: string = v4();

      @ManyToOne(() => User, { ref: true })
      user!: Ref<User>;

      @Property()
      type!: string;

      @Property()
      title!: string;

      @Property()
      message!: string;

      @Property({ default: 'unread' })
      status: 'unread' | 'read' = 'unread';

      @Property()
      createdAt: Date = new Date();
    }
