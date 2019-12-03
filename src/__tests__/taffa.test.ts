import { menu, week, menuToString, ITaffaMenu } from '../index';

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
  day: expect.any(Number),
  main: expect.any(String),
  soup: expect.any(String),
  salad: expect.any(String),
  vegetarian: expect.any(String),
  extra: expect.any(String),
  alacarte: expect.any(String),
});

const expectMenuExtra = expect.objectContaining({
  date: expect.any(String),
  dayname: expect.any(String),
  day: expect.any(Number),
  extra: expect.any(String),
});

test('menu', async () => {
  for (let i of [undefined, -1, 2, 5, NaN]) {
    expect(await menu(i)).toEqual(expectMenu);
    expect(await menu(i, 'sv')).toEqual(expectMenu);
    expect(await menu(i, 'fi')).toEqual(expectMenu);
    expect(await menu(i, 'en')).toEqual(expectMenu);
  }
}, 10000);

test('menu date', async () => {
  const menus = [
    await menu(new Date()),
    await menu(new Date(), 'sv'),
    await menu(new Date(), 'fi'),
    await menu(new Date(), 'en'),
  ];

  menus.forEach(m => {
    if (m.extra) expect(m).toEqual(expectMenu);
    else expect(m).toEqual(expectMenuExtra);
  });
}, 10000);

test('menu 5', async () => {
  expect(modMenu(await menu(5))).toEqual(modMenu(await menu(4)));
  expect(modMenu(await menu(5, 'sv'))).toEqual(modMenu(await menu(4, 'sv')));
  expect(modMenu(await menu(5, 'fi'))).toEqual(modMenu(await menu(4, 'fi')));
  expect(modMenu(await menu(5, 'en'))).toEqual(modMenu(await menu(4, 'en')));
}, 10000);

test('menu -1', async () => {
  expect(modMenu(await menu(-1))).toEqual(modMenu(await menu()));
  expect(modMenu(await menu(-1, 'sv'))).toEqual(modMenu(await menu(undefined, 'sv')));
  expect(modMenu(await menu(-1, 'fi'))).toEqual(modMenu(await menu(undefined, 'fi')));
  expect(modMenu(await menu(-1, 'en'))).toEqual(modMenu(await menu(undefined, 'en')));
}, 10000);

test('menu 0', async () => {
  expect(modMenu(await menu(0))).toEqual(modMenu(await menu()));
  expect(modMenu(await menu(0, 'sv'))).toEqual(modMenu(await menu(undefined, 'sv')));
  expect(modMenu(await menu(0, 'fi'))).toEqual(modMenu(await menu(undefined, 'fi')));
  expect(modMenu(await menu(0, 'en'))).toEqual(modMenu(await menu(undefined, 'en')));
}, 10000);

test('week', async () => {
  const a = await week();
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(expectMenu);
}, 10000);

test('week sv', async () => {
  const a = await week('sv');
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(expectMenu);
}, 10000);

test('week fi', async () => {
  const a = await week('fi');
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(expectMenu);
}, 10000);

test('week en', async () => {
  const a = await week('en');
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(expectMenu);
}, 10000);

test('menuToString', () => {
  const m = {
    salad: 'Trädgårdsmästarens sallad (K, M, G, T, S, A, Veg)',
    extra: '',
    vegetarian: 'Grönsaksseljanka (S, A, Veg, K, M, G, T)',
    dayname: 'Onsdag',
    soup: 'Spenat-fetasås (K, L, T, A)',
    alacarte: 'A la Carte: Grillbiff (K, L, G, S)',
    date: '4.12.2019',
    main: 'Spaghetti bolognese (K, M, A)',
    day: 3,
  };

  const s =
    '\nSpaghetti bolognese (K, M, A)\nSpenat-fetasås (K, L, T, A)\nTrädgårdsmästarens sallad (K, M, G, T, S, A, Veg)\nGrönsaksseljanka (S, A, Veg, K, M, G, T)\nA la Carte: Grillbiff (K, L, G, S)';

  expect(menuToString(m)).toEqual('Onsdag 4.12.2019' + s);
  expect(menuToString(m, '<b>')).toEqual('<b>Onsdag 4.12.2019' + s);
  expect(menuToString(m, undefined, '</b>')).toEqual('Onsdag 4.12.2019</b>' + s);
  expect(menuToString(m, '<b>', '</b>')).toEqual('<b>Onsdag 4.12.2019</b>' + s);
});
