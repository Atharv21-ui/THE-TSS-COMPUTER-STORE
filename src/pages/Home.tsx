import { useState, useRef } from 'react';
import gsap from 'gsap';
import { Cpu, Monitor, Zap, Shield, Wifi, Battery, Send, Phone, Mail, MapPin, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/AnimatedButton';
import FloatingInput from '../components/FloatingInput';
import { TracingBeam } from '../components/ui/tracing-beam';
import StoreInfo from '../components/StoreInfo';
import IntroScroll from '../components/IntroScroll';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

import heroLaptopOne from '../assets/hero_laptop_one.png';
import heroLaptopTwo from '../assets/hero_laptop_two.png';
import heroKeyboard from '../assets/hero_keyboard.png';

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
    id: 'laptop-1',
    name: 'TSS Blade X1 Gaming Laptop',
    subtitle: 'Ultra Performance Gaming Laptop',
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
    id: 'laptop-2',
    name: 'TSS Studio Pro Workstation',
    subtitle: 'Slim Titanium Workstation Laptop',
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
    id: 'keyboard-1',
    name: 'TSS Quantum Mech RGB Keyboard',
    subtitle: 'Tactical Mechanical RGB Keyboard',
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
  const [introFinished, setIntroFinished] = useState(true);

  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const activeProduct = heroProducts[activeProductIndex];
  
  const productRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Laptop',
    message: ''
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('tss_intro_shown', 'true');
    setIntroFinished(true);
    window.dispatchEvent(new Event('introComplete'));
  };

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

  const handleProductChange = (index: number) => {
    if (index === activeProductIndex) return;
    
    const newProduct = heroProducts[index];
    
    gsap.to(productRef.current, {
      scale: 0.85,
      rotation: 15,
      x: 200,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setActiveProductIndex(index);
        
        document.documentElement.style.setProperty('--accent-color', newProduct.hex);
        
        const r = parseInt(newProduct.hex.slice(1, 3), 16);
        const g = parseInt(newProduct.hex.slice(3, 5), 16);
        const b = parseInt(newProduct.hex.slice(5, 7), 16);
        document.documentElement.style.setProperty('--accent-color-rgb', `${r}, ${g}, ${b}`);
        
        gsap.fromTo(productRef.current, 
          { scale: 1.15, rotation: -10, x: -150, opacity: 0 },
          { scale: 1, rotation: 0, x: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
        );
      }
    });

    gsap.to('.stagger-text', {
      y: 10,
      opacity: 0,
      duration: 0.2,
      stagger: 0.05,
      onComplete: () => {
        gsap.to('.stagger-text', {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.1
        });
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', email: '', category: 'Laptop', message: '' });
    }, 4000);
  };

  return (
    <>
      {!introFinished && <IntroScroll onComplete={handleIntroComplete} />}
      
      <div 
        className="home-main-content"
        style={{
          opacity: 1,
          pointerEvents: 'auto',
          position: 'relative',
          width: '100%',
          height: 'auto',
          overflow: 'visible'
        }}
      >
        {/* 1. HERO SECTION (100vh) - SPLIT LAYOUT WITH IMAGE IN RIGHT DIRECTION */}
        <div className="hero-wrapper">
          <div style={{ height: '32px' }}></div>

          <main className="hero-section hero-section-right-layout">
            <div className="bg-text font-heading">THE TSS</div>
            
            {/* Left Content Side */}
            <div className="hero-left-content">
              <div className="badge badge-accent mb-3">AUTHORIZED STORE</div>
              <h1 className="fg-text-title font-heading">
                THE TSS COMPUTER STORE
              </h1>
              <div className="subtitle-brand">P E R F O R M A N C E &nbsp; H A R D W A R E</div>
              <p className="hero-desc text-muted">
                Premium Laptops, Workstations, Desktops, LED TVs & Monitors, Enterprise Printers, Accessories & Certified Refurbished Items.
              </p>
              
              <div className="hero-ctas" style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                <AnimatedButton 
                  text={t('product.add_to_cart')} 
                  onClick={handleAddToCart}
                />
                <Link to="/checkout">
                  <AnimatedButton text="BUY NOW" className="outline-variant" />
                </Link>
              </div>
            </div>

            {/* Right Product Container (IMAGE RIGHT DIRECTION) */}
            <div className="product-container-right">
              <img 
                ref={productRef} 
                src={activeProduct.image} 
                alt={activeProduct.name} 
                className="product-image-right"
              />
            </div>
          </main>

          {/* Footer Control Panel */}
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
                    <div className="thumb-laptop" style={{ borderColor: prod.hex, boxShadow: index === activeProductIndex ? `0 0 12px ${prod.hex}` : 'none' }}>
                      <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-panel" ref={infoRef} style={{ width: '100%' }}>
              <div className="device-header stagger-text">
                <h2 className="device-name font-heading" style={{ fontSize: '1.4rem' }}>
                  {activeProduct.name} <span className="device-edition-highlight">— {activeProduct.subtitle}</span>
                </h2>
              </div>

              <div className="price-specs-row stagger-text" style={{ marginTop: '10px' }}>
                <div className="price-container">
                  <span className="price-label">PRICE</span>
                  <div className="price text-accent" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{formatPrice(activeProduct.price)}</div>
                </div>

                <div className="mini-specs-grid">
                  <div className="spec-pill">
                    <Cpu size={14} className="spec-icon" />
                    <span>{activeProduct.specs.cpu}</span>
                  </div>
                  <div className="spec-pill">
                    <Monitor size={14} className="spec-icon" />
                    <span>{activeProduct.specs.display}</span>
                  </div>
                  <div className="spec-pill">
                    <Zap size={14} className="spec-icon" />
                    <span>{activeProduct.specs.gpu}</span>
                  </div>
                  <div className="spec-pill">
                    <Shield size={14} className="spec-icon" />
                    <span>{activeProduct.specs.cooling}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pagination">
              {heroProducts.map((_, index) => (
                <div 
                  key={index} 
                  className={`dot ${index === activeProductIndex ? 'active' : ''}`}
                  onClick={() => handleProductChange(index)}
                ></div>
              ))}
            </div>
          </footer>
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
            <span>REFURBISHED ITEMS</span>
            <span>•</span>
            <span>THE TSS COMPUTER STORE</span>
          </div>
        </div>

        {/* 3. CUSTOMER CONTACT FORM (DIRECTLY BELOW HERO IMAGE) */}
        <section className="customer-contact-section" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div className="customer-contact-container" style={{
            background: 'rgba(12, 12, 18, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '50px 40px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(0, 204, 255, 0.1)', border: '1px solid rgba(0, 204, 255, 0.3)', borderRadius: '20px', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', color: 'var(--accent-color)', marginBottom: '12px' }}>
                <Send size={14} /> CUSTOMER INQUIRY & CONTACT FORM
              </div>
              <h2 className="font-heading" style={{ fontSize: '2.5rem', textTransform: 'uppercase', color: '#fff' }}>
                CUSTOMER CONTACT FORM
              </h2>
              <p style={{ color: '#aaa', maxWidth: '600px', margin: '10px auto 0', fontSize: '14px' }}>
                Have a question, custom PC build requirement, bulk purchase, or service request? Get in touch with THE TSS COMPUTER STORE team!
              </p>
            </div>

            {formSubmitted ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid #00ff88', borderRadius: '16px' }}>
                <CheckCircle2 size={48} color="#00ff88" style={{ margin: '0 auto 15px' }} />
                <h3 className="font-heading" style={{ color: '#fff', fontSize: '1.8rem' }}>THANK YOU FOR CONTACTING US!</h3>
                <p style={{ color: '#ccc', marginTop: '10px' }}>Our technical representative will call you on <strong>{formData.phone}</strong> shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <FloatingInput 
                    label="Customer Full Name *" 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                    bgContext="#0c0c12" 
                  />
                </div>
                <div>
                  <FloatingInput 
                    label="Phone / WhatsApp Number *" 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
                    bgContext="#0c0c12" 
                  />
                </div>
                <div>
                  <FloatingInput 
                    label="Email Address" 
                    type="email" 
                    value={formData.email}
                    onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                    bgContext="#0c0c12" 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', fontWeight: 'bold' }}>Product / Category Interest</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#0c0c12',
                      border: '1px solid #282835',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="Laptop">Laptop (लैपटॉप)</option>
                    <option value="Desktop">Desktop (डेस्कटॉप)</option>
                    <option value="LED TV & Monitors">LED TV & Monitors (एलईडी टीवी और मॉनिटर)</option>
                    <option value="Printer">Printer (प्रिंटर)</option>
                    <option value="Accessories">Accessories (एक्सेसरीज)</option>
                    <option value="Refurbished Items">Refurbished Items (रिफर्बिश्ड आइटम्स)</option>
                    <option value="Sales & AMC Plan">Sales & AMC Plan (सेल और एएमसी प्लान)</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FloatingInput 
                    label="Your Requirement / Message *" 
                    required 
                    isTextArea 
                    rows={4}
                    value={formData.message}
                    onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
                    bgContext="#0c0c12" 
                  />
                </div>
                <div style={{ gridColumn: '1 / -1', marginTop: '10px', textAlign: 'center' }}>
                  <button className="btn-solid" style={{ minWidth: '220px', padding: '16px 36px', fontSize: '14px', fontWeight: 'bold' }}>
                    SUBMIT INQUIRY
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* 4. SCROLL TRACKED CONTENT */}
        <TracingBeam>
          {/* CATEGORIES GRID */}
          <section className="section" style={{ paddingTop: '40px' }}>
            <h2 className="section-title font-heading">Explore Categories</h2>
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
                    <h3 className="font-heading" style={{ fontSize: '1rem' }}>{cat.title}</h3>
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
