import rp = require('request-promise');

export enum TaffaLanguageEnum {
  swedish = 'sv',
  finnish = 'fi',
  english = 'en',
}

export interface ITaffaMenu {
  date: string;
  dayname: string;
  main: string;
  soup: string;
  salad: string;
  vegetarian: string;
  extra: string;
  alacarte: string;
}

let taffaBaseURL: string = 'http://api.tf.fi/taffa/';

export const setTaffaURL = (url: string) => taffaBaseURL = url;

export const menu = async (date?: Date | number, language?: TaffaLanguageEnum): Promise<ITaffaMenu> => {
  let day = '0';

  if (typeof date === 'number') {
    day = Math.min(Math.max(date, 0), 4).toString();
  } else if (date) {
    day = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  return rp(`${taffaBaseURL}/${language ? language : TaffaLanguageEnum.swedish}/json/${day}/`)
    .then((body: string) => {
      const m: ITaffaMenu = JSON.parse(body);
      return m;
    })
    .catch(e => {
      return Promise.reject(e);
    });
};

export const week = async (language?: TaffaLanguageEnum): Promise<ITaffaMenu[]> => {
  return rp(`${taffaBaseURL}/${language ? language : TaffaLanguageEnum.swedish}/json/week/`)
    .then((body: string) => {
      const a: ITaffaMenu[] = JSON.parse(body);
      return a;
    })
    .catch(e => {
      return Promise.reject(e);
    });
};
