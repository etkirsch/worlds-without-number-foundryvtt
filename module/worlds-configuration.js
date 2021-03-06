export const WorldsAttributes = [
  {
    name: 'strength',
    description: '',
  }, {
    name: 'dexterity',
    description: '',
  }, {
    name: 'constitution',
    description: '',
  }, {
    name: 'intelligence',
    description: '',
  }, {
    name: 'wisdom',
    description: '',
  }, {
    name: 'charisma',
    description: '',
  },
];

export const WorldsSkills = {
  'administer': {
    name: 'Administer',
    description: '',
    relevantAttributes: [
      'intelligence',
      'wisdom',
      'charisma',
    ],
  },
  'connect': {
    name: 'Connect',
    description: '',
    relevantAttributes: [
      'wisdom',
      'charisma',
    ],
  },
  'convince': {
    name: 'Convince',
    description: '',
    relevantAttributes: [
      'strength',
      'charisma',
    ],
  },
  'craft': {
    name: 'Craft',
    description: '',
    relevantAttributes: [
      'strength',
      'dexterity',
      'intelligence',
      'wisdom',
    ],
  },
  'exert': {
    name: 'Exert',
    description: '',
    relevantAttributes: [
      'strength',
      'constitution',
    ],
  },
  'heal': {
    name: 'Heal',
    description: '',
    relevantAttributes: [
      'intelligence',
      'wisdom',
    ],
  },
  'know': {
    name: 'Know',
    description: '',
    relevantAttributes: [
      'intelligence',
      'wisdom',
    ],
  },
  'lead': {
    name: 'Lead',
    description: '',
    relevantAttributes: [
      'wisdom',
      'charisma',
    ],
  },
  'magic': {
    name: 'Magic',
    description: '',
    relevantAttributes: [
      'intelligence',
      'wisdom',
      'charisma',
    ],
  },
};

export const WorldsConfiguration = {
  attributeConfiguration: WorldsAttributes,
  skillConfiguration: WorldsSkills,
};

