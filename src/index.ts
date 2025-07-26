#!/usr/bin/env node

// Restore user's current working directory if set by wrapper script
if (process.env.USER_CWD) {
  process.chdir(process.env.USER_CWD);
}

import * as commander from 'commander';

import VERSION from './version.js';
import exportCommand from './commands/export.js';
import importCommand from './commands/import.js';

const program = new commander.Command();

program
  .description(
    'Migrate GitHub projects (https://docs.github.com/en/issues/planning-and-tracking-with-projects) between GitHub products, organizations and users',
  )
  .version(VERSION)
  .addCommand(exportCommand)
  .addCommand(importCommand);

program.parse();
