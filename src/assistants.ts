export type TAssistant = {
  name: string;
  fullName: string;
  openaiId: string;
  discordId: string;
};

export const getAssistantByDiscordId = (discordId: string): TAssistant => {
  const assistantKey = Object.keys(assistants).find(
    (assistant: string) => assistants[assistant].discordId === discordId,
  );

  if (!assistantKey) {
    throw new Error('The assistant does not exist');
  }

  return assistants[assistantKey];
};

export const getAssistantByOpenaiId = (openaiId: string): TAssistant => {
  const assistantKey = Object.keys(assistants).find(
    (assistant: string) => assistants[assistant].openaiId === openaiId,
  );

  if (!assistantKey) {
    throw new Error('The assistant does not exist');
  }

  return assistants[assistantKey];
};

const assistants: Record<string, TAssistant> = {
  ANUZ: {
    name: 'anuz',
    discordId: 'xxx',
    fullName: 'Anuz, the Archivist',
    openaiId: 'asst_lSj2A2rbACSuayuTeSQE87Ku',
  },
  URSA: {
    name: 'ursa',
    discordId: 'xxx',
    fullName: 'Ursa, the Machine Whisperer',
    openaiId: 'asst_KBxndjT0UnOeFzlP6w8jutE7',
  },
  ANTUNJ: {
    name: 'antunj',
    discordId: 'xxx',
    fullName: 'Antunj, the Inspiration of Ideas',
    openaiId: 'asst_GcsHHr5KLLR4Xp3AHe9RxqAI',
  },
  LESATH: {
    name: 'lesath',
    discordId: 'xxx',
    fullName: 'Lesath, the Town Crier',
    openaiId: 'asst_MKPA4B4y7EX7hg2G8WBcvZcV',
  },
  KHAMBALIA: {
    name: 'khambalia',
    discordId: 'xxx',
    fullName: 'Khambalia, the Guardian of the Theasurus',
    openaiId: 'asst_1gSeW6j4cm6PrXLjlrSdgEO6',
  },
  RIMA: {
    name: 'rima',
    discordId: 'xxx',
    fullName: 'Rima, the Legal Rabbit',
    openaiId: 'asst_ewk1GHxiwLApHFrTnp4GxysB',
  },
  ARLA: {
    name: 'arla',
    discordId: 'xxx',
    fullName: 'Arla, the Pythia',
    openaiId: 'asst_IukiISal1ERxisEtjgjyYZv2',
  },
  DEDUN: {
    name: 'dedun',
    discordId: 'xxx',
    fullName: 'Dedun, the Wealth Keeper',
    openaiId: 'asst_er2VFqho8SSEqkHGX6Hd9oSj',
  },
  GUMALA: {
    name: 'gumala',
    discordId: '1235930774524661822',
    fullName: 'Gumala, the Goal Manager',
    openaiId: 'asst_W3FWQU4pAUnateGSMbbYmTgh',
  },
  SENET: {
    name: 'senet',
    discordId: '1235914200954568805',
    fullName: 'Senet, the Gambler',
    openaiId: 'asst_OellK1TR07uDJaxeipQS4Ys2',
  },
  THOTH: {
    name: 'thoth',
    discordId: '1235931418467500032',
    fullName: 'Thoth, the Modern Prometheus',
    openaiId: 'asst_L1yRBrDU3EFGdMrVsYspfeXD',
  },
  PROCYON: {
    name: 'procyon',
    discordId: '1235931275261382790',
    fullName: 'Procyon',
    openaiId: 'asst_KwCoshgx2q1xDmjNek3YFplT',
  },
  NIMROD: {
    name: 'nimrod',
    discordId: '1235931142536958014',
    fullName: 'Nimrod, the Gatekeeper',
    openaiId: 'asst_i6nbIFZnw9XEBZ9vrg2zxaUJ',
  },
  LYRA: {
    name: 'lyra',
    fullName: 'Lyra',
    discordId: '1235930909228666951',
    openaiId: 'asst_i6nbIFZnw9XEBZ9vrg2zxaUJ',
  },
  SENET_DUNGEON_WORLD_MASTER: {
    discordId: '1239273443061665883',
    name: 'senet_dungeon_world_master',
    fullName: 'Senet Dungeon World Master',
    openaiId: 'asst_2psVgXP5Qtx0EcLf34yyK2YG',
  },
  TEST: {
    fullName: 'Test',
    name: 'Test',
    discordId: '',
    openaiId: 'asst_test',
  },
};

export default assistants;
