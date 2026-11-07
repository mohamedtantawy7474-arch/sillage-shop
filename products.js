// Product catalog and shop settings: the single source of truth for names and prices.
// The pages read it as a script, and server.py reads the same file, so the
// prices charged at checkout always match what the shop shows.
// Keep this file as plain JSON after "window.CATALOG =" (double quotes, no trailing commas).
// PLACEHOLDERS to replace: every price, deliveryFee, freeDeliveryOver, instapay.
window.CATALOG = {
  "currency": "EGP",
  "sizes": [2, 5, 10],
  "deliveryFee": 75,
  "freeDeliveryOver": 2000,
  "instapay": "yourname@instapay",
  "products": [
    {"id": "liquidbrun", "house": "French Avenue", "name": "Liquid Brun", "fam": "sweet", "c": ["#2a1a10", "#b7773a"], "price": [80, 175, 320], "tag": "limited", "notes": {"en": "Lavender, cardamom, vanilla", "ar": "لافندر، حبهان، فانيليا"}, "img": "images/liquidbrun.png"},
    {"id": "myslf", "house": "Yves Saint Laurent", "name": "MYSLF Eau de Parfum", "fam": "woody", "c": ["#1a1d26", "#d9cfb8"], "price": [220, 500, 950], "notes": {"en": "Bergamot, orange blossom, woods", "ar": "برغموت، زهر البرتقال، أخشاب"}, "img": "images/myslf.png"},
    {"id": "invictus", "house": "Rabanne", "name": "Invictus", "fam": "fresh", "c": ["#0f1d2e", "#9fb7c9"], "price": [160, 350, 650], "notes": {"en": "Grapefruit, sea notes, guaiac wood", "ar": "جريب فروت، نسمة بحر، خشب الغاياك"}, "img": "images/invictus.png"},
    {"id": "theicon", "house": "Antonio Banderas", "name": "The Icon", "fam": "spicy", "c": ["#1a1712", "#c9a15a"], "price": [60, 120, 220], "notes": {"en": "Bergamot, black pepper, lavender", "ar": "برغموت، فلفل أسود، لافندر"}, "img": "images/theicon.png"},
    {"id": "ckman", "house": "Calvin Klein", "name": "Man", "fam": "fresh", "c": ["#141a22", "#8796ab"], "price": [80, 160, 300], "notes": {"en": "Bergamot, nutmeg, cypress", "ar": "برغموت، جوزة الطيب، خشب السرو"}, "img": "images/ckman.png"},
    {"id": "dylanblue", "house": "Versace", "name": "Dylan Blue", "fam": "fresh", "c": ["#0b1430", "#3a68c4"], "price": [170, 380, 700], "notes": {"en": "Bergamot, fig leaf, incense", "ar": "برغموت، ورق التين، بخور"}, "img": "images/dylanblue.png"},
    {"id": "hawas", "house": "Rasasi", "name": "Hawas for Him", "fam": "fresh", "c": ["#0e2228", "#5fb4b8"], "price": [90, 180, 330], "notes": {"en": "Apple, cinnamon, sea notes", "ar": "تفاح، قرفة، نسمة بحر"}, "img": "images/hawas.png"},
    {"id": "fabulous", "house": "Tom Ford", "name": "F*cking Fabulous", "fam": "woody", "c": ["#17181f", "#b9b0a6"], "price": [950, 2200, 4200], "notes": {"en": "Bitter almond, leather, vanilla", "ar": "لوز مُر، جلد، فانيليا"}, "img": "images/fabulous.png"},
    {"id": "khamrah", "house": "Lattafa", "name": "Khamrah Qahwa", "fam": "sweet", "c": ["#24130c", "#8a4a22"], "price": [70, 150, 270], "notes": {"en": "Coffee, cardamom, praline", "ar": "قهوة، حبهان، برالين"}, "img": "images/khamrah.png"},
    {"id": "coral", "house": "Valentino", "name": "Born in Roma Coral Fantasy", "fam": "woody", "c": ["#2a1412", "#e07a62"], "price": [200, 450, 850], "notes": {"en": "Red apple, clary sage, tobacco", "ar": "تفاح أحمر، مريمية، تبغ"}, "img": "images/coral.png"}
  ],
  "set": {"id": "set", "price": 1650, "count": 10, "ml": 2, "c": ["#16130f", "#c89b6d"]},
  "governorates": [
    ["Cairo", "القاهرة"], ["Giza", "الجيزة"], ["Alexandria", "الإسكندرية"], ["Qalyubia", "القليوبية"], ["Dakahlia", "الدقهلية"], ["Sharqia", "الشرقية"], ["Gharbia", "الغربية"], ["Monufia", "المنوفية"], ["Beheira", "البحيرة"], ["Kafr El Sheikh", "كفر الشيخ"], ["Damietta", "دمياط"], ["Port Said", "بورسعيد"], ["Ismailia", "الإسماعيلية"], ["Suez", "السويس"], ["Faiyum", "الفيوم"], ["Beni Suef", "بني سويف"], ["Minya", "المنيا"], ["Asyut", "أسيوط"], ["Sohag", "سوهاج"], ["Qena", "قنا"], ["Luxor", "الأقصر"], ["Aswan", "أسوان"], ["Red Sea", "البحر الأحمر"], ["New Valley", "الوادي الجديد"], ["Matrouh", "مطروح"], ["North Sinai", "شمال سيناء"], ["South Sinai", "جنوب سيناء"]
  ]
};
