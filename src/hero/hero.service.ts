import { Injectable } from '@nestjs/common';
import { Hero, HeroById, Heroes } from './hero.interface';

@Injectable()
export class HeroService {
  private readonly heroes: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Smith' },
  ];

  findOne(data: HeroById): Hero {
    const hero = this.heroes.find(({ id }) => id === data.id);
    if (!hero) {
      throw new Error(`Hero with id ${data.id} not found`);
    }
    return hero;
  }

  findAll(): Heroes {
    return { heroes: this.heroes };
  }
}
