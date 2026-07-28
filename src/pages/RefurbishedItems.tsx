import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Laptop, Monitor, Printer, Headphones, RefreshCw, ShieldCheck, CheckCircle } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface RefurbishedProduct {
  id: string;
  title: string;
  category: 'laptop' | 'desktop' | 'printer' | 'accessory' | 'refurbished';
  price: string;
  originalPrice: string;
  condition: string;
  warranty: string;
  specs: string[];
  image: string;
}

const refurbishedProducts: RefurbishedProduct[] = [
  {
    id: 'ref-laptop-01',
    title: 'TSS Refurbished ThinkPad X1 Carbon Gen 9',
    category: 'laptop',
    price: '₹42,999',
    originalPrice: '₹1,25,000',
    condition: 'Refurbished Grade A+',
    warranty: '6 Months TSS Store Warranty',
    specs: ['Intel Core i7 11th Gen', '16GB LPDDR4X RAM', '512GB NVMe SSD', '14" FHD IPS Display'],
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ref-desktop-01',
    title: 'TSS Refurbished HP EliteDesk 800 G5 Mini Tower',
    category: 'desktop',
    price: '₹28,500',
    originalPrice: '₹75,000',
    condition: 'Refurbished Grade A',
    warranty: '6 Months TSS Store Warranty',
    specs: ['Intel Core i5 9th Gen', '16GB DDR4 RAM', '256GB SSD + 1TB HDD', 'Intel UHD 630 Graphics'],
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ref-printer-01',
    title: 'TSS Refurbished HP LaserJet Pro M404dn Printer',
    category: 'printer',
    price: '₹12,999',
    originalPrice: '₹32,000',
    condition: 'Certified Refurbished',
    warranty: '6 Months Authorised Service Center',
    specs: ['Automatic Duplex Printing', '40 ppm Print Speed', 'Ethernet & USB Connectivity', 'Heavy Duty Toner Drum'],
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ref-acc-01',
    title: 'TSS Refurbished Dell UltraSharp 27" 4K Monitor (U2720Q)',
    category: 'accessory',
    price: '₹21,999',
    originalPrice: '₹55,000',
    condition: 'Grade A+ Panel (Zero Dead Pixels)',
    warranty: '6 Months TSS Warranty',
    specs: ['27" 4K UHD IPS Panel', '95% DCI-P3 Color Spectrum', 'USB-C 90W Power Delivery', 'Adjustable Ergonomic Stand'],
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ref-laptop-02',
    title: 'TSS Refurbished Dell Latitude 5420 Workstation',
    category: 'laptop',
    price: '₹36,999',
    originalPrice: '₹98,000',
    condition: 'Refurbished Grade A+',
    warranty: '6 Months Store Warranty',
    specs: ['Intel Core i5 11th Gen', '16GB RAM', '512GB NVMe SSD', 'Backlit Keyboard'],
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ref-printer-02',
    title: 'TSS Refurbished Canon ImageCLASS MF244dw Multi-function',
    category: 'printer',
    price: '₹15,499',
    originalPrice: '₹38,000',
    condition: 'Refurbished Grade A',
    warranty: '6 Months TSS Warranty',
    specs: ['Print, Scan, Copy', 'Wi-Fi & Auto Duplex', 'High Yield Cartridge', 'Compact Office Design'],
    image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=800'
  }
];

export default function RefurbishedItems() {
  const { t, formatPrice } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Set cyan neon theme accent
    document.documentElement.style.setProperty('--accent-color', '#00e5ff');
    document.documentElement.style.setProperty('--accent-color-rgb', '0, 229, 255');

    gsap.fromTo('.page-header', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo('.refurbished-card', 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  const filteredProducts = filter === 'all' 
    ? refurbishedProducts 
    : refurbishedProducts.filter(p => p.category === filter);

  const handleAddToCart = (product: RefurbishedProduct) => {
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.image
    };
    addToCart(itemToAdd);
    navigate('/related-products', { state: { addedProduct: itemToAdd } });
  };

  const handleBuyNow = (product: RefurbishedProduct) => {
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.image
    };
    addToCart(itemToAdd);
    navigate('/checkout');
  };

  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      <div className="page-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '20px', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', color: 'var(--accent-color)', marginBottom: '15px' }}>
          <RefreshCw size={14} className="animate-spin-slow" /> CERTIFIED TESTED HARDWARE
        </div>
        <h1 className="font-heading" style={{ fontSize: '3.5rem', textTransform: 'uppercase' }}>
          {t('page.refurbished.title')}
        </h1>
        <p className="text-muted" style={{ maxWidth: '680px', marginTop: '16px', lineHeight: '1.6' }}>
          जहाँ पर लैपटॉप \ डेस्कटॉप \ Accessories \ Printer \ Certified Refurbished Items बेहतरीन कंडीशन और 6 महीने की वारंटी के साथ उपलब्ध हैं!
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '40px', marginBottom: '40px' }}>
        {[
          { id: 'all', label: 'All Refurbished Items', icon: RefreshCw },
          { id: 'laptop', label: 'Refurbished Laptops (लैपटॉप)', icon: Laptop },
          { id: 'desktop', label: 'Refurbished Desktops (डेस्कटॉप)', icon: Monitor },
          { id: 'printer', label: 'Refurbished Printers (प्रिंटर)', icon: Printer },
          { id: 'accessory', label: 'Accessories & Monitors', icon: Headphones },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: isActive ? '1px solid var(--accent-color)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: isActive ? 'rgba(0, 229, 255, 0.15)' : 'rgba(15, 15, 20, 0.6)',
                color: isActive ? '#fff' : '#888',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--accent-color)' : '#888'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="refurbished-card"
            style={{
              background: 'rgba(12, 12, 18, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
          >
            {/* Image Container */}
            <div style={{ position: 'relative', width: '100%', height: '220px', background: '#08080c', overflow: 'hidden' }}>
              <img 
                src={product.image} 
                alt={product.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
              />
              <span style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--accent-color)',
                color: 'var(--accent-color)',
                fontSize: '11px',
                fontWeight: '800',
                padding: '4px 10px',
                borderRadius: '6px',
                letterSpacing: '1px'
              }}>
                {product.condition}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fff', lineHeight: '1.4' }}>
                {product.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e5ff', fontSize: '12px', fontWeight: '700', marginBottom: '16px' }}>
                <ShieldCheck size={16} />
                <span>{product.warranty}</span>
              </div>

              {/* Specs pill list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', flexGrow: 1 }}>
                {product.specs.map((spec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#aaa', fontSize: '13px' }}>
                    <CheckCircle size={14} color="#00e5ff" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Price & Actions */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#666', textDecoration: 'line-through' }}>
                    MSRP {product.originalPrice}
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-color)', fontFamily: 'var(--font-heading)' }}>
                    {formatPrice(product.price)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <AnimatedButton 
                    text={t('product.add_to_cart')} 
                    className="outline-variant"
                    onClick={() => handleAddToCart(product)} 
                  />
                  <AnimatedButton text="BUY NOW" onClick={() => handleBuyNow(product)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
