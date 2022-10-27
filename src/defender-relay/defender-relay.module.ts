import { Module } from '@nestjs/common';
import { DefenderRelayService } from './defender-relay.service';
import { DefenderRelayController } from './defender-relay.controller';
import { PermissionsService } from 'src/permissions/permissions.service';

@Module({
  controllers: [DefenderRelayController],
  providers: [DefenderRelayService, PermissionsService]
})
export class DefenderRelayModule {}
