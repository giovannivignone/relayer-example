import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DefenderRelayModule } from './defender-relay/defender-relay.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DefenderRelayModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
