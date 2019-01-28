import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { AccidentsService } from '../services/accidents.service';
import { Request, Response } from 'express';

@Injectable()
export class AccidentExistsMiddleware implements NestMiddleware {
  constructor(
    @Inject('AccidentsService')
    private readonly accidentsService: AccidentsService,
  ) {}

  async resolve(idParam: string): Promise<MiddlewareFunction> {
    return async (req: Request, res: Response, next) => {
      const accident = await this.accidentsService.detail(req.params[idParam]);
      if (!accident) {
        throw new NotFoundException();
      } else {
        res.locals.accident = accident;
        next();
      }
    };
  }
}
