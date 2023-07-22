import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import AssistantV2 = require('ibm-watson/assistant/v2');
import { IamAuthenticator } from 'ibm-watson/auth';

export interface ChatbotResponse {
    text: string; }

@Injectable()
export class WatsonService {
    private assistant: AssistantV2;
    private sessionId: string;

    constructor() {
        this.assistant = new AssistantV2({
            version: '2021-06-14',
            authenticator: new IamAuthenticator({
                apikey: process.env.WATSON_API_KEY,
            }),
            serviceUrl: process.env.WATSON_SERVICE_URL,
        });
    }

    async sendMessage(input: string): Promise<any> {
        try {
            if (!this.sessionId) {
                // Create a new session when the service instance is created or the context is reset
                const session = await this.assistant.createSession({
                    assistantId: process.env.WATSON_ASSISTANT_ID,
                });
                this.sessionId = session.result.session_id;
            }

            const response = await this.assistant.message({
                assistantId: process.env.WATSON_ASSISTANT_ID,
                sessionId: this.sessionId,
                input: {
                    'message_type': 'text',
                    'text': input
                }
            });

            let chatbotResponse : { text?: string; } = {}
            chatbotResponse=response.result.output.generic[0];
            return chatbotResponse.text;
        } catch (error) {
            console.error('Error communicating with Watson Assistant:', error);
            return 'Oops, something went wrong. Please try again later.';
        }
    }

    async resetSession(): Promise<string> {
        if (this.sessionId) {
            const res=await this.assistant.deleteSession({
                assistantId: process.env.WATSON_ASSISTANT_ID,
                sessionId: this.sessionId,
            });
            this.sessionId = null;
            return "Session reseted successfully"
        }
    }



}
