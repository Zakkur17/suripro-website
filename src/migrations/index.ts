import * as migration_20250706_021211 from './20250706_021211';

export const migrations = [
  {
    up: migration_20250706_021211.up,
    down: migration_20250706_021211.down,
    name: '20250706_021211'
  },
];
