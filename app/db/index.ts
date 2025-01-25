import { MikroORM } from '@mikro-orm/core';
    import config from '../mikro-orm.config';

    export default async function initializeORM() {
      return await MikroORM.init(config);
    }
