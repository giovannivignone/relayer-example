import { Injectable } from '@nestjs/common';

@Injectable()
export class DefenderRelayService {
  create(createDefenderRelayDto) {
    return 'This action adds a new defenderRelay';
  }

  findAll() {
    return `This action returns all defenderRelay`;
  }

}
