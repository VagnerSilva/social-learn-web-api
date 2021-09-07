import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CONNECTION_STRING, getCredentials } from './config';
import { ContentAreaModule } from './contentarea/content-area.module';
import { ContentAreaService } from './contentarea/content-area.service';
import { EmailModule } from './email/email.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ContentAreaModule,
    ProfileModule,
    EmailModule,
    UtilsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(CONNECTION_STRING, getCredentials()),
    UserModule,
  ],
  controllers: [AppController],
  providers: [ContentAreaService, AppService],
})
export class AppModule {}
