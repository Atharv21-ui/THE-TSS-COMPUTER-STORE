import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

interface IntroScrollProps {
  onComplete: () => void;
}

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const FRAME_COUNT = isMobile ? 53 : 63;
const getFrameUrl = (index: number) => {
  const paddedIndex = index.toString().padStart(2, '0');
  const folder = isMobile ? 'mob_intro' : 'intro';
  return `${import.meta.env.BASE_URL}${folder}/frame_${paddedIndex}_delay-0.1s.jpg`;
};

export default function IntroScroll({ onComplete }: IntroScrollProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [hudText, setHudText] = useState('INITIALIZING QUANTUM BLADE X1');
  const [progressPct, setProgressPct] = useState(0);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) {
          setTimeout(() => setIsLoaded(true), 800); // slight delay to show 100%
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        // Increment anyway to prevent infinite loading on one missing frame
        loaded++;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      img.src = getFrameUrl(i);
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Setup GSAP and Canvas drawing once loaded
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Ensure we redraw the current frame on resize
      if (scrollTriggerRef.current) {
         renderFrame(Math.floor(scrollTriggerRef.current.progress * (FRAME_COUNT - 1)));
      } else {
         renderFrame(0);
      }
    };

    let rafId: number | null = null;
    let lastRenderedFrame = -1;

    const renderFrame = (index: number) => {
      if (index === lastRenderedFrame) return;
      lastRenderedFrame = index;
      
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      });
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // GSAP ScrollTrigger Sequence
    const animationState = { frame: 0 };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=350%',
      pin: '.intro-pinned-section',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        setProgressPct(Math.floor(p * 100));
        
        if (p < 0.25) setHudText('INITIALIZING QUANTUM BLADE X1');
        else if (p < 0.55) setHudText('ENGINEERING SUPREMACY');
        else if (p < 0.85) setHudText('TACTILE PRECISION & PERFORMANCE');
        else setHudText('SYSTEM READY');

        if (p > 0.98 && !isFadingOut) {
          setIsFadingOut(true);
          gsap.to('.intro-pinned-section', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              onComplete();
            }
          });
        }
      }
    });
    
    scrollTriggerRef.current = st;

    gsap.to(animationState, {
      frame: FRAME_COUNT - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=350%',
        scrub: true,
      },
      onUpdate: () => renderFrame(animationState.frame),
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, isFadingOut, onComplete]);

  // Prevent scroll jumping before loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Ensure we are at top when sequence starts
      window.scrollTo(0,0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoaded]);

  const loadPercentage = Math.floor((loadedCount / FRAME_COUNT) * 100);

  return (
    <div ref={containerRef} className="intro-scroll-container">
      {!isLoaded && (
        <div className="intro-preloader">
          <div className="preloader-content">
            <h1 className="font-heading preloader-title">TSS SYSTEMS</h1>
            <div className="preloader-bar-container">
              <div className="preloader-bar" style={{ width: `${loadPercentage}%` }}></div>
            </div>
            <div className="preloader-details font-ui">
              <span>{loadPercentage < 100 ? 'RETRIEVING SPECIFICATIONS...' : 'CALIBRATING ANIMATION ENGINE...'}</span>
              <span>{loadPercentage}%</span>
            </div>
          </div>
        </div>
      )}

      {isLoaded && (
        <div className="intro-pinned-section">
          <canvas ref={canvasRef} className="intro-canvas" />
          
          {/* Cyberpunk HUD Overlay */}
          <div className="hud-overlay pointer-events-none">
            {/* Center Reticle / Text */}
            <div className="hud-center">
              <div className="hud-main-text font-heading">{hudText}</div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="scroll-indicator font-heading">
              SCROLL TO ENTER
              <div className="scroll-line"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
