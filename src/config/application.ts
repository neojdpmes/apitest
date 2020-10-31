import { registerAs } from '@nestjs/config';

export const applicationConfig = registerAs('application', () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  apiUrl: process.env.API_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}));
