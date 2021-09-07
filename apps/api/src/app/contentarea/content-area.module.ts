import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentAreaController } from './content-area.controller';
import { ContentAreaRepository } from './content-area.repository';
import { ContentArea, ContentAreaSchema } from './content-area.schema';
import { ContentAreaService } from './content-area.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContentArea.name, schema: ContentAreaSchema },
    ]),
  ],
  controllers: [ContentAreaController],
  providers: [ContentAreaService, ContentAreaRepository],
})
export class ContentAreaModule {}
