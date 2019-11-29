import rp = require('request-promise');

export enum TaffaLanguageEnum {
  "sv",
  "fi",
  "en",
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

const taffaBaseURL: string = 'http://api.tf.fi/taffa/';

export const menu = async (date?: Date | number, language?: keyof typeof TaffaLanguageEnum): Promise<ITaffaMenu> => {
  let day = '0';

  if (typeof date === 'number') {
    day = Math.min(Math.max(date, 0), 4).toString();
  } else if (date) {
    day = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  return rp(`${taffaBaseURL}/${language ? language : "sv"}/json/${day}/`)
    .then((body: string) => {
      const m: ITaffaMenu = JSON.parse(body);
      return m;
    })
    .catch(e => {
      return Promise.reject(e);
    });
};

export const week = async (language?: keyof typeof TaffaLanguageEnum): Promise<ITaffaMenu[]> => {
  return rp(`${taffaBaseURL}/${language ? language : "sv"}/json/week/`)
    .then((body: string) => {
      const a: ITaffaMenu[] = JSON.parse(body);
      return a;
    })
    .catch(e => {
      return Promise.reject(e);
    });
};
