import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Promise } from 'cypress/types/cy-bluebird';
import { Observable } from 'rxjs';
import { validate, parse, type InitDataParsed, } from '@telegram-apps/init-data-node';

@Injectable()
export class TmaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const [authType, authData = ''] = (request.headers('authorization') || '').split(' ');

   switch (authType) {
     case 'tma':
       try {
         validate(authData, '7208041693:AAG9wpcCaLqBULzknf9XyW5K5d_SaSi7DxQ', {
           expiresIn: 3600,
         })

         const initData: InitDataParsed = parse(authData);
         request.initData = initData
         return true;
       } catch (e) {
         throw new HttpException(e.message, HttpStatus.UNAUTHORIZED)
       }
     default:
       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
   }
  }
}
