import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('budowlany_cart')
    return saved ? JSON.parse(saved) : []
  })

  const [configuratorItems, setConfiguratorItems] = useState(() => {
    const saved = localStorage.getItem('budowlany_configurator_cart')
    return saved ? JSON.parse(saved) : []
  })

  const persist = (newItems) => {
    setItems(newItems)
    localStorage.setItem('budowlany_cart', JSON.stringify(newItems))
  }

  const addToCart = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      let updated
      if (existing) {
        updated = prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      } else {
        updated = [...prev, { ...product, quantity }]
      }
      localStorage.setItem('budowlany_cart', JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== productId)
      localStorage.setItem('budowlany_cart', JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearCart = useCallback(() => {
    persist([])
    setConfiguratorItems([])
    localStorage.removeItem('budowlany_configurator_cart')
  }, [])

  const addConfiguratorToCart = useCallback((config) => {
    setConfiguratorItems((prev) => {
      const updated = [...prev, { id: Date.now(), ...config }]
      localStorage.setItem('budowlany_configurator_cart', JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeConfiguratorFromCart = useCallback((configId) => {
    setConfiguratorItems((prev) => {
      const updated = prev.filter((c) => c.id !== configId)
      localStorage.setItem('budowlany_configurator_cart', JSON.stringify(updated))
      return updated
    })
  }, [])

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0) + configuratorItems.length

  return (
    <CartContext.Provider
      value={{
        items,
        configuratorItems,
        addToCart,
        removeFromCart,
        clearCart,
        addConfiguratorToCart,
        removeConfiguratorFromCart,
        totalPrice,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
