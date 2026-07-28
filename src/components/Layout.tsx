import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';
import { GooeyInput } from './ui/gooey-input';
import FloatingInput from './FloatingInput';
import SearchModal from './SearchModal';
import { useLanguage } from '../context/LanguageContext';

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const GlobeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const WhatsappIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
);

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [footerSubmitted, setFooterSubmitted] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  
  const [introFinished, setIntroFinished] = useState(() => {
    return sessionStorage.getItem('tss_intro_shown') === 'true';
  });

  useEffect(() => {
    const handleIntroComplete = () => setIntroFinished(true);
    window.addEventListener('introComplete', handleIntroComplete);
    return () => window.removeEventListener('introComplete', handleIntroComplete);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';
  const showHeader = !isHomePage || introFinished;

  const socialLinks = [
    { name: 'Website', icon: GlobeIcon, href: 'https://tsscomputerstore.com' },
    { name: 'WhatsApp Help', icon: WhatsappIcon, href: 'https://wa.me/917317605285' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com' },
    { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com' },
  ];

  return (
    <div className="app-container">
      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global deep-space vector canvas */}
      <div className="vector-lines"></div>

      {/* Global Search Bar */}
      <div 
        onClick={() => setIsSearchOpen(true)}
        style={{ position: 'fixed', top: '25px', left: '40px', zIndex: 100, cursor: 'pointer', display: showHeader ? 'block' : 'none' }}
      >
        <GooeyInput placeholder={t('search.placeholder')} />
      </div>

      {/* Global Navigation - Staggered Menu */}
      <div style={{ display: showHeader ? 'block' : 'none' }}>
        <StaggeredMenu
          position="right"
          isFixed={true}
          onLogoClick={() => setIsSearchOpen(true)}
          items={[
            { label: t('nav.home'), ariaLabel: 'Go to home', link: '/' },
            { label: t('nav.laptops'), ariaLabel: 'Shop laptops', link: '/laptops' },
            { label: t('nav.desktops'), ariaLabel: 'Shop desktops', link: '/desktops' },
            { label: t('nav.printers'), ariaLabel: 'Shop printers', link: '/printers' },
            { label: t('nav.led_tv'), ariaLabel: 'Shop TVs & Monitors', link: '/led-tv' },
            { label: t('nav.accessories'), ariaLabel: 'Shop accessories', link: '/accessories' },
            { label: t('nav.refurbished'), ariaLabel: 'Shop refurbished items', link: '/refurbished' },
            { label: t('nav.cart'), ariaLabel: 'View cart', link: '/checkout' },
            { label: t('nav.account'), ariaLabel: 'Manage account', link: '/account' },
          ]}
          socialItems={[
            { label: 'Website', link: 'https://tsscomputerstore.com' },
            { label: 'WhatsApp Direct', link: 'https://wa.me/917317605285' },
            { label: 'Instagram', link: 'https://instagram.com' },
            { label: 'YouTube', link: 'https://youtube.com' }
          ]}
          colors={['#111', '#222']}
          accentColor="var(--accent-color)"
          menuButtonColor="#fff"
          openMenuButtonColor="var(--accent-color)"
        />
      </div>

      {/* Dynamic Page Content */}
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="footer">
        <div className="footer-col">
          <h2 className="footer-logo font-heading" style={{ fontSize: '1.4rem' }}>THE TSS COMPUTER STORE</h2>
          <p className="text-muted" style={{ fontSize: '12px', lineHeight: '1.6' }}>
            {t('footer.desc')}
          </p>
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#aaa', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div><strong>Support Hotline:</strong> +91 7317605285</div>
            <div><strong>Sales & AMC Help:</strong> +91 9795535285</div>
          </div>
          <div className="footer-social-links" style={{ marginTop: '16px' }}>
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label={item.name}
                  title={item.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
        <div className="footer-col" style={{ display: 'flex', gap: '60px' }}>
          <div>
            <h4>{t('footer.products')}</h4>
            <ul>
              <li><NavLink to="/laptops">{t('nav.laptops')}</NavLink></li>
              <li><NavLink to="/desktops">{t('nav.desktops')}</NavLink></li>
              <li><NavLink to="/printers">{t('nav.printers')}</NavLink></li>
              <li><NavLink to="/led-tv">{t('nav.led_tv')}</NavLink></li>
              <li><NavLink to="/refurbished">{t('nav.refurbished')}</NavLink></li>
            </ul>
          </div>
          <div>
            <h4>{t('footer.support')}</h4>
            <ul>
              <li><NavLink to="/contact">{t('footer.contact')}</NavLink></li>
              <li><NavLink to="/warranty">{t('footer.warranty')}</NavLink></li>
              <li><NavLink to="/downloads">{t('footer.downloads')}</NavLink></li>
              <li><NavLink to="/faq">{t('footer.faq')}</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="footer-col newsletter" style={{ minWidth: '320px', flex: '1.2' }}>
          <h4 style={{ color: 'var(--accent-color, #00ccff)', fontSize: '1.1rem', letterSpacing: '2px', marginBottom: '15px' }}>
            CUSTOMER CONTACT FORM
          </h4>
          {footerSubmitted ? (
            <div style={{ padding: '20px', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid #00ff88', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ color: '#00ff88', fontWeight: 'bold', marginBottom: '6px' }}>✓ INQUIRY SENT SUCCESSFULLY</div>
              <div style={{ fontSize: '12px', color: '#ccc' }}>Our team will contact you shortly. Thank you!</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setFooterSubmitted(true); setTimeout(() => setFooterSubmitted(false), 4000); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <FloatingInput label="Full Name *" required type="text" bgContext="#111" />
                <FloatingInput label="Phone / WhatsApp *" required type="tel" bgContext="#111" />
              </div>
              <FloatingInput label="Email Address" type="email" bgContext="#111" />
              <select style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
                <option value="Laptop">Laptop Inquiry (लैपटॉप)</option>
                <option value="Desktop">Desktop Inquiry (डेस्कटॉप)</option>
                <option value="LED TV & Monitors">LED TV & Monitors (एलईडी टीवी और मॉनिटर)</option>
                <option value="Printer">Printer Inquiry (प्रिंटर)</option>
                <option value="Accessories">Accessories Inquiry (एक्सेसरीज)</option>
                <option value="Refurbished Items">Refurbished Items (रिफर्बिश्ड आइटम्स)</option>
                <option value="Sales & AMC Plan">Sales & AMC Plan (सेल और एएमसी)</option>
              </select>
              <FloatingInput label="Message / Requirement *" required isTextArea rows={3} bgContext="#111" />
              <button className="btn-solid" style={{ width: '100%', padding: '12px', marginTop: '4px', fontWeight: 'bold' }}>
                SUBMIT CUSTOMER INQUIRY
              </button>
            </form>
          )}
        </div>
      </footer>
    </div>
  );
}
