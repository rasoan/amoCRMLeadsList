'use strict';

import * as fs from 'fs';
import * as path from 'path';

import { assertIsValidTokens } from '../typeguards/typeguards';

export interface Tokens {
  access: string;
  refresh: string;
}

const pathToFile = 'assets/tokens.json';

export function getTokensFromFile(): Tokens {
  const pathToFile_full = path.join(process.cwd(), pathToFile);

  const tokensFileJSON = fs.readFileSync(pathToFile_full, 'utf-8').toString();

  const tokensData = JSON.parse(tokensFileJSON);

  assertIsValidTokens(tokensData);

  return tokensData;
}

export function setTokensToFile(tokens: Tokens) {
  assertIsValidTokens(tokens);

  fs.writeFileSync(pathToFile, JSON.stringify(tokens));
}
