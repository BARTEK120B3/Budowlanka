import { describe, it, expect } from 'vitest'
import { products, categories, reviews, configuratorCategories, configuratorProducts } from '../data/products'

describe('products data', () => {
  it('zawiera 20 produktów', () => {
    expect(products).toHaveLength(20)
  })

  it('każdy produkt posiada wymagane pola', () => {
    products.forEach((p) => {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('name')
      expect(p).toHaveProperty('description')
      expect(p).toHaveProperty('price')
      expect(p).toHaveProperty('image')
      expect(p).toHaveProperty('categoryId')
      expect(typeof p.id).toBe('number')
      expect(typeof p.name).toBe('string')
      expect(typeof p.price).toBe('number')
      expect(p.price).toBeGreaterThan(0)
    })
  })

  it('każdy produkt ma istniejącą kategorię', () => {
    const catIds = categories.map((c) => c.id)
    products.forEach((p) => {
      expect(catIds).toContain(p.categoryId)
    })
  })

  it('id produktów są unikalne', () => {
    const ids = products.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('categories data', () => {
  it('zawiera 6 kategorii', () => {
    expect(categories).toHaveLength(6)
  })

  it('każda kategoria posiada id, name, description', () => {
    categories.forEach((c) => {
      expect(c).toHaveProperty('id')
      expect(c).toHaveProperty('name')
      expect(c).toHaveProperty('description')
    })
  })
})

describe('reviews data', () => {
  it('zawiera co najmniej 1 opinię', () => {
    expect(reviews.length).toBeGreaterThan(0)
  })

  it('każda opinia odwołuje się do istniejącego produktu', () => {
    const prodIds = products.map((p) => p.id)
    reviews.forEach((r) => {
      expect(prodIds).toContain(r.productId)
    })
  })
})

describe('configurator data', () => {
  it('zawiera 5 kategorii konfiguratora', () => {
    expect(configuratorCategories).toHaveLength(5)
  })

  it('każdy produkt konfiguratora ma istniejącą kategorię', () => {
    const catIds = configuratorCategories.map((c) => c.id)
    configuratorProducts.forEach((p) => {
      expect(catIds).toContain(p.categoryId)
    })
  })

  it('każda kategoria konfiguratora ma co najmniej 2 produkty', () => {
    configuratorCategories.forEach((cat) => {
      const count = configuratorProducts.filter((p) => p.categoryId === cat.id).length
      expect(count).toBeGreaterThanOrEqual(2)
    })
  })
})
