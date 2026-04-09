const platformNames = [
  'AuraLearn', 'Aetheric', 'Vortex', 'Lumina', 'SyncNode', 
  'Cognify', 'NexGen', 'Flux', 'Apex', 'Versa'
];

const firstNames = [
  'Alex', 'Jordan', 'Skyler', 'Casey', 'Morgan', 
  'Taylor', 'Riley', 'Avery', 'Parker', 'Quinn'
];

const lastNames = [
  'Riviera', 'Stellar', 'Void', 'Flux', 'Matrix', 
  'Zenith', 'Nova', 'Pulse', 'Cyber', 'Neon'
];

export const getRandomPlatformName = () => {
  return platformNames[Math.floor(Math.random() * platformNames.length)];
};

export const getRandomUserName = () => {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
};

export const getRandomPlaceholder = (type) => {
  if (type === 'name') return getRandomUserName();
  if (type === 'email') return `${getRandomUserName().toLowerCase().replace(' ', '.')}@example.com`;
  return '';
};
