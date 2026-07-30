import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const seoData: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Technical Server Shop | Next-Gen Computing & Enterprise Hardware',
    description: 'THE TSS COMPUTER STORE - Premium laptops, desktops, LED TVs & monitors, printers, accessories, refurbished items, technical support, and sales & AMC plans in Jhansi, UP.'
  },
  '/laptops': {
    title: 'Refurbished & New Laptops | THE TSS COMPUTER STORE Jhansi',
    description: 'Browse premium refurbished laptops, workstation computers, and budget-friendly notebooks in Jhansi. Guaranteed quality & local warranty support.'
  },
  '/desktops': {
    title: 'Custom Gaming Desktops & Office PCs | TSS Jhansi',
    description: 'Build your dream custom gaming PC or buy high-performance refurbished desktop systems with warranty in Jhansi.'
  },
  '/led-tv': {
    title: 'Smart LED TVs & High-Hz Gaming Monitors | TSS',
    description: 'Premium smart LED TVs and ultra-responsive monitors for office and gaming in Sangam Vihar, Jhansi.'
  },
  '/printers': {
    title: 'Laser Printers & Office Copiers | TSS Computer Jhansi',
    description: 'Heavy-duty laser printers, enterprise copiers, and printer accessories with AMC & Sales coverage in Jhansi.'
  },
  '/accessories': {
    title: 'Computer Accessories & Networking Gear | TSS',
    description: 'Purchase gaming keyboards, mechanical mice, SSDs, routers, and enterprise cabling accessories at TSS Jhansi.'
  },
  '/refurbished': {
    title: 'Certified Refurbished Hardware & Laptops | TSS',
    description: 'Buy premium certified refurbished laptops, desktops, and enterprise hardware with warranty at THE TSS COMPUTER STORE, Jhansi.'
  },
  '/contact': {
    title: 'Store Location & Support Helpline | TSS Computer Jhansi',
    description: 'Locate THE TSS COMPUTER STORE at Shivpuri Road, Jhansi. Get contact numbers, opening hours, and direct directions.'
  },
  '/warranty': {
    title: 'Store Policy & Jhansi Jurisdiction Terms | TSS',
    description: 'Read the official warranty guidelines, Saturday weekly off information, and Jhansi jurisdiction terms of service.'
  },
  '/checkout': {
    title: 'Secure Checkout | THE TSS COMPUTER STORE',
    description: 'Complete your purchase securely. Fast billing and local pickup configuration.'
  },
  '/account': {
    title: 'My Account & Orders | THE TSS COMPUTER STORE',
    description: 'Manage your user profile, track orders, and view invoices in Jhansi.'
  },
  '/downloads': {
    title: 'Drivers & Technical Resources Downloads | TSS',
    description: 'Download essential computer drivers, motherboard updates, and technical manuals directly from TSS Jhansi.'
  },
  '/faq': {
    title: 'Frequently Asked Questions & Tech Help | TSS',
    description: 'Answers to frequently asked questions about laptops, desktops, repairs, and AMC plans in Jhansi.'
  }
};

export function useSEO() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const data = seoData[path] || seoData['/'];

    // Update Title
    document.title = data.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', data.description);
  }, [location]);
}
