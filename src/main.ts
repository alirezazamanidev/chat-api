import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { join } from 'path';
import { AppConfigs } from './configs/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
config({ path: join(process.cwd(), '.env') });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app Configs
  AppConfigs(app);
  const { APP_PORT } = process.env;
  await app.listen(APP_PORT, () => {
    console.log(`server runnig at port : ${APP_PORT}`);
  });
}
bootstrap();
