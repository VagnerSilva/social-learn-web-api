import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CONNECTION_STRING, getCredentials } from './config';
import { ContentAreaModule } from './contentArea/content-area.module';
import { EmailModule } from './email/email.module';
import { LearnContentModule } from './learnContent/learn-content.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';

const credentials = getCredentials();
@Module({
  imports: [
    LearnContentModule,
    ContentAreaModule,
    ProfileModule,
    EmailModule,
    UtilsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: any) => ({
        uri: CONNECTION_STRING,
        sslKey: credentials.sslKey,
        sslCert: credentials.sslCert,
      }),
    }),
    UserModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
