import { Client } from 'discord.js';
import { interfaces as loggerInterfaces } from '@numengames/numinia-logger';

import IntegrationsApiService, {
  IIntegrationsApiService,
} from '../services/integrations-api-service';
import ReplyConversation from './actions/reply-conversation';
import CreateConversation from './actions/create-conversation';

interface IBot {
  init(): void;
  replyConversation(): void;
  createConversation(): void;
}

interface IParams {
  token: string;
  client: Client;
  botName: string;
  loggerHandler: loggerInterfaces.ILogger;
}

export default class Bot implements IBot {
  private token: string;

  private client: Client;

  private botName: string;

  private loggerHandler: loggerInterfaces.ILogger;

  private integrationsApiService: IIntegrationsApiService;

  constructor({ loggerHandler, token, botName, client }: IParams) {
    this.token = token;
    this.client = client;
    this.botName = botName;
    this.loggerHandler = loggerHandler;
    this.integrationsApiService = new IntegrationsApiService();
  }

  init(): void {
    this.client.once('ready', () => {
      this.loggerHandler.logInfo(`login - Bot ${this.botName} is ready!`);
    });

    this.client.login(this.token);
  }

  replyConversation(): void {
    const replyMessage = new ReplyConversation({
      client: this.client,
      loggerHandler: this.loggerHandler,
      integrationsApiService: this.integrationsApiService,
    });

    replyMessage.handleReplyMessage(this.botName);
  }

  createConversation(): void {
    const createConversation = new CreateConversation({
      client: this.client,
      loggerHandler: this.loggerHandler,
      integrationsApiService: this.integrationsApiService,
    });

    createConversation.handleCreateConversation();
  }
}
