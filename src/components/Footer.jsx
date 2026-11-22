export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-gray-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white text-lg">
                🏗️
              </span>
              <span className="text-2xl font-black text-white tracking-tight">BudMaster</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Kompleksowe zaopatrzenie inwestycji budowlanych, remontowych oraz ogrodowych z bezpośrednią dostawą na plac budowy.
            </p>
          </div>

          {/* Contact */}
          <section>
            <header className="mb-4 text-base tracking-wider uppercase font-bold text-white">
              <h3 className="text-gray-100">Kontakt:</h3>
            </header>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li className="font-semibold text-gray-200">BudMaster Sp. z o.o.</li>
              <li>+48 512 345 678</li>
              <li>kontakt@budmaster.pl</li>
              <li>ul. Budowlana 15, Warszawa</li>
            </ul>
          </section>

          {/* Social Media */}
          <section>
            <header className="mb-4 text-base tracking-wider uppercase font-bold text-white">
              <h3 className="text-gray-100">Social Media:</h3>
            </header>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href="#instagram" className="text-orange-400 hover:text-orange-300 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#facebook" className="text-orange-400 hover:text-orange-300 transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#youtube" className="text-orange-400 hover:text-orange-300 transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#linkedin" className="text-orange-400 hover:text-orange-300 transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </section>

          {/* Information */}
          <section>
            <header className="mb-4 text-base tracking-wider uppercase font-bold text-white">
              <h3 className="text-gray-100">Informacje:</h3>
            </header>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Regulamin</li>
              <li className="hover:text-white cursor-pointer transition-colors">Polityka prywatności</li>
              <li className="hover:text-white cursor-pointer transition-colors">Reklamacje i zwroty</li>
              <li className="font-bold text-gray-500 pt-2 border-t border-slate-800">© 2026 BudMaster</li>
            </ul>
          </section>
        </div>
      </div>
    </footer>
  )
}
