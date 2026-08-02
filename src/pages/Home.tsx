import { useState, useRef } from 'react';
import gsap from 'gsap';
import { Cpu, Monitor, Zap, Shield, Wifi, Battery } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/AnimatedButton';
import { TracingBeam } from '../components/ui/tracing-beam';
import StoreInfo from '../components/StoreInfo';
import IntroScroll from '../components/IntroScroll';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

import heroLaptopOne from '../assets/png/hero_laptop_one.png';
import heroLaptopTwo from '../assets/png/hero_laptop_two.png';
import heroKeyboard from '../assets/png/hero_keyboard.png';

type HeroProduct = {
  id: string;
  name: string;
  subtitle: string;
  hex: string;
  price: string;
  image: string;
  specs: {
    cpu: string;
    display: string;
    gpu: string;
    cooling: string;
  };
};

const heroProducts: HeroProduct[] = [
  {
    id: 'laptop-2',
    name: 'TSS Studio Pro Workstation',
    subtitle: 'TITANIUM WORKSTATION',
    hex: '#ff3300',
    price: '₹1,29,999',
    image: heroLaptopTwo,
    specs: {
      cpu: 'Intel Core i7 14th Gen',
      display: '15.6" 165Hz 4K OLED',
      gpu: 'RTX 4080 12GB TGP 150W',
      cooling: 'Dual Liquid Metal Tech'
    }
  },
  {
    id: 'laptop-1',
    name: 'TSS Blade X1 Gaming Laptop',
    subtitle: 'GAMING EDITION',
    hex: '#00ccff',
    price: '₹1,49,999',
    image: heroLaptopOne,
    specs: {
      cpu: 'Intel Core i9 14th Gen',
      display: '16" 240Hz QHD+ OLED',
      gpu: 'RTX 4090 16GB TGP 175W',
      cooling: 'Vapor Chamber Cooling'
    }
  },
  {
    id: 'keyboard-1',
    name: 'TSS Quantum Mech RGB Keyboard',
    subtitle: 'TACTICAL MECHANICAL',
    hex: '#00ff88',
    price: '₹8,999',
    image: heroKeyboard,
    specs: {
      cpu: 'Hot-Swappable Switches',
      display: 'Full RGB Per-Key Lighting',
      gpu: 'Ultra-Low Latency Wireless',
      cooling: 'Aircraft Aluminum Chassis'
    }
  }
];

export default function Home() {
  const { formatPrice, t } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [introFinished, setIntroFinished] = useState(() => {
    return sessionStorage.getItem('tss_intro_shown') === 'true';
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('tss_intro_shown', 'true');
    setIntroFinished(true);
    window.dispatchEvent(new Event('introComplete'));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const onIntroComplete = () => {
      sessionStorage.setItem('tss_intro_shown', 'true');
      setIntroFinished(true);
      window.scrollTo(0, 0);
    };
    window.addEventListener('introComplete', onIntroComplete);
    return () => window.removeEventListener('introComplete', onIntroComplete);
  }, []);

  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const activeProduct = heroProducts[activeProductIndex];

  const handleAddToCart = () => {
    const itemToAdd = {
      id: activeProduct.id,
      title: activeProduct.name,
      price: activeProduct.price,
      src: activeProduct.image
    };
    addToCart(itemToAdd);
    navigate('/related-products', { state: { addedProduct: itemToAdd } });
  };

  const handleBuyNow = () => {
    const itemToAdd = {
      id: activeProduct.id,
      title: activeProduct.name,
      price: activeProduct.price,
      src: activeProduct.image
    };
    addToCart(itemToAdd);
    navigate('/checkout');
  };
  
  const productRef = useRef<HTMLImageElement>(null);
  const handleProductChange = (index: number) => {
    if (index === activeProductIndex) return;
    
    const newProduct = heroProducts[index];
    
    gsap.to(productRef.current, {
      scale: 0.8,
      rotation: -25,
      x: -250,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      force3D: true,
      onComplete: () => {
        setActiveProductIndex(index);
        
        document.documentElement.style.setProperty('--accent-color', newProduct.hex);
        
        const r = parseInt(newProduct.hex.slice(1, 3), 16);
        const g = parseInt(newProduct.hex.slice(3, 5), 16);
        const b = parseInt(newProduct.hex.slice(5, 7), 16);
        document.documentElement.style.setProperty('--accent-color-rgb', `${r}, ${g}, ${b}`);
        
        gsap.fromTo(productRef.current, 
          { scale: 1.15, rotation: 25, x: 250, opacity: 0, force3D: true },
          { scale: 1, rotation: 0, x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', force3D: true }
        );
      }
    });

    gsap.to('.stagger-text', {
      y: 12,
      opacity: 0,
      duration: 0.2,
      stagger: 0.04,
      onComplete: () => {
        gsap.to('.stagger-text', {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.05
        });
      }
    });
  };

  return (
    <>
      {!introFinished && <IntroScroll onComplete={handleIntroComplete} />}
      
      <div 
        className="home-main-content"
        style={{
          opacity: introFinished ? 1 : 0,
          pointerEvents: introFinished ? 'auto' : 'none',
          position: introFinished ? 'relative' : 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: introFinished ? 'auto' : '100vh',
          overflow: introFinished ? 'visible' : 'hidden',
          transition: 'opacity 0.8s ease'
        }}
      >
        {/* 1. HERO SECTION (CENTER ALIGNED WITH NEW GENERATED IMAGES) */}
        <div className="hero-wrapper">
          <div style={{ height: '32px' }}></div>

          <main className="hero-section">
            <div className="bg-text font-heading">QUANTUM</div>
            
            <div className="product-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '85vw', maxWidth: '1250px', height: '680px' }}>
              <img 
                ref={productRef} 
                src={activeProduct.image} 
                alt={activeProduct.name} 
                className="product-image"
                style={{
                  width: '100%',
                  maxWidth: '1150px',
                  maxHeight: '680px',
                  objectFit: 'contain',
                  background: 'transparent',
                  mixBlendMode: 'normal',
                  filter: 'none'
                }}
              />
            </div>
            
            <div className="fg-text font-heading">
              THE TSS COMPUTER STORE
              <div className="subtitle">P e r f o r m a n c e  H a r d w a r e</div>
            </div>
          </main>

          <footer className="footer-panels">
            <div className="color-selection">
              <h3 className="choose-color">SELECT MODEL / ITEM :</h3>
              <div className="thumbnails">
                {heroProducts.map((prod, index) => (
                  <div 
                    key={prod.id} 
                    className={`thumbnail ${index === activeProductIndex ? 'active' : ''}`}
                    onClick={() => handleProductChange(index)}
                    title={prod.name}
                  >
                    <div className="thumb-laptop" style={{ borderColor: prod.hex, boxShadow: index === activeProductIndex ? `0 0 12px ${prod.hex}` : 'none', overflow: 'hidden', background: 'transparent' }}>
                      <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'transparent' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ctas" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <AnimatedButton 
                text={t('product.add_to_cart')} 
                onClick={handleAddToCart}
              />
              <AnimatedButton text="BUY NOW" className="outline-variant" onClick={handleBuyNow} />
              <div style={{
                fontSize: '11px',
                color: 'var(--accent-color)',
                border: '1px solid rgba(var(--accent-color-rgb), 0.3)',
                padding: '4px 10px',
                borderRadius: '4px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                boxShadow: '0 0 10px rgba(var(--accent-color-rgb), 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(var(--accent-color-rgb), 0.05)',
                textTransform: 'uppercase'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: 'var(--accent-color)',
                  borderRadius: '50%',
                  display: 'inline-block'
                }}></span>
                Store Pickup Available
              </div>
            </div>


          </footer>

          <div className="pagination">
            {heroProducts.map((_, index) => (
              <div 
                key={index} 
                className={`dot ${index === activeProductIndex ? 'active' : ''}`}
                onClick={() => handleProductChange(index)}
              ></div>
            ))}
          </div>
        </div>

        {/* 2. SCROLLING MARQUEE */}
        <div className="marquee-container">
          <div className="marquee-content font-heading">
            <span>THE TSS COMPUTER STORE</span>
            <span>•</span>
            <span>LAPTOPS & DESKTOPS</span>
            <span>•</span>
            <span>LED TV & MONITORS</span>
            <span>•</span>
            <span>PRINTERS & ACCESSORIES</span>
            <span>•</span>
            <span>REFURBISHED CATEGORY</span>
            <span>•</span>
            <span>THE TSS COMPUTER STORE</span>
          </div>
        </div>

        {/* 3. SCROLL TRACKED CONTENT */}
        <TracingBeam>
          {/* CATEGORIES GRID */}
          <section className="section" style={{ paddingTop: '80px' }}>
            <h2 className="section-title font-heading">Categories</h2>
            <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {[
                { title: t('nav.laptops'), link: '/laptops', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600' },
                { title: t('nav.desktops'), link: '/desktops', img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=600' },
                { title: t('nav.led_tv'), link: '/led-tv', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600' },
                { title: t('nav.accessories'), link: '/accessories', img: 'https://images.unsplash.com/photo-1527814050087-179f376dd0e7?auto=format&fit=crop&q=80&w=600' },
                { title: t('nav.refurbished'), link: '/refurbished', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600' }
              ].map((cat, i) => (
                <Link to={cat.link} key={i} className="category-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <img src={cat.img} alt={cat.title} className="category-img" />
                  <div className="category-info">
                    <h3 className="font-heading">{cat.title}</h3>
                    <p>EXPLORE RANGE</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* BENTO BOX TECH SPECS */}
          <section className="section">
            <h2 className="section-title font-heading">Engineering</h2>
            <div className="bento-grid">
              <div className="bento-item large">
                <Cpu size={48} className="bento-icon" />
                <h3 className="font-heading">Next-Gen Architecture</h3>
                <p>Powered by the latest multi-core processors. Experience unparalleled speed in rendering, compiling, and elite gaming. Built to push the boundaries of what a portable machine can do.</p>
              </div>
              <div className="bento-item">
                <Monitor size={32} className="bento-icon" />
                <h3 className="font-heading">240Hz Display</h3>
                <p>Silky smooth visuals with absolute color accuracy for creators.</p>
              </div>
              <div className="bento-item">
                <Zap size={32} className="bento-icon" />
                <h3 className="font-heading">Vapor Cooling</h3>
                <p>Advanced thermal management keeps the chassis cool under load.</p>
              </div>
              <div className="bento-item">
                <Shield size={32} className="bento-icon" />
                <h3 className="font-heading">Titanium Build</h3>
                <p>Aircraft-grade materials ensure maximum durability.</p>
              </div>
              <div className="bento-item">
                <Wifi size={32} className="bento-icon" />
                <h3 className="font-heading">Wi-Fi 7 Ready</h3>
                <p>Ultra-low latency connectivity for competitive gaming.</p>
              </div>
              <div className="bento-item">
                <Battery size={32} className="bento-icon" />
                <h3 className="font-heading">99Wh Battery</h3>
                <p>All-day performance with fast charging support.</p>
              </div>
            </div>
          </section>

          {/* STORE INFO & REVIEWS */}
          <StoreInfo />
        </TracingBeam>
      </div>
    </>
  );
}
