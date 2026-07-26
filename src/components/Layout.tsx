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

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const isHomePage = location.pathname === '/';
  const showHeader = !isHomePage || introFinished;

  const socialLinks = [
    { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com' },
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

      {/* Language Switcher Pill */}
      <div 
        className="lang-switcher-pill"
        style={{
          position: 'fixed',
          top: '25px',
          right: '110px',
          zIndex: 100,
          display: showHeader ? 'flex' : 'none',
          alignItems: 'center',
          background: 'rgba(12, 12, 18, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '24px',
          padding: '4px 6px',
          gap: '4px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          fontSize: '11px',
          fontFamily: 'var(--font-heading, sans-serif)',
          fontWeight: '700',
          letterSpacing: '1px'
        }}
      >
        <button
          onClick={() => setLanguage('en')}
          style={{
            padding: '5px 12px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            background: language === 'en' ? 'var(--accent-color, #00ccff)' : 'transparent',
            color: language === 'en' ? '#000' : '#888',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: '800',
            boxShadow: language === 'en' ? '0 0 10px rgba(0, 204, 255, 0.4)' : 'none'
          }}
          aria-label="Switch language to English"
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('hi')}
          style={{
            padding: '5px 12px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            background: language === 'hi' ? 'var(--accent-color, #00ccff)' : 'transparent',
            color: language === 'hi' ? '#000' : '#888',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: '800',
            boxShadow: language === 'hi' ? '0 0 10px rgba(0, 204, 255, 0.4)' : 'none'
          }}
          aria-label="हिन्दी भाषा चुनें"
        >
          हिन्दी
        </button>
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
            { label: t('nav.led_tv'), ariaLabel: 'Shop TVs', link: '/led-tv' },
            { label: t('nav.accessories'), ariaLabel: 'Shop accessories', link: '/accessories' },
            { label: t('nav.cart'), ariaLabel: 'View cart', link: '/checkout' },
            { label: t('nav.account'), ariaLabel: 'Manage account', link: '/account' },
          ]}
          socialItems={[
            { label: 'Twitter', link: 'https://twitter.com' },
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
          <h2 className="footer-logo font-heading">TSS</h2>
          <p className="text-muted" style={{ fontSize: '12px', lineHeight: '1.6' }}>
            {t('footer.desc')}
          </p>
          <div className="footer-social-links">
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
        <div className="footer-col newsletter">
          <h4>{t('footer.stay_updated')}</h4>
          <div style={{ marginBottom: '15px' }}>
            <FloatingInput label={t('footer.email_placeholder')} required type="email" bgContext="#111" />
          </div>
          <button className="btn-solid" style={{ width: '100%' }}>{t('footer.subscribe')}</button>
        </div>
      </footer>
    </div>
  );
}
