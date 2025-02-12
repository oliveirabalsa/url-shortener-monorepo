import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from 'src/common/types/user.type';

@ApiTags('account')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('urls')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get URLs created by the authenticated user' })
  async getUrls(@GetUser() user: User) {
    return this.accountService.getUrlsByUserId(user.id);
  }
}
