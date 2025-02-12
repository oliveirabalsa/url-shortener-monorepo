import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../common/types/user.type';

@ApiTags('urls')
@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Create a new short URL' })
  @ApiBearerAuth()
  async create(
    @Body() createUrlDto: CreateUrlDto,
    @Req() req: Request,
    @GetUser() user?: User,
  ) {
    const createdUrl = await this.urlService.createUrl(createUrlDto, user?.id);
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return { shortUrl: `${baseUrl}/${createdUrl.slug}` };
  }

  @Get(':slug')
  @Redirect()
  @ApiOperation({ summary: 'Redirect to the original URL' })
  async redirect(@Param('slug') slug: string) {
    const url = await this.urlService.getUrlBySlug(slug);
    await this.urlService.incrementVisits(url.id);
    return { url: url.originalUrl };
  }
}
