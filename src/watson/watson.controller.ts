import { Body, Controller, Post } from '@nestjs/common';
import { WatsonService } from './watson.service';

@Controller('watson')
export class WatsonController {
    constructor(private readonly watsonService: WatsonService ){ }

    @Post("/chat")
    async chatWithAssistant(@Body() body: { message: string }): Promise<string> {
      const input = body.message;
      return this.watsonService.sendMessage(input);
    }

    @Post("/reset")
    async resetSession(): Promise<any> {
      return this.watsonService.resetSession();
    }
}
