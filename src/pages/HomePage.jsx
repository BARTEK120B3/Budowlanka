import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,88,12,0.3),rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-6 backdrop-blur-sm">
            🏗️ Profesjonalne materiały budowlane i wykończeniowe
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight max-w-4xl">
            BudMaster
          </h2>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl font-light">
            Twój jedyny wybór w materiałach budowlanych
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/store"
              className="px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-lg hover:shadow-orange-600/30 hover:-translate-y-0.5 transition-all"
            >
              Sklep
            </Link>
            <Link
              to="/configurator"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-lg backdrop-blur-md hover:-translate-y-0.5 transition-all"
            >
              Stwórz projekt
            </Link>
          </div>
        </div>
      </main>

      {/* Configurator Banner Section */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 p-8 sm:p-12 lg:p-16 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-sm font-bold uppercase tracking-widest text-orange-200">
                Innowacja w zakupach budowlanych
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-2">
                Konfigurator domku
              </h2>
              <p className="mt-4 text-lg text-orange-100 font-medium">
                Zaprojektuj swój domek narzędziowy
              </p>
              <div className="mt-8">
                <Link
                  to="/configurator"
                  className="inline-flex items-center px-8 py-3.5 rounded-xl bg-white text-orange-700 hover:bg-orange-50 font-bold text-lg shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Konfigurator
                </Link>
              </div>
            </div>
            <div className="text-8xl sm:text-9xl p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-inner">
              🏠
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <aside className="py-20 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">
              Rekomendacje
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Opinie naszych klientów
            </h2>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-lg mb-4">
                  ★★★★★
                </div>
                <header>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Jan K.</h3>
                </header>
                <p className="text-gray-600 leading-relaxed">
                  Kupiłem wiertarkę i zestaw kluczy. Jakość rewelacyjna, przesyłka ekspresowa.
                  Obsługa klienta na najwyższym poziomie. Polecam każdemu majsterkowiczowi!
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-gray-400">Zweryfikowany zakup</span>
                <span className="font-bold text-orange-600">5/5</span>
              </div>
            </article>

            <article className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-lg mb-4">
                  ★★★★★
                </div>
                <header>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Anna M.</h3>
                </header>
                <p className="text-gray-600 leading-relaxed">
                  Zamówiłam farby i materiały do remontu łazienki. Wszystko zgodne z opisem,
                  ceny konkurencyjne. Konfigurator domku to genialne narzędzie!
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-gray-400">Zweryfikowany zakup</span>
                <span className="font-bold text-orange-600">5/5</span>
              </div>
            </article>

            <article className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-lg mb-4">
                  ★★★★★
                </div>
                <header>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Piotr W.</h3>
                </header>
                <p className="text-gray-600 leading-relaxed">
                  Profesjonalny sklep z materiałami budowlanymi. Szeroki asortyment, szybka
                  realizacja zamówień. Cement i kleje najlepszej jakości.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-gray-400">Zweryfikowany zakup</span>
                <span className="font-bold text-orange-600">5/5</span>
              </div>
            </article>
          </section>
        </div>
      </aside>

      <Footer />
    </div>
  )
}
