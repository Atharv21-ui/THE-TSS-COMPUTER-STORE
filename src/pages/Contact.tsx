import { useEffect, useState } from 'react';
import gsap from 'gsap';
import AnimatedButton from '../components/AnimatedButton';
import FloatingInput from '../components/FloatingInput';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';

export default function Contact() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    category: 'General Inquiry',
    message: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      await api.post('/messages', formData);
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        category: 'General Inquiry',
        message: ''
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };
  useEffect(() => {
    // Set accent color to Neon Orange
    document.documentElement.style.setProperty('--accent-color', '#ff3300');
    document.documentElement.style.setProperty('--accent-color-rgb', '255, 51, 0');
    
    gsap.fromTo('.page-header', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo('.contact-item', 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
    );

    gsap.fromTo('.contact-form', 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      <div className="page-header">
        <h1 className="font-heading" style={{ fontSize: '4rem', textTransform: 'uppercase' }}>{t('page.contact.title')}</h1>
        <p className="text-muted" style={{ maxWidth: '600px', marginTop: '20px', lineHeight: '1.6' }}>
          Have a question about our quantum-grade hardware? Our global support team is ready to assist you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', marginTop: '60px', alignItems: 'start' }}>
        
        {/* Contact Info (Left Column) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div className="contact-item" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ padding: '16px', background: 'rgba(255,51,0,0.1)', borderRadius: '50%', color: 'var(--accent-color)' }}>
              <Mail size={24} />
            </div>
            <div>
              <h4 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Email Support</h4>
              <p className="text-muted">support@tss-hardware.com</p>
            </div>
          </div>

          <div className="contact-item" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ padding: '16px', background: 'rgba(255,51,0,0.1)', borderRadius: '50%', color: 'var(--accent-color)' }}>
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Support & Technical Help</h4>
              <p className="text-muted" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>+91 73176-05285</p>
            </div>
          </div>

          <div className="contact-item" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ padding: '16px', background: 'rgba(255,51,0,0.1)', borderRadius: '50%', color: 'var(--accent-color)' }}>
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Sale's & AMC Taking Plan Help</h4>
              <p className="text-muted" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>+91 94541-84285</p>
            </div>
          </div>

          <div className="contact-item" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ padding: '16px', background: 'rgba(255,51,0,0.1)', borderRadius: '50%', color: 'var(--accent-color)' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-heading" style={{ fontSize: '1.2rem', marginBottom: '4px' }}>THE TSS COMPUTER STORE</h4>
              <p className="text-muted">B 6 Block, Shivpuri - Jhansi Rd,<br />Sangam Vihar, Jhansi, UP 284003</p>
            </div>
          </div>
        </div>

        {/* Contact Form (Right Column) */}
        <form className="contact-form" onSubmit={handleSubmit} style={{
          background: 'rgba(10, 10, 10, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '40px',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h3 className="font-heading" style={{ fontSize: '2rem', marginBottom: '10px' }}>SEND A MESSAGE</h3>
          
          {submitStatus === 'success' && (
            <div style={{ padding: '12px', background: 'rgba(0, 255, 100, 0.1)', border: '1px solid #00ff64', color: '#00ff64', borderRadius: '4px' }}>
              Your message has been sent successfully. We will get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div style={{ padding: '12px', background: 'rgba(255, 50, 50, 0.1)', border: '1px solid #ff3232', color: '#ff3232', borderRadius: '4px' }}>
              Failed to send your message. Please try again later.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FloatingInput label="First Name" required type="text" bgContext="#111" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
            <FloatingInput label="Last Name" type="text" bgContext="#111" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
          </div>
          
          <FloatingInput label="Email Address" required type="email" bgContext="#111" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          
          <select 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value})}
            style={{ width: '100%', padding: '16px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '4px', appearance: 'none' }}
          >
            <option>General Inquiry</option>
            <option>Technical Support</option>
            <option>Warranty Claim</option>
            <option>Sales & Enterprise</option>
          </select>
          
          <FloatingInput label="How can we help you?" required isTextArea rows={5} bgContext="#111" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
          
          <div style={{ marginTop: '10px', alignSelf: 'flex-start' }}>
            <AnimatedButton text={submitStatus === 'loading' ? 'SENDING...' : 'SEND MESSAGE'} />
          </div>
        </form>

      </div>
    </div>
  );
}
