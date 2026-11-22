import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

const mockProduct = {
  id: 1,
  name: 'Cement testowy',
  price: 22.5,
  image: '/img/cement.jpg',
  categoryId: 3,
}

describe('ProductCard', () => {
  it('renderuje nazwę produktu', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Cement testowy')).toBeInTheDocument()
  })

  it('renderuje cenę produktu', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/22\.50 zł/)).toBeInTheDocument()
  })

  it('renderuje link "Szczegóły"', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Szczegóły')).toBeInTheDocument()
  })

  it('renderuje przycisk konfiguratora gdy showAddToConfigurator=true', () => {
    renderWithProviders(
      <ProductCard product={mockProduct} showAddToConfigurator onAddToConfigurator={() => {}} />
    )
    expect(screen.getByText('Dodaj do konfiguratora')).toBeInTheDocument()
  })

  it('nie renderuje przycisku konfiguratora domyślnie', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.queryByText('Dodaj do konfiguratora')).not.toBeInTheDocument()
  })

  it('wyświetla ilość gdy quantity podane', () => {
    renderWithProviders(<ProductCard product={mockProduct} quantity={3} />)
    expect(screen.getByText(/3 x/)).toBeInTheDocument()
  })

  it('posiada data-testid z id produktu', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByTestId('product-card-1')).toBeInTheDocument()
  })
})
