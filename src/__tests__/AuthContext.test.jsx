import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../context/AuthContext'

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('użytkownik jest niezalogowany na start', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user).toBeNull()
  })

  it('register tworzy konto i loguje', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    let res
    act(() => {
      res = result.current.register({
        name: 'Jan',
        email: 'jan@test.pl',
        password: 'haslo123',
      })
    })
    expect(res.success).toBe(true)
    expect(result.current.user).not.toBeNull()
    expect(result.current.user.name).toBe('Jan')
    expect(result.current.user.email).toBe('jan@test.pl')
  })

  it('register odrzuca duplikat emaila', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.register({ name: 'Jan', email: 'jan@test.pl', password: '123' })
    })
    act(() => {
      result.current.logout()
    })
    let res
    act(() => {
      res = result.current.register({ name: 'Jan2', email: 'jan@test.pl', password: '456' })
    })
    expect(res.success).toBe(false)
    expect(res.message).toContain('zajęty')
  })

  it('login loguje istniejącego użytkownika', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.register({ name: 'Jan', email: 'jan@test.pl', password: 'haslo123' })
    })
    act(() => {
      result.current.logout()
    })
    let res
    act(() => {
      res = result.current.login('jan@test.pl', 'haslo123')
    })
    expect(res.success).toBe(true)
    expect(result.current.user.name).toBe('Jan')
  })

  it('login odrzuca błędne hasło', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.register({ name: 'Jan', email: 'jan@test.pl', password: 'haslo123' })
    })
    act(() => {
      result.current.logout()
    })
    let res
    act(() => {
      res = result.current.login('jan@test.pl', 'zlehaslo')
    })
    expect(res.success).toBe(false)
    expect(res.message).toContain('hasło')
  })

  it('login odrzuca nieistniejący email', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    let res
    act(() => {
      res = result.current.login('brak@test.pl', 'cokolwiek')
    })
    expect(res.success).toBe(false)
    expect(res.message).toContain('użytkownika')
  })

  it('logout wylogowuje użytkownika', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.register({ name: 'Jan', email: 'jan@test.pl', password: '123' })
    })
    expect(result.current.user).not.toBeNull()
    act(() => {
      result.current.logout()
    })
    expect(result.current.user).toBeNull()
  })
})
