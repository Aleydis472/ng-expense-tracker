export const CATEGORIES = [
  { name: 'Alimentación', color: '#ff6384b0' },
  { name: 'Transporte', color: '#36A2EB' },
  { name: 'Entretenimiento', color: '#ffce56bf' },
  { name: 'Salud', color: '#4caf50a1' },
  { name: 'Educación', color: '#9c27b06b' }
];

export const CATEGORY_COLORS: { [key: string]: string } = Object.fromEntries(
  CATEGORIES.map(category => [category.name, category.color])
);
