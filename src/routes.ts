import { healthRoutes } from '@chat/routes/health';
import { messageRoutes } from '@chat/routes/message';
// import { verifyGatewayRequest } from '@josephboadi/joy-jobber-shared';
import { Application } from 'express';
// import { verifyGatewayRequest } from './interfaces';

const BASE_PATH = '/api/v1/message';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  // app.use(BASE_PATH, verifyGatewayRequest, messageRoutes());
  app.use(BASE_PATH, messageRoutes());
};

export { appRoutes };
