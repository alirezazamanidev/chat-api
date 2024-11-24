import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

export const AppConfigs = (app: NestExpressApplication) => {
  app.enableCors({ origin: '*', credentials: true });

  app.useGlobalPipes(new ValidationPipe());
};
