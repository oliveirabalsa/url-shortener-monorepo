import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    description: 'The original URL to shorten',
    example: 'https://example.com/some-page',
  })
  @IsNotEmpty({ message: 'Original URL is required' })
  @IsUrl({}, { message: 'Original URL must be a valid URL' })
  originalUrl: string;
}
