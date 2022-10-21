import { Module } from '@nestjs/common';
import { DefenderRelayService } from './defender-relay.service';
import { DefenderRelayController } from './defender-relay.controller';

@Module({
  controllers: [DefenderRelayController],
  providers: [DefenderRelayService]
})
export class DefenderRelayModule {}
