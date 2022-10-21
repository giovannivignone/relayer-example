import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DefenderRelayModule } from './defender-relay/defender-relay.module';

@Module({
  imports: [DefenderRelayModule],
  providers: [AppService],
})
export class AppModule {}
