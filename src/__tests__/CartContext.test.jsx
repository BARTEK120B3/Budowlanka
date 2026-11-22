import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../context/CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('koszyk jest pusty na start', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
    expect(result.current.totalPrice).toBe(0)
    expect(result.current.totalCount).toBe(0)
  })

  it('addToCart dodaje produkt', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'Cement', price: 22.5 }, 2)
    })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.totalPrice).toBe(45)
    expect(result.current.totalCount).toBe(2)
  })

  it('addToCart zwiększa ilość istniejącego produktu', () => {
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

  it('removeFromCart usuwa produkt', () => {
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

  it('clearCart czyści koszyk', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'Cement', price: 22.5 }, 5)
    })
    act(() => {
      result.current.clearCart()
    })
    expect(result.current.items).toEqual([])
    expect(result.current.totalPrice).toBe(0)
  })

  it('addConfiguratorToCart dodaje konfigurację', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addConfiguratorToCart({
        components: { 101: { name: 'Deska', price: 850 } },
        totalPrice: 2850,
      })
    })
    expect(result.current.configuratorItems).toHaveLength(1)
    expect(result.current.configuratorItems[0].totalPrice).toBe(2850)
  })

  it('totalPrice poprawnie sumuje wiele produktów', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart({ id: 1, name: 'A', price: 10 }, 2)
      result.current.addToCart({ id: 2, name: 'B', price: 25.5 }, 3)
    })
    expect(result.current.totalPrice).toBeCloseTo(96.5)
  })
})
