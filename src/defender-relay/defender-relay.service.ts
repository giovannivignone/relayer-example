import { Injectable } from '@nestjs/common';
import { CreateDefenderRelayDto } from './dto/create-defender-relay.dto';
import { UpdateDefenderRelayDto } from './dto/update-defender-relay.dto';

@Injectable()
export class DefenderRelayService {
  create(createDefenderRelayDto: CreateDefenderRelayDto) {
    return 'This action adds a new defenderRelay';
  }

  findAll() {
    return `This action returns all defenderRelay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} defenderRelay`;
  }

  update(id: number, updateDefenderRelayDto: UpdateDefenderRelayDto) {
    return `This action updates a #${id} defenderRelay`;
  }

  remove(id: number) {
    return `This action removes a #${id} defenderRelay`;
  }
}
