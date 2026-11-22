import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [regData, setRegData] = useState({
    name: '', surname: '', phone: '', email: '', password: '',
    city: '', street: '', age: '', gender: 'M',
  })
  const [status, setStatus] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setStatus('')
    const result = login(loginEmail, loginPassword)
    if (result.success) {
      navigate('/account')
    } else {
      setStatus(result.message)
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setStatus('')
    if (!regData.name || !regData.email || !regData.password) {
      setStatus('Wypełnij wymagane pola')
      return
    }
    const result = register(regData)
    if (result.success) {
      navigate('/account')
    } else {
      setStatus(result.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="pt-28 pb-16 flex-1 flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Login Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm flex flex-col gap-6">
              <header className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Posiadasz konto?
                </span>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">
                  Logowanie
                </h1>
              </header>

              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="loginEmail" className="block text-sm font-bold text-gray-700 mb-1.5">
                    E-mail:
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all text-gray-800"
                    placeholder="twoj.email@domena.pl"
                    type="email"
                    id="loginEmail"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    data-testid="login-email"
                  />
                </div>

                <div>
                  <label htmlFor="loginPassword" className="block text-sm font-bold text-gray-700 mb-1.5">
                    Hasło:
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all text-gray-800"
                    placeholder="••••••••"
                    type="password"
                    id="loginPassword"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    data-testid="login-password"
                  />
                </div>

                {status && <p className="text-red-600 text-sm font-semibold">{status}</p>}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md hover:shadow-orange-600/30 transition-all text-base mt-2"
                  data-testid="login-submit"
                >
                  Zaloguj
                </button>
              </form>
            </div>

            {/* Registration Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm flex flex-col gap-6">
              <header className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Nowy klient
                </span>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">
                  Rejestracja
                </h1>
              </header>

              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="regName" className="block text-xs font-bold text-gray-700 mb-1">
                      Imię:
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      placeholder="Jan"
                      type="text"
                      id="regName"
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                      data-testid="reg-name"
                    />
                  </div>

                  <div>
                    <label htmlFor="regSurname" className="block text-xs font-bold text-gray-700 mb-1">
                      Nazwisko:
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      placeholder="Kowalski"
                      type="text"
                      id="regSurname"
                      value={regData.surname}
                      onChange={(e) => setRegData({ ...regData, surname: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="regPhone" className="block text-xs font-bold text-gray-700 mb-1">
                      Telefon:
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      placeholder="+48 500 000 000"
                      type="tel"
                      id="regPhone"
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="regEmail" className="block text-xs font-bold text-gray-700 mb-1">
                      E-mail:
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      placeholder="jan@budowlany.pl"
                      type="email"
                      id="regEmail"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      data-testid="reg-email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="regPassword" className="block text-xs font-bold text-gray-700 mb-1">
                    Hasło:
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                    placeholder="Min. 8 znaków"
                    type="password"
                    id="regPassword"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    data-testid="reg-password"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="regCity" className="block text-xs font-bold text-gray-700 mb-1">
                      Miasto:
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      placeholder="Warszawa"
                      type="text"
                      id="regCity"
                      value={regData.city}
                      onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="regStreet" className="block text-xs font-bold text-gray-700 mb-1">
                      Ulica:
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      placeholder="Budowlana 1"
                      type="text"
                      id="regStreet"
                      value={regData.street}
                      onChange={(e) => setRegData({ ...regData, street: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label htmlFor="regAge" className="block text-xs font-bold text-gray-700 mb-1">
                      Wiek:
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      type="number"
                      id="regAge"
                      min="0"
                      max="120"
                      value={regData.age}
                      onChange={(e) => setRegData({ ...regData, age: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Płeć:</label>
                    <div className="flex gap-4 items-center pt-2">
                      <label htmlFor="genderM" className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                        <input
                          type="radio"
                          id="genderM"
                          name="gender"
                          value="M"
                          checked={regData.gender === 'M'}
                          onChange={(e) => setRegData({ ...regData, gender: e.target.value })}
                        />
                        Mężczyzna
                      </label>
                      <label htmlFor="genderF" className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                        <input
                          type="radio"
                          id="genderF"
                          name="gender"
                          value="K"
                          checked={regData.gender === 'K'}
                          onChange={(e) => setRegData({ ...regData, gender: e.target.value })}
                        />
                        Kobieta
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md hover:shadow-orange-600/30 transition-all text-base mt-3"
                  data-testid="reg-submit"
                >
                  Zarejestruj
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
