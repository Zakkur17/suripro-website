import * as migration_20250706_021211 from './20250706_021211';
import * as migration_20250706_043457 from './20250706_043457';

export const migrations = [
  {
    up: migration_20250706_021211.up,
    down: migration_20250706_021211.down,
    name: '20250706_021211',
  },
  {
    up: migration_20250706_043457.up,
    down: migration_20250706_043457.down,
    name: '20250706_043457'
  },
];
