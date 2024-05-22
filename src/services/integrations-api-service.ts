const axios = require('axios');

export default class IntegrationsApiService {
  static BASE_URL = 'https://integrations-api.numinia.xyz/api/v1';

  constructor() {}

  async send({
    url,
    bodyParams,
  }: Record<string, string | Record<string, unknown>>) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.post(url, bodyParams, { headers });
    return response.data;
  }

  async createConversation(params: Record<string, unknown>): Promise<void> {
    const url = `${IntegrationsApiService.BASE_URL}/conversation/`;
    await this.send({ url, bodyParams: params });
  }

  async handleAssistantMessage(
    conversationId: string,
    params: Record<string, string>,
  ): Promise<string> {
    const url = `${IntegrationsApiService.BASE_URL}/openai/conversation/assistant/text/${conversationId}`;
    return this.send({ url, bodyParams: params });
  }

  async handleMessage(
    conversationId: string,
    params: Record<string, string>,
  ): Promise<string> {
    const url = `${IntegrationsApiService.BASE_URL}/openai/conversation/text/${conversationId}`;
    return this.send({ url, bodyParams: params });
  }
}
