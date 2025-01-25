import { Entity, PrimaryKey, Property, ManyToOne, Ref } from '@mikro-orm/core';
    import { v4 } from 'uuid';
    import { User } from './User';

    @Entity()
    export class Profile {
      @PrimaryKey()
      id: string = v4();

      @ManyToOne(() => User, { ref: true })
      user!: Ref<User>;

      @Property({ nullable: true })
      grade?: string;

      @Property({ default: '#000000' })
      color: string = '#000000';

      @Property({ type: 'json', nullable: true })
      settings?: Record<string, any>;
    }
