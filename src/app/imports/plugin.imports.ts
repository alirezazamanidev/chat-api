import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from '../plugins/typeorm-config.service';

export const appPluginsImports = [
  TypeOrmModule.forRootAsync({
    useClass: TypeOrmDbConfig,
    inject: [TypeOrmDbConfig],
  }),
];
