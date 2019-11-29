import { menu, week, ITaffaMenu } from '../index';

const modMenu = (m: ITaffaMenu): ITaffaMenu => {
  m.main = m.main.split('(')[0].trim();
  m.soup = m.soup.split('(')[0].trim();
  m.salad = m.salad.split('(')[0].trim();
  m.vegetarian = m.vegetarian.split('(')[0].trim();
  m.extra = m.extra.split('(')[0].trim();
  m.alacarte = m.alacarte.split('(')[0].trim();
  return m;
};

const expectMenu = expect.objectContaining({
  date: expect.any(String),
  dayname: expect.any(String),
  main: expect.any(String),
  soup: expect.any(String),
  salad: expect.any(String),
  vegetarian: expect.any(String),
  extra: expect.any(String),
  alacarte: expect.any(String),
});

test('menu', async () => {
  for (let i of [undefined, -1, 0, 1, 2, 3, 4, 5]) {
    expect(await menu(i)).toEqual(expectMenu);
    expect(await menu(i, 'sv')).toEqual(expectMenu);
    expect(await menu(i, 'fi')).toEqual(expectMenu);
    expect(await menu(i, 'en')).toEqual(expectMenu);
  }
});

test('menu date', async () => {
  expect(await menu(new Date())).toEqual(expectMenu);
  expect(await menu(new Date(), 'sv')).toEqual(expectMenu);
  expect(await menu(new Date(), 'fi')).toEqual(expectMenu);
  expect(await menu(new Date(), 'en')).toEqual(expectMenu);
});

test('menu 5', async () => {
  expect(modMenu(await menu(5))).toEqual(modMenu(await menu(4)));
  expect(modMenu(await menu(5, 'sv'))).toEqual(modMenu(await menu(4, 'sv')));
  expect(modMenu(await menu(5, 'fi'))).toEqual(modMenu(await menu(4, 'fi')));
  expect(modMenu(await menu(5, 'en'))).toEqual(modMenu(await menu(4, 'en')));
});

test('menu -1', async () => {
  expect(modMenu(await menu(-1))).toEqual(modMenu(await menu()));
  expect(modMenu(await menu(-1, 'sv'))).toEqual(modMenu(await menu(undefined, 'sv')));
  expect(modMenu(await menu(-1, 'fi'))).toEqual(modMenu(await menu(undefined, 'fi')));
  expect(modMenu(await menu(-1, 'en'))).toEqual(modMenu(await menu(undefined, 'en')));
});

test('menu 0', async () => {
  expect(modMenu(await menu(0))).toEqual(modMenu(await menu()));
  expect(modMenu(await menu(0, 'sv'))).toEqual(modMenu(await menu(undefined, 'sv')));
  expect(modMenu(await menu(0, 'fi'))).toEqual(modMenu(await menu(undefined, 'fi')));
  expect(modMenu(await menu(0, 'en'))).toEqual(modMenu(await menu(undefined, 'en')));
});

test('week', async () => {
  const a = await week();
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(expectMenu);
});

test('week sv', async () => {
  const a = await week('sv');
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(expectMenu);
});

test('week fi', async () => {
  const a = await week('fi');
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(expectMenu);
});

test('week en', async () => {
  const a = await week('en');
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(expectMenu);
});
