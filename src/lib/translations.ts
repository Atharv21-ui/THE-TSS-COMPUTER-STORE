export type Language = 'en' | 'hi';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.laptops': 'Laptops',
    'nav.desktops': 'Desktops',
    'nav.printers': 'Printers',
    'nav.led_tv': 'LED TV',
    'nav.accessories': 'Accessories',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'nav.admin': 'Admin CMS',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    // Search Bar & Modal
    'search.placeholder': 'Search TSS Hardware...',
    'search.recommended': 'RECOMMENDED HARDWARE',
    'search.results': 'SEARCH RESULTS ({count})',
    'search.no_results': 'NO HARDWARE MATCHING "{query}"',
    'search.try_again': 'Try refining your search terms or browse categories.',
    'search.view': 'VIEW UNIT',

    // Filters & Sorting
    'filter.all': 'ALL HARDWARE',
    'filter.in_stock': 'IN STOCK ONLY',
    'sort.label': 'SORT BY',
    'sort.featured': 'FEATURED',
    'sort.price_asc': 'PRICE: LOW TO HIGH',
    'sort.price_desc': 'PRICE: HIGH TO LOW',
    'sort.name_asc': 'NAME: A TO Z',

    // Product Cards & Modals
    'product.add_to_cart': 'ADD TO CART',
    'product.in_cart': 'IN CART',
    'product.specifications': 'SPECIFICATIONS',
    'product.in_stock': 'IN STOCK',
    'product.out_of_stock': 'OUT OF STOCK',
    'product.quick_view': 'QUICK VIEW',
    'product.unit': 'UNIT',

    // Home Page
    'home.badge': 'NEXT-GEN CYBERWARE & COMPUTING',
    'home.hero_title': 'NEO TACTICAL HARDWARE',
    'home.hero_desc': 'Engineered for extreme performance, quantum workloads, and high-framerate immersive reality.',
    'home.explore': 'EXPLORE HARDWARE',
    'home.featured_title': 'FEATURED HARDWARE',
    'home.featured_subtitle': 'PREMIUM COMPUTING SYSTEMS ENGINEERED FOR UNCOMPROMISED PERFORMANCE',

    // Page Titles
    'page.laptops.title': 'LAPTOPS',
    'page.desktops.title': 'DESKTOPS',
    'page.printers.title': 'PRINTERS',
    'page.led_tv.title': 'LED TVS',
    'page.accessories.title': 'ACCESSORIES',
    'page.warranty.title': 'WARRANTY & GUARANTEE',
    'page.downloads.title': 'DOWNLOADS & DRIVERS',
    'page.contact.title': 'CONTACT SUPPORT',
    'page.faq.title': 'FREQUENTLY ASKED QUESTIONS',

    // Cart & Checkout
    'cart.title': 'SHOPPING CART',
    'cart.summary': 'ORDER SUMMARY',
    'cart.empty': 'YOUR CART IS EMPTY',
    'cart.subtotal': 'SUBTOTAL',
    'cart.shipping': 'SHIPPING',
    'cart.shipping_free': 'FREE (EXPRESS)',
    'cart.tax': 'ESTIMATED TAX (18% GST)',
    'cart.total': 'TOTAL',
    'cart.checkout_btn': 'PROCEED TO CHECKOUT',
    'checkout.title': 'CHECKOUT & FULFILLMENT',
    'checkout.shipping_address': 'SHIPPING ADDRESS',
    'checkout.full_name': 'FULL NAME',
    'checkout.address': 'STREET ADDRESS',
    'checkout.city': 'CITY',
    'checkout.state': 'STATE',
    'checkout.zip': 'PIN / ZIP CODE',
    'checkout.payment_method': 'PAYMENT METHOD',
    'checkout.card': 'CREDIT / DEBIT CARD',
    'checkout.cod': 'CASH ON DELIVERY (COD)',
    'checkout.upi': 'UPI / INSTANT PAY',
    'checkout.place_order': 'CONFIRM & PLACE ORDER',
    'checkout.success': 'ORDER CONFIRMED!',
    'checkout.thank_you': 'Thank you for your purchase. Your dispatch tracking number is:',

    // Account Page
    'account.title': 'ACCOUNT DASHBOARD',
    'account.orders': 'ORDER HISTORY',
    'account.profile': 'PROFILE DETAILS',
    'account.payment': 'PAYMENT METHODS',
    'account.notifications': 'PREFERENCES',

    // Footer
    'footer.desc': 'Elevating the standard of high-performance electronics. Built for the modern creator, engineer, and gamer.',
    'footer.products': 'PRODUCTS',
    'footer.support': 'SUPPORT',
    'footer.stay_updated': 'STAY UPDATED',
    'footer.email_placeholder': 'ENTER EMAIL',
    'footer.subscribe': 'SUBSCRIBE',
    'footer.contact': 'Contact Us',
    'footer.warranty': 'Warranty',
    'footer.downloads': 'Downloads',
    'footer.faq': 'FAQ',

    // Language Toggle
    'lang.english': 'ENGLISH',
    'lang.hindi': 'हिन्दी',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.laptops': 'लैपटॉप',
    'nav.desktops': 'डेस्कटॉप',
    'nav.printers': 'प्रिंटर',
    'nav.led_tv': 'एलईडी टीवी',
    'nav.accessories': 'एक्सेसरीज',
    'nav.cart': 'कार्ट',
    'nav.account': 'अकाउंट',
    'nav.admin': 'एडमिन पैनल',
    'nav.menu': 'मेनू',
    'nav.close': 'बंद करें',

    // Search Bar & Modal
    'search.placeholder': 'TSS हार्डवेयर खोजें...',
    'search.recommended': 'अनुशंसित हार्डवेयर',
    'search.results': 'खोज परिणाम ({count})',
    'search.no_results': '"{query}" के लिए कोई हार्डवेयर नहीं मिला',
    'search.try_again': 'कृपया अपनी खोज शब्द बदलें या श्रेणियों को देखें।',
    'search.view': 'इकाई देखें',

    // Filters & Sorting
    'filter.all': 'सभी हार्डवेयर',
    'filter.in_stock': 'केवल उपलब्ध',
    'sort.label': 'क्रमानुसार',
    'sort.featured': 'विशेष',
    'sort.price_asc': 'मूल्य: कम से उच्च',
    'sort.price_desc': 'मूल्य: उच्च से कम',
    'sort.name_asc': 'नाम: अ से ज्ञ',

    // Product Cards & Modals
    'product.add_to_cart': 'कार्ट में जोड़ें',
    'product.in_cart': 'कार्ट में मौजूद',
    'product.specifications': 'विशिष्टताएँ',
    'product.in_stock': 'स्टॉक में उपलब्ध',
    'product.out_of_stock': 'स्टॉक समाप्त',
    'product.quick_view': 'त्वरित दृश्य',
    'product.unit': 'इकाई',

    // Home Page
    'home.badge': 'नेक्स्ट-जेन साइबरवेयर और कंप्यूटिंग',
    'home.hero_title': 'नियॉन टैकटिकल हार्डवेयर',
    'home.hero_desc': 'उच्च प्रदर्शन, क्वांटम वर्कलोड और इमर्सिव अनुभव के लिए विशेष रूप से निर्मित।',
    'home.explore': 'हार्डवेयर देखें',
    'home.featured_title': 'विशेष हार्डवेयर',
    'home.featured_subtitle': 'बेहतरीन प्रदर्शन के लिए डिज़ाइन किए गए प्रीमियम कंप्यूटिंग सिस्टम',

    // Page Titles
    'page.laptops.title': 'लैपटॉप',
    'page.desktops.title': 'डेस्कटॉप',
    'page.printers.title': 'प्रिंटर',
    'page.led_tv.title': 'एलईडी टीवी',
    'page.accessories.title': 'एक्सेसरीज',
    'page.warranty.title': 'वारंटी और गारंटी',
    'page.downloads.title': 'डाउनलोड और ड्राइवर्स',
    'page.contact.title': 'सहायता संपर्क',
    'page.faq.title': 'अक्सर पूछे जाने वाले प्रश्न',

    // Cart & Checkout
    'cart.title': 'शॉपिंग कार्ट',
    'cart.summary': 'ऑर्डर विवरण',
    'cart.empty': 'आपकी कार्ट खाली है',
    'cart.subtotal': 'उप-योग (Subtotal)',
    'cart.shipping': 'शिपिंग',
    'cart.shipping_free': 'मुफ़्त (एक्सप्रेस)',
    'cart.tax': 'अनुमानित जीएसटी (18%)',
    'cart.total': 'कुल राशि',
    'cart.checkout_btn': 'चेकआउट आगे बढ़ाएं',
    'checkout.title': 'चेकआउट और डिलीवरी',
    'checkout.shipping_address': 'डिलीवरी का पता',
    'checkout.full_name': 'पूरा नाम',
    'checkout.address': 'सड़क / मकान का पता',
    'checkout.city': 'शहर',
    'checkout.state': 'राज्य',
    'checkout.zip': 'पिन कोड',
    'checkout.payment_method': 'भुगतान विधि',
    'checkout.card': 'क्रेडिट / डेबिट कार्ड',
    'checkout.cod': 'कैश ऑन डिलीवरी (COD)',
    'checkout.upi': 'यूपीआई / इंस्टेंट पे',
    'checkout.place_order': 'ऑर्डर की पुष्टि करें',
    'checkout.success': 'ऑर्डर सफल!',
    'checkout.thank_you': 'खरीदारी के लिए धन्यवाद! आपका ट्रैकिंग नंबर है:',

    // Account Page
    'account.title': 'अकाउंट डैशबोर्ड',
    'account.orders': 'ऑर्डर इतिहास',
    'account.profile': 'प्रोफाइल विवरण',
    'account.payment': 'भुगतान विधियां',
    'account.notifications': 'प्राथमिकताएं',

    // Footer
    'footer.desc': 'उच्च प्रदर्शन इलेक्ट्रॉनिक्स का नया मानक। आधुनिक रचनाकारों और गेमर्स के लिए निर्मित।',
    'footer.products': 'उत्पाद',
    'footer.support': 'सहायता',
    'footer.stay_updated': 'जुड़े रहें',
    'footer.email_placeholder': 'ईमेल दर्ज करें',
    'footer.subscribe': 'सदस्यता लें',
    'footer.contact': 'संपर्क करें',
    'footer.warranty': 'वारंटी',
    'footer.downloads': 'डाउनलोड',
    'footer.faq': 'अक्सर पूछे जाने वाले प्रश्न',

    // Language Toggle
    'lang.english': 'ENGLISH',
    'lang.hindi': 'हिन्दी',
  }
};

/**
 * Format any price string or numeric value cleanly into Indian Rupee (INR - ₹) format.
 * Examples:
 *   "1,299$" -> "₹1,299"
 *   "$2499.50" -> "₹2,499.50"
 *   "1299" -> "₹1,299"
 *   "₹1,299" -> "₹1,299"
 *   1299 -> "₹1,299"
 */
export function formatPriceToINR(price: string | number): string {
  if (price === undefined || price === null || price === '') return '₹0';
  
  if (typeof price === 'number') {
    return `₹${price.toLocaleString('en-IN')}`;
  }

  // Extract clean numerical digits and optional decimal point
  const numericStr = String(price).replace(/[^0-9.]/g, '');
  if (!numericStr) return '₹0';

  const num = parseFloat(numericStr);
  if (isNaN(num)) return '₹0';

  // Format using Indian grouping (e.g. 1,00,000)
  return `₹${num.toLocaleString('en-IN')}`;
}
