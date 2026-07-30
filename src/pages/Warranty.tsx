import { useEffect } from 'react';
import gsap from 'gsap';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Warranty() {
  const { t } = useLanguage();
  useEffect(() => {
    // Set accent color to Tech Blue
    document.documentElement.style.setProperty('--accent-color', '#0055ff');
    document.documentElement.style.setProperty('--accent-color-rgb', '0, 85, 255');
    
    gsap.fromTo('.page-header', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo('.warranty-card', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
    );
    
    gsap.fromTo('.warranty-text', 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8, delay: 0.6 }
    );
  }, []);

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      <div className="page-header">
        <h1 className="font-heading" style={{ fontSize: '4rem', textTransform: 'uppercase' }}>{t('page.warranty.title')}</h1>
        <p className="text-muted" style={{ maxWidth: '600px', marginTop: '20px', lineHeight: '1.6' }}>
          TSS hardware is built to last. Our comprehensive warranty plans ensure that your systems run flawlessly, backed by our global network of elite technicians.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '60px' }}>
        
        {/* Tier 1 */}
        <div className="warranty-card" style={{ background: '#111', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <ShieldAlert size={48} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
          <h3 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>STANDARD CARE</h3>
          <h4 style={{ color: 'var(--accent-color)', marginBottom: '20px' }}>Included (1 Year)</h4>
          <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '14px', flexGrow: 1 }}>
            Our base tier protects your hardware against manufacturing defects and hardware failure.
          </p>
          <ul style={{ color: '#ccc', fontSize: '13px', lineHeight: '2', marginTop: '20px', paddingLeft: '15px' }}>
            <li>Hardware repair / replacement</li>
            <li>90 days of 24/7 phone support</li>
            <li>Mail-in repair service</li>
          </ul>
        </div>

        {/* Tier 2 */}
        <div className="warranty-card" style={{ background: '#111', padding: '40px', borderRadius: '12px', border: '1px solid var(--accent-color)', boxShadow: '0 0 20px rgba(0,85,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transform: 'scale(1.05)', zIndex: 10 }}>
          <ShieldCheck size={48} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
          <h3 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>PRO CARE</h3>
          <h4 style={{ color: 'var(--accent-color)', marginBottom: '20px' }}>₹14,999 (3 Years)</h4>
          <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '14px', flexGrow: 1 }}>
            Extended coverage designed for professionals who rely on their machines daily.
          </p>
          <ul style={{ color: '#ccc', fontSize: '13px', lineHeight: '2', marginTop: '20px', paddingLeft: '15px' }}>
            <li>3 years hardware protection</li>
            <li>3 years 24/7 priority support</li>
            <li>On-site technician dispatch</li>
            <li>Accidental damage protection (1 incident)</li>
          </ul>
        </div>

        {/* Tier 3 */}
        <div className="warranty-card" style={{ background: '#111', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Shield size={48} color="var(--accent-color)" style={{ marginBottom: '20px' }} />
          <h3 className="font-heading" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>ULTIMATE CARE</h3>
          <h4 style={{ color: 'var(--accent-color)', marginBottom: '20px' }}>₹29,999 (5 Years)</h4>
          <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '14px', flexGrow: 1 }}>
            Absolute peace of mind. White-glove service for enterprise and elite consumers.
          </p>
          <ul style={{ color: '#ccc', fontSize: '13px', lineHeight: '2', marginTop: '20px', paddingLeft: '15px' }}>
            <li>5 years comprehensive protection</li>
            <li>Dedicated account manager</li>
            <li>Next-business-day on-site repair</li>
            <li>Unlimited accidental damage</li>
            <li>Data recovery services</li>
          </ul>
        </div>
      </div>

      {/* STORE TIMINGS & CONTACT HELPLINES */}
      <div style={{ marginTop: '60px', background: 'rgba(15, 15, 22, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '35px' }}>
        <h3 className="font-heading" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '20px' }}>STORE TIMINGS & HELP LINES</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#0a0a10', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 className="font-heading" style={{ color: 'var(--accent-color)', fontSize: '1.1rem', marginBottom: '10px' }}>STORE HOURS</h4>
            <p style={{ color: '#ccc', fontSize: '14px', margin: '4px 0' }}>🕙 <strong>Store Opening Time:</strong> 10:00 AM</p>
            <p style={{ color: '#ccc', fontSize: '14px', margin: '4px 0' }}>🕗 <strong>Store Closing Time:</strong> 8:00 PM</p>
            <p style={{ color: '#ff4444', fontSize: '14px', margin: '4px 0', fontWeight: 'bold' }}>📅 <strong>Weekly Off:</strong> Saturday</p>
          </div>
          <div style={{ background: '#0a0a10', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 className="font-heading" style={{ color: 'var(--accent-color)', fontSize: '1.1rem', marginBottom: '10px' }}>SUPPORT & TECHNICAL HELP</h4>
            <p style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>7317605285</p>
            <p style={{ color: '#888', fontSize: '12px' }}>Call / WhatsApp for technical assistance</p>
          </div>
          <div style={{ background: '#0a0a10', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 className="font-heading" style={{ color: 'var(--accent-color)', fontSize: '1.1rem', marginBottom: '10px' }}>SALE'S & AMC PLAN HELP</h4>
            <p style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>94541-84285</p>
            <p style={{ color: '#888', fontSize: '12px' }}>Call for sales, bulk orders & AMC coverage</p>
          </div>
        </div>
      </div>

      {/* IMPORTANT STORE POLICIES */}
      <div style={{ marginTop: '50px' }}>
        <h3 className="font-heading" style={{ fontSize: '2rem', marginBottom: '25px', color: '#fff' }}>IMPORTANT STORE POLICIES</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          <div style={{ background: '#111', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 className="font-heading" style={{ color: '#ff4444', fontSize: '1.2rem', marginBottom: '10px' }}>NO REFUND POLICY</h4>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
              Once a product is sold, no refund will be provided under any circumstances.
            </p>
          </div>

          <div style={{ background: '#111', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 className="font-heading" style={{ color: 'var(--accent-color)', fontSize: '1.2rem', marginBottom: '10px' }}>REPLACEMENT POLICY</h4>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
              Products will be replaced only if they are covered under the manufacturer's warranty. Replacement will be processed through the Authorized Service Center only. The final decision regarding replacement is subject to the manufacturer's warranty terms and inspection.
            </p>
          </div>

          <div style={{ background: '#111', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 className="font-heading" style={{ color: '#ffaa00', fontSize: '1.2rem', marginBottom: '10px' }}>DAMAGED PRODUCTS & BURNT</h4>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
              Physically damaged, broken, burnt, liquid-damaged, track cut, or tampered products are not eligible for replacement or warranty. Such items will be handled only as per the Authorized Service Center's policy.
            </p>
          </div>

          <div style={{ background: '#111', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 className="font-heading" style={{ color: 'var(--accent-color)', fontSize: '1.2rem', marginBottom: '10px' }}>SERVICE & PICKUP TIMINGS</h4>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
              Device submission and pickup timings are 10:00 AM to 8:00 PM. Customers are requested to collect repaired devices within the informed period.
            </p>
          </div>

        </div>
      </div>

      {/* DETAILED WARRANTY TERMS & CONDITIONS */}
      <div className="warranty-text" style={{ marginTop: '60px', background: 'rgba(10, 10, 15, 0.9)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 className="font-heading" style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff' }}>WARRANTY TERMS & CONDITIONS</h3>
        <p className="text-muted" style={{ lineHeight: '1.9', fontSize: '14px', color: '#ccc' }}>
          <strong>All disputes subject to JHANSI Jurisdiction only.</strong><br />
          Track Cut & Physical Damaged, No Warranty on Burnt. Only Manufacturers / Suppliers verdict would be final in matters of guarantee/warranty. Please check terms before accepting delivery. Warranty of parts by Authorised Service Center. E&OE. No Warranty of software.
          <br /><br />
          Warranty is applicable only as per the manufacturer's terms and conditions. Please keep the original invoice for any warranty claim.
        </p>
      </div>
    </div>
  );
}
