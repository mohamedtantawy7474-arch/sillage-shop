// English / Arabic text and helpers shared by every page.
// Mark elements with data-i18n="key" (text), data-i18n-html="key" (allows <br>/<em>),
// or data-i18n-ph="key" (placeholder). Pages listen for the "langchange" event to redraw.
const STR = {
  en: {
    langSwitch: 'عربي', langSwitchLabel: 'التبديل إلى العربية',
    navShop: 'Shop', navHow: 'How it works', navSet: 'Discovery set', navFaq: 'FAQ', bag: 'Bag',
    heroA: 'Spray first.', heroB: 'Commit', heroC: 'Later.',
    scribble1: 'decanted from<br>genuine bottles', scribble2: 'try it before<br>the full bottle ;)', fromPrice: 'from {n}',
    metaLeft: 'Niche & designer', metaScroll: 'Scroll', metaRight: '2 / 5 / 10 ml',
    marquee: ['Niche', 'Designer', '2 · 5 · 10 ml', 'Genuine bottles only', 'Cash on delivery', 'Free delivery over {free}'],
    shopTitle: 'Pick your <em>scent</em>',
    weekEyebrow: 'Scent of the week', weekBadge: 'Scent of the week', weekMore: 'See it in the shop',
    notesTitle: 'What’s <em>inside</em>', notesTitlePlain: 'Scent notes', notesHint: 'Point at a note to see which bottles carry it, or at a bottle to see its notes.', notesHintTouch: 'Tap a note to see which bottles carry it. Tap it again to clear.', notesIn1: '{note} is in one of our scents', notesIn2: '{note} is in two of our scents', notesInN: '{note} is in {n} of our scents',
    brandsA: 'Houses', brandsB: 'we carry', brandsWord: 'Originals', brandsNote: 'Designer favourites and Middle-Eastern houses on one shelf. Every decant is poured from a full bottle bought from an authorised store.',
    fam_all: 'All', fam_fresh: 'Fresh', fam_woody: 'Woody', fam_sweet: 'Sweet', fam_spicy: 'Spicy',
    tag_limited: 'Limited edition',
    ml: '{n} ml', add: 'Add to bag', added: 'Added',
    orbRegion: 'Scent carousel', orbChoose: 'Choose a scent', orbEyebrow: 'No. {n} / {total}', orbNotes: 'Key notes',
    orbTry: 'Try {ml} · {price}', orbView: 'View in shop', orbPrev: 'Previous scent', orbNext: 'Next scent',
    orbSlide: 'Scent {n} of {total}: {name}',
    howTitle: 'From bottle<br>to <em>your door</em>',
    s1t: 'Genuine bottles', s1b: 'We only decant from full bottles bought at authorised stores, and we keep the batch code of every one.',
    s2t: 'Decanted for you', s2b: 'Your size is filled straight from that bottle into a new spray.',
    s3t: 'Pay your way', s3b: 'Cash on delivery, card or mobile wallet, or an InstaPay transfer.',
    s4t: 'Wear it for real', s4b: 'Days on your own skin, not a minute on a paper strip. Then decide if the full bottle is worth it.',
    setTitle: 'The starting<br><em>grid</em>', setScrawl: 'best way to start!',
    setBody: 'All ten scents in 2ml sprays, from fresh to coffee-sweet. Enough wears of each to know which one deserves a bigger size.',
    setWas: '{n} separately', setAdd: 'Add the set', setName: 'Starting Grid Set', setSize: '{count} × {ml} ml',
    faqTitle: 'Good <em>to know</em>',
    q1: 'Are these authentic?', a1: 'Yes. Every decant comes from a full bottle bought from an authorised store, and we keep its batch code.',
    q2: 'How many sprays per size?', a2: 'Roughly 20 sprays in 2ml, 50 in 5ml and 100 in 10ml, depending on the sprayer.',
    q3: 'How can I pay?', a3: 'Cash on delivery, card or mobile wallet through Paymob, or an InstaPay transfer.',
    q4: 'Where do you deliver?', a4: 'Anywhere in Egypt. Delivery costs {fee}, and it’s free on orders over {free}.',
    footTag: 'Genuine designer and niche fragrances, decanted into sizes you can actually try.',
    footShop: 'Shop', footInfo: 'Info', footAll: 'All decants', footSet: 'Discovery set', footHow: 'How it works', footFaq: 'FAQ',
    legal: 'Independent decant shop. Not affiliated with any fragrance house.',
    bagTitle: 'Your bag', close: 'Close', emptyHand: 'nothing here yet…', emptyBody: 'Your bag is empty. Go find your scent.',
    toFree: '{n} away from free delivery', freeOn: 'Free delivery unlocked', subtotal: 'Subtotal',
    checkout: 'Checkout', bagNote: 'Delivery fee and payment method at the next step.',
    addedToast: '{name} added to your bag', canceledToast: 'Payment canceled. Your bag is saved.',
    // checkout
    coTitle: 'Checkout', coBack: 'Back to shop', coDelivery: 'Delivery details', coPay: 'How do you want to pay?',
    fName: 'Full name', fPhone: 'Mobile number', fPhoneHint: '11 digits, starting with 01',
    fEmail: 'Email', fEmailHint: 'Optional. Needed for card payments.', fGov: 'Governorate', fGovPick: 'Choose…',
    fCity: 'City / area', fAddress: 'Street, building, floor, flat', fNotes: 'Notes for the courier', fOptional: 'optional',
    pCod: 'Cash on delivery', pCodD: 'Pay the courier in cash when it arrives.',
    pCard: 'Card or mobile wallet', pCardD: 'Secure payment through Paymob.',
    pInsta: 'InstaPay transfer', pInstaD: 'Transfer after ordering. We send it once the money arrives.',
    sumTitle: 'Your order', delivery: 'Delivery', free: 'Free', total: 'Total', edit: 'Edit bag',
    placeOrder: 'Place order', payNow: 'Continue to payment', placing: 'Placing order…',
    eRequired: 'Please fill this in.', ePhone: 'Enter an 11-digit Egyptian mobile number, like 01012345678.',
    eEmail: 'Enter a valid email so Paymob can send your receipt.', eGov: 'Choose your governorate.',
    eServer: 'We couldn’t place your order. Check your connection and try again.',
    payFailed: 'The payment didn’t go through. Your bag is saved, so you can try again or pick another way to pay.',
    coEmpty: 'Your bag is empty.', coEmptyLink: 'Find a scent',
    closedTitle: 'Opening soon', closedBody: 'We’re putting the finishing touches on Sillage, so ordering isn’t open yet. Your bag is saved for when it is.',
    soon: 'Coming soon',
    // success
    okHand: 'box box, it’s on its way!', okTitleA: 'Order', okTitleB: 'received', okOrder: 'Order number',
    okCod: 'Have {total} ready in cash for the courier.',
    okCard: 'Your payment went through. Your receipt is on its way to your email.',
    okInsta: 'Send {total} by InstaPay to {handle} and write your order number in the note. We send your order as soon as the transfer arrives.',
    okCopy: 'Copy', okCopied: 'Copied', okBack: 'Back to the shop',
  },
  ar: {
    langSwitch: 'English', langSwitchLabel: 'Switch to English',
    navShop: 'المتجر', navHow: 'إزاي بنشتغل', navSet: 'تشكيلة التجربة', navFaq: 'أسئلة', bag: 'الشنطة',
    heroA: 'رشّ الأول.', heroB: 'وقرّر', heroC: 'بعدين.',
    scribble1: 'متقسّمة من<br>إزايز أصلية', scribble2: 'جرّبها قبل<br>الإزازة الكاملة ;)', fromPrice: 'من {n}',
    metaLeft: 'نيش وديزاينر', metaScroll: 'انزل', metaRight: '٢ / ٥ / ١٠ مل',
    marquee: ['نيش', 'ديزاينر', '٢ · ٥ · ١٠ مل', 'إزايز أصلية بس', 'الدفع عند الاستلام', 'توصيل مجاني فوق {free}'],
    shopTitle: 'اختار <em>ريحتك</em>',
    weekEyebrow: 'ريحة الأسبوع', weekBadge: 'ريحة الأسبوع', weekMore: 'شوفها في المتجر',
    notesTitle: 'إيه اللي <em>جوّاها</em>', notesTitlePlain: 'مكونات الريحة', notesHint: 'شاور على مكوّن تشوف الإزايز اللي فيها، أو على إزازة تشوف مكوّناتها.', notesHintTouch: 'دوس على مكوّن تشوف الإزايز اللي فيها. دوس تاني عشان تلغيه.', notesIn1: 'ريحة واحدة عندنا فيها {note}', notesIn2: 'ريحتين عندنا فيهم {note}', notesInN: '{n} ريحات عندنا فيهم {note}',
    brandsA: 'بيوت العطور', brandsB: 'اللي عندنا', brandsWord: 'أصلي', brandsNote: 'ماركات ديزاينر وبيوت عطور شرقية على رف واحد. كل عيّنة متقسّمة من إزازة كاملة متشترية من موزع معتمد.',
    fam_all: 'الكل', fam_fresh: 'منعش', fam_woody: 'خشبي', fam_sweet: 'حلو', fam_spicy: 'توابل',
    tag_limited: 'إصدار محدود',
    ml: '{n} مل', add: 'أضف للشنطة', added: 'اتضافت',
    orbRegion: 'جولة في العطور', orbChoose: 'اختار عطر', orbEyebrow: 'رقم {n} من {total}', orbNotes: 'أهم النوتات',
    orbTry: 'جرّب {ml} · {price}', orbView: 'في المتجر', orbPrev: 'العطر اللي قبله', orbNext: 'العطر اللي بعده',
    orbSlide: 'عطر {n} من {total}: {name}',
    howTitle: 'من الإزازة<br>لحد <em>باب بيتك</em>',
    s1t: 'إزايز أصلية', s1b: 'بنقسّم بس من إزايز كاملة متشترية من موزعين معتمدين، وبنحتفظ برقم التشغيلة (الباتش) لكل واحدة.',
    s2t: 'بنقسّمها ليك', s2b: 'الحجم اللي تختاره بيتملي مباشرة من الإزازة دي في بخّاخة جديدة.',
    s3t: 'ادفع بطريقتك', s3b: 'كاش عند الاستلام، أو كارت أو محفظة موبايل، أو تحويل إنستاباي.',
    s4t: 'جرّبها بجد', s4b: 'أيام على جلدك، مش دقيقة على ورقة. وبعدها قرّر الإزازة الكاملة تستاهل ولا لأ.',
    setTitle: 'تشكيلة<br><em>البداية</em>', setScrawl: 'أحسن بداية!',
    setBody: 'العشر روايح كلهم في بخّاخات ٢ مل، من المنعش للحلو بطعم القهوة. كفاية تجرّب كل واحدة كذا مرة وتعرف مين تستاهل حجم أكبر.',
    setWas: '{n} لو منفصلين', setAdd: 'أضف التشكيلة', setName: 'تشكيلة البداية', setSize: '{count} × {ml} مل',
    faqTitle: 'حاجات <em>تهمك</em>',
    q1: 'هل دي أصلية؟', a1: 'أيوه. كل عيّنة متقسّمة من إزازة كاملة متشترية من موزع معتمد، وبنحتفظ برقم التشغيلة بتاعها.',
    q2: 'كام بخّة في كل حجم؟', a2: 'تقريبًا ٢٠ بخّة في الـ٢ مل، و٥٠ في الـ٥ مل، و١٠٠ في الـ١٠ مل، حسب البخّاخة.',
    q3: 'أدفع إزاي؟', a3: 'كاش عند الاستلام، أو كارت أو محفظة موبايل عن طريق Paymob، أو تحويل إنستاباي.',
    q4: 'بتوصّلوا فين؟', a4: 'لأي مكان في مصر. التوصيل بـ{fee}، ومجاني للطلبات فوق {free}.',
    footTag: 'روايح ديزاينر ونيش أصلية، متقسّمة بأحجام تقدر تجرّبها فعلًا.',
    footShop: 'المتجر', footInfo: 'معلومات', footAll: 'كل العيّنات', footSet: 'تشكيلة التجربة', footHow: 'إزاي بنشتغل', footFaq: 'أسئلة',
    legal: 'متجر عيّنات مستقل. مش تابع لأي دار عطور.',
    bagTitle: 'شنطتك', close: 'إغلاق', emptyHand: 'لسه مفيش حاجة…', emptyBody: 'شنطتك فاضية. يلا دوّر على ريحتك.',
    toFree: 'فاضل {n} على التوصيل المجاني', freeOn: 'التوصيل بقى مجاني', subtotal: 'المجموع',
    checkout: 'إتمام الطلب', bagNote: 'مصاريف التوصيل وطريقة الدفع في الخطوة الجاية.',
    addedToast: 'اتضافت {name} لشنطتك', canceledToast: 'الدفع اتلغى. شنطتك لسه محفوظة.',
    coTitle: 'إتمام الطلب', coBack: 'رجوع للمتجر', coDelivery: 'بيانات التوصيل', coPay: 'عايز تدفع إزاي؟',
    fName: 'الاسم بالكامل', fPhone: 'رقم الموبايل', fPhoneHint: '١١ رقم، بيبدأ بـ01',
    fEmail: 'الإيميل', fEmailHint: 'اختياري. مطلوب لو هتدفع بالكارت.', fGov: 'المحافظة', fGovPick: 'اختار…',
    fCity: 'المدينة / المنطقة', fAddress: 'الشارع، العمارة، الدور، الشقة', fNotes: 'ملاحظات للمندوب', fOptional: 'اختياري',
    pCod: 'الدفع عند الاستلام', pCodD: 'ادفع كاش للمندوب لما الطلب يوصل.',
    pCard: 'كارت أو محفظة موبايل', pCardD: 'دفع آمن عن طريق Paymob.',
    pInsta: 'تحويل إنستاباي', pInstaD: 'حوّل بعد الطلب، وبنبعته أول ما التحويل يوصل.',
    sumTitle: 'طلبك', delivery: 'التوصيل', free: 'مجاني', total: 'الإجمالي', edit: 'تعديل الشنطة',
    placeOrder: 'أكّد الطلب', payNow: 'كمّل للدفع', placing: 'جاري تأكيد الطلب…',
    eRequired: 'من فضلك املا الخانة دي.', ePhone: 'اكتب رقم موبايل مصري من ١١ رقم، زي 01012345678.',
    eEmail: 'اكتب إيميل صحيح عشان Paymob يبعتلك الإيصال.', eGov: 'اختار محافظتك.',
    eServer: 'معرفناش نأكّد طلبك. اتأكد من النت وجرّب تاني.',
    payFailed: 'الدفع ما تمّش. شنطتك محفوظة، تقدر تجرّب تاني أو تختار طريقة دفع تانية.',
    coEmpty: 'شنطتك فاضية.', coEmptyLink: 'دوّر على ريحة',
    closedTitle: 'قريبًا', closedBody: 'بنحط اللمسات الأخيرة على Sillage، فالطلب لسه مش متاح. شنطتك محفوظة لحد ما نفتح.',
    soon: 'قريبًا',
    okHand: 'طلبك في السكة!', okTitleA: 'طلبك', okTitleB: 'وصلنا', okOrder: 'رقم الطلب',
    okCod: 'جهّز {total} كاش للمندوب.',
    okCard: 'الدفع تمّ بنجاح. الإيصال في الطريق لإيميلك.',
    okInsta: 'حوّل {total} بإنستاباي على {handle} واكتب رقم الطلب في الملاحظة. بنبعت طلبك أول ما التحويل يوصل.',
    okCopy: 'نسخ', okCopied: 'اتنسخ', okBack: 'رجوع للمتجر',
  }
};

let LANG = (() => {
  try { const s = localStorage.getItem('sillage-lang'); if (s === 'en' || s === 'ar') return s; } catch (e) {}
  return (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en';
})();

const numFmt = () => new Intl.NumberFormat(LANG === 'ar' ? 'ar-EG' : 'en-EG');
const num = n => numFmt().format(n);
const money = n => LANG === 'ar' ? `${num(n)} ج.م` : `EGP ${num(n)}`;

function t(key, vars = {}) {
  let s = STR[LANG][key] ?? STR.en[key] ?? key;
  if (typeof s !== 'string') return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

function applyI18n(root = document) {
  const v = { fee: money(CATALOG.deliveryFee), free: money(CATALOG.freeDeliveryOver) };
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n, v); });
  root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml, v); });
  root.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh, v); });
  root.querySelectorAll('[data-lang-toggle]').forEach(el => {
    el.textContent = t('langSwitch');
    el.setAttribute('aria-label', t('langSwitchLabel'));
    el.lang = LANG === 'ar' ? 'en' : 'ar';
  });
}

function setLang(l) {
  LANG = l;
  try { localStorage.setItem('sillage-lang', l); } catch (e) {}
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  applyI18n();
  document.dispatchEvent(new Event('langchange'));
}

// Set direction before first paint, then wire the toggle once the page is parsed.
document.documentElement.lang = LANG;
document.documentElement.dir = LANG === 'ar' ? 'rtl' : 'ltr';
document.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  document.querySelectorAll('[data-lang-toggle]').forEach(el =>
    el.addEventListener('click', () => setLang(LANG === 'ar' ? 'en' : 'ar')));
});

// Shared bag storage, so the shop and checkout pages see the same bag.
function loadCart() {
  try { const c = JSON.parse(localStorage.getItem('sillage-cart')); return Array.isArray(c) ? c : []; } catch (e) { return []; }
}
function saveCart(c) { try { localStorage.setItem('sillage-cart', JSON.stringify(c)); } catch (e) {} }

// Name and size for a bag line, in the current language (bag stores only key + qty).
function lineInfo(key) {
  if (key === 'set') {
    const s = CATALOG.set;
    return { name: t('setName'), size: t('setSize', { count: num(s.count), ml: num(s.ml) }), price: s.price, color: s.c };
  }
  const [id, i] = [key.slice(0, key.lastIndexOf('-')), +key.slice(key.lastIndexOf('-') + 1)];
  const p = CATALOG.products.find(x => x.id === id);
  if (!p || !(i in p.price)) return null;
  return { name: p.name, size: t('ml', { n: num(CATALOG.sizes[i]) }), price: p.price[i], color: p.c, img: p.img };
}

// Drop bag lines whose product no longer exists (e.g. after a catalog change).
function cleanCart(c) { return c.filter(it => it && Number.isInteger(it.qty) && it.qty > 0 && lineInfo(it.key)); }

// Small square picture for bag lines: the product photo, or a drawn vial for the set.
function thumb(i) {
  return i.img ? `<div class="sw photo"><img src="${i.img}" alt="" loading="lazy"></div>`
               : `<div class="sw" style="background:${i.color[0]}">${vial(i.color[1])}</div>`;
}

// Hand-drawn vial used across pages.
function vial(c, w = 60) {
  return `<svg class="vial" viewBox="0 0 30 90" width="${w}" aria-hidden="true">
  <rect x="9" y="1" width="12" height="9" rx="2" fill="#0b1222"/><rect x="11" y="10" width="8" height="6" fill="#bdbdb6"/>
  <rect x="4" y="16" width="22" height="72" rx="6" fill="rgba(255,255,255,.28)" stroke="rgba(120,108,92,.65)"/>
  <rect x="6.5" y="34" width="17" height="51" rx="4" fill="${c}"/><rect x="7.5" y="20" width="3" height="62" rx="1.5" fill="#fff" opacity=".35"/></svg>`;
}

// Small inline icons (one stroke weight) instead of text glyphs.
const ICON = {
  close: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  arrow: '<svg class="arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  minus: '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
};

let _tt;
function toast(m) {
  const el = document.getElementById('toast'); if (!el) return;
  el.textContent = m; el.classList.add('show');
  clearTimeout(_tt); _tt = setTimeout(() => el.classList.remove('show'), 2400);
}
