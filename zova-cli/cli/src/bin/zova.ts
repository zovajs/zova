#!/usr/bin/env node

import path from 'node:path';
import { ProcessHelper } from '@cabloy/process-helper';
import fse from 'fs-extra';
import semver from 'semver';

const pnpm_version = '10.19.0';

const processHelper = new ProcessHelper(process.cwd());

checkPnpm().then(() => {
  main();
});

async function checkPnpm() {
  const res = await processHelper.spawnCmd({
    cmd: 'pnpm',
    args: ['--version'],
    options: {
      stdio: 'pipe',
      shell: true,
      dummy: true,
    },
  });
  const version = res.trimEnd();
  const lt = semver.lt(version, pnpm_version);
  if (lt) {
    throw new Error(`pnpm should >= ${pnpm_version}, current: ${version}`);
  }
}

function main() {
  let args: string[] = [];
  // bootstrapFile
  let bootstrapFile = path.join(import.meta.dirname, '../bootstrap.ts');
  if (!fse.existsSync(bootstrapFile)) {
    bootstrapFile = path.join(import.meta.dirname, '../bootstrap.js');
  }
  args.push(bootstrapFile);
  const rawArgv = process.argv.slice(2);
  args = args.concat(rawArgv);

  processHelper.spawnCmd({ cmd: 'tsx', args });
}
