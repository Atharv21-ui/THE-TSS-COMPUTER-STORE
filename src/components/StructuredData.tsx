import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function StructuredData() {
  const location = useLocation();

  useEffect(() => {
    // Remove any existing JSON-LD script we added previously
    const existingScript = document.getElementById('tss-jsonld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "ComputerStore",
        "name": "THE TSS COMPUTER STORE",
        "image": "https://tsscomputer.in/logo.png",
        "telephone": "+91-73176-05285",
        "email": "support@tsscomputer.in",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "B 6 Block, Shivpuri - Jhansi Rd, Sangam Vihar",
          "addressLocality": "Jhansi",
          "addressRegion": "UP",
          "postalCode": "284003",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.44842,
          "longitude": 78.56845
        },
        "url": "https://tsscomputer.in",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Sunday"
            ],
            "opens": "10:00",
            "closes": "20:00"
          }
        ]
      }
    ];

    // FAQ Schema on Home, Contact, or FAQ pages
    if (location.pathname === '/' || location.pathname === '/contact' || location.pathname === '/faq') {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the location of THE TSS COMPUTER STORE in Jhansi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "THE TSS COMPUTER STORE is located at B 6 Block, Shivpuri - Jhansi Rd, Sangam Vihar, Jhansi, Uttar Pradesh 284003."
            }
          },
          {
            "@type": "Question",
            "name": "What are the store opening timings and weekly off?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The store is open from 10:00 AM to 8:00 PM. It is open on Sundays, and the weekly off is Saturday."
            }
          },
          {
            "@type": "Question",
            "name": "How can I contact technical support or buy AMC plans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can contact Support/Technical Help at +91 73176-05285 and Sales/AMC Help at +91 94541-84285."
            }
          },
          {
            "@type": "Question",
            "name": "Does THE TSS COMPUTER STORE provide refurbished laptops?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we sell certified refurbished laptops, gaming desktops, office copiers, laser printers, and smart LED TVs/monitors with local warranty coverage."
            }
          }
        ]
      });
    }

    const script = document.createElement('script');
    script.id = 'tss-jsonld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      const cleanupScript = document.getElementById('tss-jsonld-schema');
      if (cleanupScript) {
        cleanupScript.remove();
      }
    };
  }, [location]);

  return null;
}
