import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @ApiTags('Hello Word')
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
