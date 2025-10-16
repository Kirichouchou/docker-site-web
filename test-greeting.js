// Test script pour vérifier les traductions
const { TRANSLATIONS } = require('./locales/translations.ts');

console.log('Test des traductions de salutation:');
console.log('Français:', TRANSLATIONS.fr.common.greeting);
console.log('Anglais:', TRANSLATIONS.en.common.greeting);
console.log('Espagnol:', TRANSLATIONS.es.common.greeting);