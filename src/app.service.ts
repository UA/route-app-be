import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {status: string, date: Date} {
    return {
      status: 'ok',
      date: new Date(),
    };
  }
}
