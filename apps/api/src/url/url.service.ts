import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { customAlphabet } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async createUrl(createUrlDto: CreateUrlDto, userId?: string) {
    const { originalUrl } = createUrlDto;
    const slug = await this.generateUniqueSlug();
    return this.prisma.url.create({
      data: {
        originalUrl,
        slug,
        userId,
      },
    });
  }

  async getUrlBySlug(slug: string) {
    const url = await this.prisma.url.findUnique({ where: { slug } });
    if (!url) throw new NotFoundException('URL not found');
    return url;
  }

  async incrementVisits(id: string) {
    return this.prisma.url.update({
      where: { id },
      data: { visits: { increment: 1 } },
    });
  }

  private async generateUniqueSlug(): Promise<string> {
    const generateSlug = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      6,
    );
    let slug = generateSlug();
    while (await this.prisma.url.findUnique({ where: { slug } })) {
      slug = generateSlug();
    }
    return slug;
  }
}
