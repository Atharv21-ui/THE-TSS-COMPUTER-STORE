import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ShoppingBag, ArrowRight, CheckCircle2, Filter, Sparkles, Laptop, Monitor, Printer, Tv, Headphones } from 'lucide-react';
import { ExpandableCardGrid, type ProductCardData } from '../components/ExpandableCard';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { api } from '../lib/api';

const FALLBACK_ALL_PRODUCTS: ProductCardData[] = [
  // Laptops
  {
    id: 'l1',
    badge: 'GAMING',
    title: 'TSS BLADE X1',
    price: '₹1,299',
    src: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=600',
    description: 'The ultimate portable gaming powerhouse with 240Hz OLED display.',
    specs: 'Intel Core i9-13900H | RTX 4080 (150W) | 32GB DDR5 | 2TB NVMe'
  },
  {
    id: 'l2',
    badge: 'CREATORS',
    title: 'TSS STUDIO 16',
    price: '₹1,599',
    src: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600',
    description: 'Color accuracy and unmatched rendering speeds for 3D and video production.',
    specs: 'Intel i7-13700H | RTX 4070 Studio | 64GB DDR5 | 4K Mini-LED'
  },
  // Desktops
  {
    id: 'd1',
    badge: 'EXTREME',
    title: 'TSS MONOLITH RIG',
    price: '₹2,499',
    src: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=600',
    description: 'The pinnacle of desktop liquid-cooled gaming computing.',
    specs: 'Intel Core i9-14900K | RTX 4090 24GB | 128GB DDR5 | Custom Liquid Loop'
  },
  {
    id: 'd2',
    badge: 'WORKSTATION',
    title: 'TSS THREADRIPPER PRO',
    price: '₹3,299',
    src: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600',
    description: 'Professional multi-threaded compute node for AI & rendering.',
    specs: 'AMD Threadripper 7980X (64 Cores) | Dual RTX 4090 | 256GB ECC DDR5'
  },
  // Printers
  {
    id: 'p1',
    badge: 'ENTERPRISE',
    title: 'TSS LASERJET PRO 5000',
    price: '₹799',
    src: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=600',
    description: 'High-speed industrial wireless laser printer for offices.',
    specs: '60 PPM Monochrome | Dual-Tray 1100 Sheets | Auto Duplex | Secure Encryption'
  },
  {
    id: 'p2',
    badge: 'MULTIFUNCTION',
    title: 'TSS INKJET MATRIX X',
    price: '₹499',
    src: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=600',
    description: 'Vibrant photo-grade color printing with auto refill tanks.',
    specs: '4800 DPI Color | 35 PPM | Touchscreen UI | AirPrint & Wi-Fi Direct'
  },
  // LED TVs
  {
    id: 't1',
    badge: 'FLAGSHIP TV',
    title: 'TSS QUANTUM OLED 65"',
    price: '₹1,899',
    src: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600',
    description: 'Deep blacks, infinite contrast, and 144Hz VRR gaming mode.',
    specs: '65" 4K QD-OLED | 144Hz VRR | Dolby Vision IQ | 60W 4.2.2 Atmos Sound'
  },
  {
    id: 't2',
    badge: 'CINEMA',
    title: 'TSS MINI-LED VISION 75"',
    price: '₹2,299',
    src: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600',
    description: '2000 nits peak brightness cinema monster display.',
    specs: '75" 8K Mini-LED | 2000 Dimming Zones | Neural AI Processor | Google TV'
  },
  // Accessories
  {
    id: 'a1',
    badge: 'AUDIO',
    title: 'TSS APEX WIRELESS HEADSET',
    price: '₹199',
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    description: 'Active Noise Cancelling 7.1 Surround Gaming Headset.',
    specs: '50mm Planar Drivers | 60hr Battery | Dual 2.4GHz + BT 5.3'
  },
  {
    id: 'a2',
    badge: 'PERIPHERAL',
    title: 'TSS QUANTUM MECH KEYBOARD',
    price: '₹149',
    src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600',
    description: 'Custom hot-swappable optical magnetic gaming keyboard.',
    specs: '0.1mm Rapid Trigger | CNC Aluminum Case | Per-key RGB | PBT Keycaps'
  }
];

export default function RelatedProducts() {
  const { t, formatPrice } = useLanguage();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<ProductCardData[]>(FALLBACK_ALL_PRODUCTS);
  const [loading, setLoading] = useState(false);

  const addedProduct = location.state?.addedProduct;

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);

    // Set page accent color
    document.documentElement.style.setProperty('--accent-color', '#00ccff');
    document.documentElement.style.setProperty('--accent-color-rgb', '0, 204, 255');

    // Page entrance animation
    gsap.fromTo('.rp-banner', 
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    gsap.fromTo('.rp-content',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );

    // Attempt to load live products from API if server is connected
    const loadApiProducts = async () => {
      try {
        setLoading(true);
        const data = await api.get<any[]>('/products');
        if (data && data.length > 0) {
          const formatted: ProductCardData[] = data.map(p => ({
            id: p._id || p.id,
            badge: p.badge || p.category?.toUpperCase() || 'POPULAR',
            title: p.title,
            price: p.price,
            src: p.src,
            description: p.description,
            specs: Array.isArray(p.specs) ? p.specs.map((s: any) => `${s.label}: ${s.value}`).join(' | ') : (p.specs || '')
          }));
          setProducts(formatted);
        }
      } catch (err) {
        console.log('Using fallback static products for related recommendations');
      } finally {
        setLoading(false);
      }
    };

    loadApiProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    const cat = selectedCategory.toLowerCase();
    const title = p.title.toLowerCase();
    const badge = p.badge.toLowerCase();
    const specs = String(p.specs).toLowerCase();
    return title.includes(cat) || badge.includes(cat) || specs.includes(cat);
  });

  const categories = [
    { id: 'all', label: 'All Sections', icon: Sparkles },
    { id: 'laptop', label: 'Laptops', icon: Laptop },
    { id: 'desktop', label: 'Desktops', icon: Monitor },
    { id: 'printer', label: 'Printers', icon: Printer },
    { id: 'tv', label: 'LED TVs', icon: Tv },
    { id: 'audio', label: 'Accessories', icon: Headphones },
  ];

  return (
    <div className="page-container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      {/* 1. SUCCESS BANNER FOR ADDED ITEM */}
      <div className="rp-banner" style={{
        background: 'linear-gradient(135deg, rgba(0, 204, 255, 0.15), rgba(18, 18, 24, 0.95))',
        border: '1px solid rgba(0, 204, 255, 0.3)',
        borderRadius: '16px',
        padding: '24px 32px',
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(0, 204, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(0, 204, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--accent-color, #00ccff)'
          }}>
            <CheckCircle2 size={32} style={{ color: 'var(--accent-color, #00ccff)' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge" style={{ background: 'var(--accent-color, #00ccff)', color: '#000', fontWeight: '800' }}>
                ADDED TO CART
              </span>
              <span style={{ color: '#aaa', fontSize: '13px' }}>{cartItems.length} items in cart</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '22px', margin: '4px 0', color: '#fff' }}>
              {addedProduct?.title || 'Selected Item Added Successfully!'}
            </h2>
            <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
              {addedProduct?.price ? `Price: ${formatPrice(addedProduct.price)} — ` : ''}
              Check out related hardware below or proceed directly to checkout.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={() => navigate('/')} 
            className="btn-outline"
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            Continue Shopping
          </button>
          <Link 
            to="/checkout"
            style={{ textDecoration: 'none' }}
          >
            <button 
              className="btn-solid"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '8px',
                background: 'var(--accent-color, #00ccff)',
                color: '#000',
                border: 'none',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(0, 204, 255, 0.4)'
              }}
            >
              <ShoppingBag size={18} />
              PROCEED TO CHECKOUT
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>

      {/* 2. SECTION HEADER & RECOMMENDATIONS */}
      <div className="rp-content">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', marginBottom: '12px', color: 'var(--accent-color, #00ccff)' }}>
            <Sparkles size={14} /> COMPLETE YOUR ECOSYSTEM
          </div>
          <h1 className="section-title font-heading" style={{ fontSize: '36px', marginBottom: '10px' }}>
            Recommended Related Items
          </h1>
          <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto', fontSize: '15px' }}>
            Explore hand-picked high-performance hardware, displays, peripherals, and server setups across all sections to complement your purchase.
          </p>
        </div>

        {/* 3. CATEGORY FILTER TABS */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '50px'
        }}>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '24px',
                  border: isSelected ? '1px solid var(--accent-color, #00ccff)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isSelected ? 'rgba(0, 204, 255, 0.15)' : 'rgba(18, 18, 24, 0.6)',
                  color: isSelected ? '#fff' : '#888',
                  fontWeight: isSelected ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isSelected ? '0 0 15px rgba(0, 204, 255, 0.25)' : 'none'
                }}
              >
                <Icon size={16} style={{ color: isSelected ? 'var(--accent-color, #00ccff)' : 'inherit' }} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 4. EXPANDABLE PRODUCT GRID */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            Loading recommended hardware...
          </div>
        ) : (
          <ExpandableCardGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
