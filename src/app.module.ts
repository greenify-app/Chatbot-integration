import { Module } from '@nestjs/common';
import { WatsonController } from './watson/watson.controller';
import { WatsonService } from './watson/watson.service';

@Module({
  imports: [],
  controllers: [ WatsonController],
  providers: [ WatsonService],
})
export class AppModule {}
