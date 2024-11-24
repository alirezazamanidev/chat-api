import { Module } from '@nestjs/common';
import { appInternalImports } from './app/imports/internal.imports';
import { appPluginsImports } from './app/imports/plugin.imports';
@Module({
  imports: [...appInternalImports, ...appPluginsImports],
})
export class AppModule {}
