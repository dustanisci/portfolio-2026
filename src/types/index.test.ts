import { describe, it, expectTypeOf } from 'vitest';
import type {
  IApiAboutResponse,
  IApiSkillsItem,
  IApiSkillsResponse,
  IApiPortfolioItem,
  IApiPortfolioResponse,
  IApiLgpdPolicy,
  IApiLgpdResponse,
} from '../types';

describe('Types', () => {
  it('IApiAboutResponse has content string array', () => {
    const data: IApiAboutResponse = { content: ['Hello', 'World'] };
    expectTypeOf(data.content).toEqualTypeOf<string[]>();
  });

  it('IApiSkillsItem has title and items', () => {
    const item: IApiSkillsItem = { title: 'Frontend', items: ['React', 'Vue'] };
    expectTypeOf(item.title).toEqualTypeOf<string>();
    expectTypeOf(item.items).toEqualTypeOf<string[]>();
  });

  it('IApiSkillsResponse has skills array', () => {
    const data: IApiSkillsResponse = { skills: [{ title: 'Frontend', items: ['React'] }] };
    expectTypeOf(data.skills).toEqualTypeOf<IApiSkillsItem[]>();
  });

  it('IApiPortfolioItem has id, urlSite and galleries', () => {
    const item: IApiPortfolioItem = { id: 1, urlSite: 'https://example.com', galleries: ['img.png'] };
    expectTypeOf(item.id).toEqualTypeOf<number>();
    expectTypeOf(item.urlSite).toEqualTypeOf<string>();
    expectTypeOf(item.galleries).toEqualTypeOf<string[]>();
  });

  it('IApiPortfolioResponse has portfolio array', () => {
    const data: IApiPortfolioResponse = {
      portfolio: [{ id: 1, urlSite: 'https://example.com', galleries: [] }],
    };
    expectTypeOf(data.portfolio).toEqualTypeOf<IApiPortfolioItem[]>();
  });

  it('IApiLgpdPolicy has title and description', () => {
    const policy: IApiLgpdPolicy = { title: 'Uso de dados', description: 'Desc' };
    expectTypeOf(policy.title).toEqualTypeOf<string>();
    expectTypeOf(policy.description).toEqualTypeOf<string>();
  });

  it('IApiLgpdResponse has privacyPolicy array', () => {
    const data: IApiLgpdResponse = {
      privacyPolicy: [{ title: 'Uso de dados', description: 'Desc' }],
    };
    expectTypeOf(data.privacyPolicy).toEqualTypeOf<IApiLgpdPolicy[]>();
  });
});
