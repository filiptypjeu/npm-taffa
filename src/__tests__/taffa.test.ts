import { menu, week, setTaffaURL, ITaffaMenu, TaffaLanguageEnum } from '../index';

const modMenu = (m: ITaffaMenu): ITaffaMenu => {
  m.main = m.main.split('(')[0].trim();
  m.soup = m.soup.split('(')[0].trim();
  m.salad = m.salad.split('(')[0].trim();
  m.vegetarian = m.vegetarian.split('(')[0].trim();
  m.extra = m.extra.split('(')[0].trim();
  m.alacarte = m.alacarte.split('(')[0].trim();
  return m;
};

test('menu', async () => {
  for (let i of [undefined, -1, 0, 1, 2, 3, 4, 5]) {
    expect(await menu(i)).toEqual(
      expect.objectContaining({
        date: expect.any(String),
        dayname: expect.any(String),
        main: expect.any(String),
        soup: expect.any(String),
        salad: expect.any(String),
        vegetarian: expect.any(String),
        extra: expect.any(String),
        alacarte: expect.any(String),
      }),
    );
  }
});

test('menu date', async () => {
  expect(await menu(new Date())).toEqual(
    expect.objectContaining({
      date: expect.any(String),
      dayname: expect.any(String),
      main: expect.any(String),
      soup: expect.any(String),
      salad: expect.any(String),
      vegetarian: expect.any(String),
      extra: expect.any(String),
      alacarte: expect.any(String),
    }),
  );
});

test('menu fi', async () => {
  for (let i of [undefined, -1, 0, 1, 2, 3, 4, 5]) {
    expect(await menu(i, TaffaLanguageEnum.finnish)).toEqual(
      expect.objectContaining({
        date: expect.any(String),
        dayname: expect.any(String),
        main: expect.any(String),
        soup: expect.any(String),
        salad: expect.any(String),
        vegetarian: expect.any(String),
        extra: expect.any(String),
        alacarte: expect.any(String),
      }),
    );
  }
});

test('menu date fi', async () => {
  expect(await menu(new Date(), TaffaLanguageEnum.finnish)).toEqual(
    expect.objectContaining({
      date: expect.any(String),
      dayname: expect.any(String),
      main: expect.any(String),
      soup: expect.any(String),
      salad: expect.any(String),
      vegetarian: expect.any(String),
      extra: expect.any(String),
      alacarte: expect.any(String),
    }),
  );
});

test('menu en', async () => {
  for (let i of [undefined, -1, 0, 1, 2, 3, 4, 5]) {
    expect(await menu(i, TaffaLanguageEnum.english)).toEqual(
      expect.objectContaining({
        date: expect.any(String),
        dayname: expect.any(String),
        main: expect.any(String),
        soup: expect.any(String),
        salad: expect.any(String),
        vegetarian: expect.any(String),
        extra: expect.any(String),
        alacarte: expect.any(String),
      }),
    );
  }
});

test('menu date en', async () => {
  expect(await menu(new Date(), TaffaLanguageEnum.english)).toEqual(
    expect.objectContaining({
      date: expect.any(String),
      dayname: expect.any(String),
      main: expect.any(String),
      soup: expect.any(String),
      salad: expect.any(String),
      vegetarian: expect.any(String),
      extra: expect.any(String),
      alacarte: expect.any(String),
    }),
  );
});

test('menu 5', async () => {
  expect(modMenu(await menu(5))).toEqual(modMenu(await menu(4)));
});

test('menu -1', async () => {});

test('menu 0', async () => {
  expect(modMenu(await menu(0))).toEqual(modMenu(await menu()));
});

test('menu 5 sv', async () => {
  expect(modMenu(await menu(5, TaffaLanguageEnum.swedish))).toEqual(modMenu(await menu(4, TaffaLanguageEnum.swedish)));
});

test('menu -1 sv', async () => {
  expect(modMenu(await menu(-1, TaffaLanguageEnum.swedish))).toEqual(
    modMenu(await menu(undefined, TaffaLanguageEnum.swedish)),
  );
});

test('menu 0 sv', async () => {
  expect(modMenu(await menu(0, TaffaLanguageEnum.swedish))).toEqual(
    modMenu(await menu(undefined, TaffaLanguageEnum.swedish)),
  );
});

test('menu 5 fi', async () => {
  expect(modMenu(await menu(5, TaffaLanguageEnum.finnish))).toEqual(modMenu(await menu(4, TaffaLanguageEnum.finnish)));
});

test('menu -1 fi', async () => {
  expect(modMenu(await menu(-1, TaffaLanguageEnum.finnish))).toEqual(
    modMenu(await menu(undefined, TaffaLanguageEnum.finnish)),
  );
});

test('menu 0 fi', async () => {
  expect(modMenu(await menu(0, TaffaLanguageEnum.finnish))).toEqual(
    modMenu(await menu(undefined, TaffaLanguageEnum.finnish)),
  );
});

test('menu 5 en', async () => {
  expect(modMenu(await menu(5, TaffaLanguageEnum.english))).toEqual(modMenu(await menu(4, TaffaLanguageEnum.english)));
});

test('menu -1 en', async () => {
  expect(modMenu(await menu(-1, TaffaLanguageEnum.english))).toEqual(
    modMenu(await menu(undefined, TaffaLanguageEnum.english)),
  );
});

test('menu 0 en', async () => {
  expect(modMenu(await menu(0, TaffaLanguageEnum.english))).toEqual(
    modMenu(await menu(undefined, TaffaLanguageEnum.english)),
  );
});

test('week', async () => {
  const a = await week();
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(
    expect.objectContaining({
      date: expect.any(String),
      dayname: expect.any(String),
      main: expect.any(String),
      soup: expect.any(String),
      salad: expect.any(String),
      vegetarian: expect.any(String),
      extra: expect.any(String),
      alacarte: expect.any(String),
    }),
  );
});

test('week sv', async () => {
  const a = await week(TaffaLanguageEnum.swedish);
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(
    expect.objectContaining({
      date: expect.any(String),
      dayname: expect.any(String),
      main: expect.any(String),
      soup: expect.any(String),
      salad: expect.any(String),
      vegetarian: expect.any(String),
      extra: expect.any(String),
      alacarte: expect.any(String),
    }),
  );
});

test('week fi', async () => {
  const a = await week(TaffaLanguageEnum.finnish);
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(
    expect.objectContaining({
      date: expect.any(String),
      dayname: expect.any(String),
      main: expect.any(String),
      soup: expect.any(String),
      salad: expect.any(String),
      vegetarian: expect.any(String),
      extra: expect.any(String),
      alacarte: expect.any(String),
    }),
  );
});

test('week en', async () => {
  const a = await week(TaffaLanguageEnum.english);
  expect(a).toHaveLength(5);
  expect(a[0]).toEqual(
    expect.objectContaining({
      date: expect.any(String),
      dayname: expect.any(String),
      main: expect.any(String),
      soup: expect.any(String),
      salad: expect.any(String),
      vegetarian: expect.any(String),
      extra: expect.any(String),
      alacarte: expect.any(String),
    }),
  );
});



test("setTaffaURL", async () => {
  expect(setTaffaURL("Whatever")).toEqual("Whatever");
});
