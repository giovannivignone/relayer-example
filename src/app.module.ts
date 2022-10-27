import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DefenderRelayModule } from './defender-relay/defender-relay.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionsService } from './permissions/permissions.service';

@Module({
  imports: [
    DefenderRelayModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppService, PermissionsService],
})
export class AppModule {}
