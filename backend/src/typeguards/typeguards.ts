'use strict';

import { Tokens } from '../utils/utils';

export function assertIsValidTokens(tokens: any): asserts tokens is Tokens {
  if (typeof tokens !== 'object') {
    throw new Error('Type of tokens data, must be object!');
  }

  const { access, refresh } = tokens;

  if (typeof access !== 'string' || typeof refresh !== 'string') {
    throw new Error('No valid object of tokens!');
  }
}
