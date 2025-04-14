import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Hero, HeroById, Heroes } from './hero.interface';
import { HeroService } from './hero.service';

@Controller()
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @GrpcMethod('HeroService', 'FindOne')
  findOne(data: HeroById): Hero {
    return this.heroService.findOne(data);
  }

  @GrpcMethod('HeroService', 'FindAll')
  findAll(): Heroes {
    return this.heroService.findAll();
  }
}
