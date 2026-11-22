import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../context/CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

describe('Testy kontekstu koszyka (CartContext)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('koszyk jest całkowicie pusty po wejściu na stronę', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
    expect(result.current.configuratorItems).toEqual([])
    expect(result.current.totalPrice).toBe(0)
    expect(result.current.totalCount).toBe(0)
  })

  it('dodawanie produktu do koszyka (addToCart)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'Cement', price: 22.5 }, 2)
    })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.totalPrice).toBe(45)
    expect(result.current.totalCount).toBe(2)
  })

  it('zwiększanie ilości gdy dodajemy ten sam produkt kolejny raz', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'Cement', price: 22.5 }, 1)
    })
    act(() => {
      result.current.addToCart({ id: 1, name: 'Cement', price: 22.5 }, 3)
    })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(4)
  })

  it('usuwanie pojedynczego produktu z koszyka (removeFromCart)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'Cement', price: 22.5 }, 1)
      result.current.addToCart({ id: 2, name: 'Farba', price: 129.99 }, 1)
    })
    act(() => {
      result.current.removeFromCart(1)
    })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].id).toBe(2)
  })

  it('dodawanie konfiguracji domku i zliczanie jej do totalCount', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'Cement', price: 22.5 }, 2)
      result.current.addConfiguratorToCart({
        components: { 101: { name: 'Deska', price: 850 } },
        totalPrice: 2850,
      })
    })
    expect(result.current.configuratorItems).toHaveLength(1)
    expect(result.current.configuratorItems[0].totalPrice).toBe(2850)
    // 2 worki cementu + 1 domek = 3 pozycje
    expect(result.current.totalCount).toBe(3)
  })

  it('usuwanie konfiguracji domku z koszyka (removeConfiguratorFromCart)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addConfiguratorToCart({
        components: { 101: { name: 'Deska', price: 850 } },
        totalPrice: 2850,
      })
    })
    expect(result.current.configuratorItems).toHaveLength(1)
    const configId = result.current.configuratorItems[0].id

    act(() => {
      result.current.removeConfiguratorFromCart(configId)
    })
    expect(result.current.configuratorItems).toHaveLength(0)
    expect(result.current.totalCount).toBe(0)
  })

  it('czyszczenie całego koszyka (clearCart usuwa towary i konfiguracje)', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'Cement', price: 22.5 }, 5)
      result.current.addConfiguratorToCart({ components: {}, totalPrice: 2000 })
    })
    act(() => {
      result.current.clearCart()
    })
    expect(result.current.items).toEqual([])
    expect(result.current.configuratorItems).toEqual([])
    expect(result.current.totalPrice).toBe(0)
    expect(result.current.totalCount).toBe(0)
  })

  it('totalPrice dobrze sumuje ceny przy wielu produktach', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'A', price: 10 }, 2)
      result.current.addToCart({ id: 2, name: 'B', price: 25.5 }, 3)
    })
    expect(result.current.totalPrice).toBeCloseTo(96.5)
  })
})
