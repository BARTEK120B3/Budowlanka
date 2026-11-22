/**
 * Skrypt migracyjny mapujący dane domeny muzycznej (Semiquaver) na domenę budowlaną (BudMaster)
 * Uruchomienie: node scripts/migrate_data.js
 */

const legacyCategories = [
  { id: 1, name: 'Instrumenty klawiszowe' },
  { id: 8, name: 'Instrumenty Smyczkowe' },
  { id: 9, name: 'Instrumenty dęte' },
  { id: 10, name: 'Gitary' },
  { id: 11, name: 'Pickupy' },
  { id: 12, name: 'Akcesoria' },
  { id: 13, name: 'Struny' },
  { id: 14, name: 'Mostki' },
  { id: 15, name: 'Klucze' },
  { id: 16, name: 'Drewno' },
]

const categoryDomainMapping = {
  1: { id: 2, name: 'Elektronarzędzia' },
  8: { id: 1, name: 'Narzędzia ręczne' },
  9: { id: 4, name: 'Instalacje' },
  10: { id: 3, name: 'Materiały budowlane' },
  11: { id: 101, name: 'Konfigurator - Ściany' },
  12: { id: 5, name: 'Farby i lakiery' },
  13: { id: 102, name: 'Konfigurator - Dach' },
  14: { id: 103, name: 'Konfigurator - Podłoga' },
  15: { id: 104, name: 'Konfigurator - Drzwi' },
  16: { id: 105, name: 'Konfigurator - Okna' },
}

function migrateCategory(legacyCat) {
  const target = categoryDomainMapping[legacyCat.id]
  if (!target) throw new Error(`Brak mapowania dla kategorii: ${legacyCat.id}`)
  return {
    legacyId: legacyCat.id,
    legacyName: legacyCat.name,
    targetId: target.id,
    targetName: target.name,
    status: 'MIGRATED',
  }
}

const migrationSummary = legacyCategories.map(migrateCategory)
console.table(migrationSummary)
