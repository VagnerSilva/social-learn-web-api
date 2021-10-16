/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContentArea } from '../contentarea/content-area.schema';
import { ContentAreaService } from '../contentarea/content-area.service';
import { BaseController } from '../utils/base.controller';
import { LearningContentDto } from './learn-content.dto';
import { LearnContentService } from './learn-content.service';

@Controller('learningContents')
export class LearnContentController extends BaseController<
  LearnContentService,
  LearningContentDto
> {
  constructor(
    private learnContentService: LearnContentService,
    private contentAreaSrv: ContentAreaService
  ) {
    super(learnContentService);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body() data: LearningContentDto
  ): Promise<LearningContentDto> {
    const ca = await this.getArea(data.contentAreaIds);
    data.contentAreas = ca;
    return await this.learnContentService.create(data);
  }

  private async getArea(contentAreaIds: string[]): Promise<ContentArea[]> {
    const areas = [];
    return new Promise((resolve) => {
      for (let index = 0; index < contentAreaIds.length; index++) {
        const id = contentAreaIds[index];
        this.contentAreaSrv.find({ _id: id }).then((data) => {
          areas.push(...data);
          if (index === contentAreaIds.length - 1) {
            resolve(areas);
          }
        });
      }
    });
  }
}
