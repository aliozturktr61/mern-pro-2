import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 mt-10">
      <div className="container mx-auto px-4">
        {/* Üst Kısım */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Müşteri Hizmetleri */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Müşteri Hizmetleri</h4>
            <ul className="text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">Yardım Merkezi</li>
              <li className="hover:text-white cursor-pointer">Sipariş Takibi</li>
              <li className="hover:text-white cursor-pointer">İade ve Değişim</li>
              <li className="hover:text-white cursor-pointer">Kargo Bilgileri</li>
              <li className="hover:text-white cursor-pointer">İletişim</li>
            </ul>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Hızlı Bağlantılar</h4>
            <ul className="text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">Yeni Gelenler</li>
              <li className="hover:text-white cursor-pointer">Popüler Ürünler</li>
              <li className="hover:text-white cursor-pointer">İndirimli Ürünler</li>
              <li className="hover:text-white cursor-pointer">Kadın Giyim</li>
              <li className="hover:text-white cursor-pointer">Erkek Giyim</li>
            </ul>
          </div>

          {/* Sosyal Medya ve Ödeme Yöntemleri */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-3">Bizi Takip Edin</h4>
            <div className="flex gap-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-xl hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-xl hover:text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-xl hover:text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-xl hover:text-white" />
              </a>
            </div>

            <h4 className="text-lg font-semibold mb-3">Ödeme Yöntemleri</h4>
            <div className="flex gap-4">
              <SiVisa className="text-3xl" />
              <SiMastercard className="text-3xl" />
              <SiPaypal className="text-3xl" />
            </div>
          </div>

          {/* Bilgilendirme */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Bilgilendirme</h4>
            <ul className="text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">Gizlilik Politikası</li>
              <li className="hover:text-white cursor-pointer">Kullanım Koşulları</li>
              <li className="hover:text-white cursor-pointer">Çerez Politikası</li>
              <li className="hover:text-white cursor-pointer">Yasal Uyarı</li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
          <p className="text-sm">&copy; 2024 E-Ticaret Siteniz. Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
