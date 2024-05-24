import { AxiosResponse } from 'axios';

const axios = require('axios');

export interface IIntegrationsApiService {
  handleAssistantMessage(
    conversationId: string,
    params: Record<string, string>,
  ): Promise<string>;
  handleMessage(
    conversationId: string,
    params: Record<string, string>,
  ): Promise<string>;
  createConversation(params: Record<string, unknown>): Promise<void>;
  getConversationById(conversationId: string): Promise<Record<string, unknown>>;
}

export default class IntegrationsApiService {
  static BASE_URL = 'https://integrations-api.numinia.xyz/api/v1';

  async send({
    url,
    method = 'POST',
    bodyParams = {},
  }: {
    url: string;
    method?: 'GET' | 'POST';
    bodyParams?: Record<string, unknown>;
  }) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const config = {
      url,
      method,
      headers,
      ...(method === 'POST' ? { data: bodyParams } : {}),
    };

    return axios(config).then((response: AxiosResponse) => response.data);
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

  async getConversationById(
    conversationId: string,
  ): Promise<Record<string, unknown>> {
    const url = `${IntegrationsApiService.BASE_URL}/conversation/${conversationId}`;
    return this.send({ url, method: 'GET' });
  }
}
