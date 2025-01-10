export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string
) {
  const pluralize = new Intl.PluralRules('ru-RU');
  const form = pluralize.select(count);
  switch (form) {
    case 'one':
      return `${count} ${one}`;
    case 'few':
      return `${count} ${few}`;
    case 'many':
    case 'other':
      return `${count} ${many}`;
  }
}
