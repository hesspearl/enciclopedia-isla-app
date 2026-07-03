import { MessageCircle, Youtube } from "lucide-react";

export default function Footer() {
  const whatsappNumber = "5511999999999";
  const whatsappMessage = encodeURIComponent(
    "Assalamu Alaikum! Gostaria de fazer parte da comunidade de novos muçulmanos.",
  );

  const socialLinks = [
    { icon: "/icons/instagram.svg", label: "Instagram", href: "#" },
    { icon: "/icons/youtube.svg", label: "YouTube", href: "#" },
  ];

  const additionalLinks = [
    { label: "Sobre Nós", href: "#" },
    { label: "Contato", href: "#" },
    { label: "Política de Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand + WhatsApp */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Enciclopédia da Luz de Allah
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Uma jornada de conhecimento sobre o Islam, feita para novos
              muçulmanos e curiosos.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Comunidade no WhatsApp
            </a>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={social.icon}
                      alt="Icon"
                      className="w-5 h-5 text-gray-300"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Additional Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Links
            </h4>
            <ul className="space-y-3">
              {additionalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Enciclopédia da Luz de Allah. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
