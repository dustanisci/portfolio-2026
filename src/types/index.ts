export interface IApiAboutResponse {
  content: string[];
}

export interface IApiSkillsItem {
  title: string;
  items: string[];
}

export interface IApiSkillsResponse {
  skills: IApiSkillsItem[];
}

export interface IApiPortfolioItem {
  id: number;
  urlSite: string;
  galleries: string[];
}

export interface IApiPortfolioResponse {
  portfolio: IApiPortfolioItem[];
}

export interface IApiLgpdPolicy {
  title: string;
  description: string;
}

export interface IApiLgpdResponse {
  privacyPolicy: IApiLgpdPolicy[];
}
