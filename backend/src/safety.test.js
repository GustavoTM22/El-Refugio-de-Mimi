import test from 'node:test';
import assert from 'node:assert/strict';
import { hasDirectCrisisLanguage } from './safety.js';

test('detecta lenguaje de crisis directo', () => {
  assert.equal(hasDirectCrisisLanguage('ya no quiero vivir'), true);
  assert.equal(hasDirectCrisisLanguage('hoy estoy triste y cansada'), false);
});
