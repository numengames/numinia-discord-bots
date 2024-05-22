type TAssistant = {
  name: string;
  openaiId: string;
  discordId: string;
};

const assistants: Record<string, TAssistant> = {
  ANUZ: {
    discordId: '',
    name: 'Anuz, the Archivist',
    openaiId: 'asst_lSj2A2rbACSuayuTeSQE87Ku',
  },
  URSA: {
    discordId: '',
    name: 'Ursa, the Machine Whisperer',
    openaiId: 'asst_KBxndjT0UnOeFzlP6w8jutE7',
  },
  ANTUNJ: {
    discordId: '',
    name: 'Antunj, the Inspiration of Ideas',
    openaiId: 'asst_GcsHHr5KLLR4Xp3AHe9RxqAI',
  },
  LESATH: {
    discordId: '',
    name: 'Lesath, the Town Crier',
    openaiId: 'asst_MKPA4B4y7EX7hg2G8WBcvZcV',
  },
  KHAMBALIA: {
    discordId: '',
    name: 'Khambalia, the Guardian of the Theasurus',
    openaiId: 'asst_1gSeW6j4cm6PrXLjlrSdgEO6',
  },
  RIMA: {
    discordId: '',
    name: 'Rima, the Legal Rabbit',
    openaiId: 'asst_ewk1GHxiwLApHFrTnp4GxysB',
  },
  ARLA: {
    discordId: '',
    name: 'Arla, the Pythia',
    openaiId: 'asst_IukiISal1ERxisEtjgjyYZv2',
  },
  DEDUN: {
    discordId: '',
    name: 'Dedun, the Wealth Keeper ',
    openaiId: 'asst_er2VFqho8SSEqkHGX6Hd9oSj',
  },
  GUMALA: {
    discordId: '1235930774524661822',
    name: 'Gumala, the Goal Manager',
    openaiId: 'asst_W3FWQU4pAUnateGSMbbYmTgh',
  },
  SENET: {
    discordId: '1235914200954568805',
    name: 'Senet, the Gambler',
    openaiId: 'asst_OellK1TR07uDJaxeipQS4Ys2',
  },
  THOTH: {
    discordId: '1235931418467500032',
    name: 'Thoth, the Modern Prometheus',
    openaiId: 'asst_L1yRBrDU3EFGdMrVsYspfeXD',
  },
  PROCYON: {
    discordId: '1235931275261382790',
    name: 'Procyon',
    openaiId: 'asst_KwCoshgx2q1xDmjNek3YFplT',
  },
  NIMROD: {
    discordId: '1235931142536958014',
    name: 'Nimrod, the Gatekeeper',
    openaiId: 'asst_i6nbIFZnw9XEBZ9vrg2zxaUJ',
  },
  SENET_DUNGEON_WORLD_MASTER: {
    discordId: '1239273443061665883',
    name: 'Senet Dungeon World Master',
    openaiId: 'asst_2psVgXP5Qtx0EcLf34yyK2YG',
  },
  TEST: {
    name: 'Test',
    discordId: '',
    openaiId: 'asst_test',
  },
};

export default assistants;
