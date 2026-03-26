import { describe, it, expect } from 'vitest';
import { Urls } from '../data/portfolio';

describe('Urls', () => {
  const base = 'https://raw.githubusercontent.com/eduardostanisci/backup-image/master/portfoliodata/';

  it('About points to correct URL', () => {
    expect(Urls.About).toBe(`${base}about.json`);
  });

  it('Skills points to correct URL', () => {
    expect(Urls.Skills).toBe(`${base}skills.json`);
  });

  it('Biography points to correct URL', () => {
    expect(Urls.Biography).toBe(`${base}biography.json`);
  });

  it('Career points to correct URL', () => {
    expect(Urls.Career).toBe(`${base}career.json`);
  });

  it('Portfolio points to correct URL', () => {
    expect(Urls.Portfolio).toBe(`${base}portfolio.json`);
  });

  it('Lgpd points to correct URL', () => {
    expect(Urls.Lgpd).toBe(`${base}lgpd.json`);
  });
});
