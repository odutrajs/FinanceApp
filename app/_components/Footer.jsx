import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-lg font-bold mb-2">DonaGrana</h3>
          <p>© 2025 DonaGrana. Todos os direitos reservados.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Contato</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              📞 <span>(41) 99841-5276</span>
            </li>
            <li className="flex items-center gap-2">
              ✉️ <span>contato@donagrana.com</span>
            </li>
            <li className="flex items-center gap-2">
              📷 <span>@dona.grana</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Links Úteis</h3>
          <ul className="space-y-2">
            <li>
              <a href="/termos" className="hover:underline">
                Termos de uso e Política de Privacidade
              </a>
            </li>
            <li>
              <a href="/cookies" className="hover:underline">
                Política de cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
