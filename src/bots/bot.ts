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
  logger: loggerInterfaces.ILogger;
}

export default class Bot implements IBot {
  private token: string;

  private client: Client;

  private botName: string;

  private logger: loggerInterfaces.ILogger;

  private integrationsApiService: IIntegrationsApiService;

  constructor({ logger, token, botName, client }: IParams) {
    this.token = token;
    this.logger = logger;
    this.client = client;
    this.botName = botName;
    this.integrationsApiService = new IntegrationsApiService();
  }

  init(): void {
    this.client.once('ready', () => {
      this.logger.logInfo(`login - Bot ${this.botName} is ready!`);
    });

    this.client.login(this.token);
  }

  replyConversation(): void {
    const replyMessage = new ReplyConversation({
      logger: this.logger,
      client: this.client,
      integrationsApiService: this.integrationsApiService,
    });

    replyMessage.handleReplyMessage(this.botName);
  }

  createConversation(): void {
    const createConversation = new CreateConversation({
      logger: this.logger,
      client: this.client,
      integrationsApiService: this.integrationsApiService,
    });

    createConversation.handleCreateConversation();
  }
}
