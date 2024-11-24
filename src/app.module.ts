import { Module } from '@nestjs/common';
import { appInternalImports } from './app/imports/internal.imports';
import { appPluginsImports } from './app/imports/plugin.imports';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
@Module({
  imports: [...appInternalImports, ...appPluginsImports, UserModule, AuthModule, ChatModule],
})
export class AppModule {}
