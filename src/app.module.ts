import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { CliModule } from './cli/cli.module';

@Module({
  imports: [GatewayModule, CliModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
