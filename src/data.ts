export type MenuItem = {
  nameEn: string;
  nameAr: string;
  price: string;
  featured?: boolean;
  note?: string;
};

export type MenuCategory = {
  id: string;
  nameEn: string;
  nameAr: string;
  intro: string;
  items: MenuItem[];
};

export type Branch = {
  name: string;
  region: string;
  status: "open" | "soon" | "kitchen";
  callLabel: string;
};

export const mediaAssets = {
  logo: "/brand-assets/logo.png",
  heroSpread: "/brand-assets/food-1.webp",
  sandwichBoard: "/brand-assets/food-2.webp",
  sauceDip: "/brand-assets/food-3.webp",
  archive: "/brand-assets/archive.webp",
};

export const siteFacts = [
  { value: "1987", label: "Adshit origin" },
  { value: "1535", label: "hotline ordering" },
  { value: "50+", label: "branches worldwide" },
  { value: "12+", label: "countries reached" },
];

export const signatureOrders = [
  {
    nameEn: "Whole Charcoal Chicken",
    nameAr: "دجاج عالفحم كامل",
    price: "$21",
    detail: "Garlic, pickles, fries, and the table set for sharing.",
    image: mediaAssets.heroSpread,
  },
  {
    nameEn: "Garlic & Chilli Bread",
    nameAr: "خبز كبير مع ثوم وحر",
    price: "$2.5",
    detail: "The side order that should never be optional.",
    image: mediaAssets.sandwichBoard,
  },
  {
    nameEn: "Chicken Bites",
    nameAr: "لقمة العبدالله",
    price: "$1.5",
    detail: "Charred edge, sauce dip, one-hand ordering energy.",
    image: mediaAssets.sauceDip,
  },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "bbq",
    nameEn: "BBQ Chicken",
    nameAr: "دجاج عالفحم",
    intro: "The order people came for before the brand became a map of branches.",
    items: [
      { nameEn: "Chicken Whole", nameAr: "دجاج عالفحم كامل", price: "$21", featured: true },
      { nameEn: "Chicken Half", nameAr: "دجاج عالفحم نصف", price: "$11", featured: true },
      { nameEn: "Chicken Legs Whole", nameAr: "افخاذ دجاج كامل", price: "$21" },
      { nameEn: "Chicken Legs Half", nameAr: "افخاذ دجاج نصف", price: "$11" },
      { nameEn: "Chicken Breasts Whole", nameAr: "صدر دجاج كامل", price: "$24" },
      { nameEn: "Chicken Breasts Half", nameAr: "صدر دجاج نصف", price: "$13" },
      { nameEn: "Garlic Bread", nameAr: "خبز كبير مع ثوم", price: "$2.5", featured: true },
      { nameEn: "Chilli Bread", nameAr: "خبز كبير مع حر", price: "$2.5" },
      { nameEn: "Garlic, Chilli & Fries Bread", nameAr: "خبز كبير مع ثوم وحر وبطاطا", price: "$3" },
    ],
  },
  {
    id: "sandwiches",
    nameEn: "Sandwiches",
    nameAr: "سندويش",
    intro: "Pressed, fast, and built around the sauces that carry the memory.",
    items: [
      { nameEn: "Chicken Bites", nameAr: "لقمة العبدالله", price: "$1.5", featured: true },
      { nameEn: "Charcoal Chicken Sandwich Large", nameAr: "سندويش دجاج عالفحم كبير", price: "$9", featured: true },
      { nameEn: "Charcoal Chicken Sandwich Medium", nameAr: "سندويش دجاج عالفحم وسط", price: "$6" },
      { nameEn: "Chicken Combo Large", nameAr: "وجبة كبير", price: "$12" },
      { nameEn: "Chicken Combo Medium", nameAr: "وجبة وسط", price: "$9" },
      { nameEn: "Chicken Brown Bread Sandwich", nameAr: "سندويش دجاج بخبز أسمر", price: "$9" },
      { nameEn: "Combo Brown", nameAr: "وجبة أسمر", price: "$12" },
      { nameEn: "Fries Sandwich Large", nameAr: "سندويش بطاطا كبير", price: "$4" },
      { nameEn: "Fries Sandwich Medium", nameAr: "سندويش بطاطا وسط", price: "$3" },
    ],
  },
  {
    id: "sides",
    nameEn: "Sides & Sauces",
    nameAr: "مقبلات",
    intro: "The garlic, chilli, pickles, and crunch that turn chicken into a ritual.",
    items: [
      { nameEn: "Garlic", nameAr: "ثوم", price: "$1", featured: true },
      { nameEn: "Spicy Sauce", nameAr: "حر", price: "$1", featured: true },
      { nameEn: "Fries Plate", nameAr: "صحن بطاطا", price: "$6" },
      { nameEn: "Fries Box", nameAr: "علبة بطاطا", price: "$4" },
      { nameEn: "Fried Cheese Rolls", nameAr: "صحن رقاقات مقلية", price: "$4" },
      { nameEn: "Grilled Cheese Rolls", nameAr: "صحن رقاقات مشوية", price: "$4" },
      { nameEn: "ColeSlaw Plate", nameAr: "صحن سلطة ملفوف", price: "$4" },
      { nameEn: "Fattouch Large", nameAr: "فتوش كبير", price: "$6" },
      { nameEn: "Hommos", nameAr: "صحن حمص", price: "$4.5" },
    ],
  },
  {
    id: "drinks",
    nameEn: "Drinks",
    nameAr: "مشروبات",
    intro: "Cold finish, simple choices, fast handoff.",
    items: [
      { nameEn: "Ayran", nameAr: "عيران", price: "$2", featured: true },
      { nameEn: "Soft Drinks", nameAr: "مشروبات غازية", price: "$2" },
      { nameEn: "Water Large", nameAr: "مياه كبيرة", price: "$2" },
      { nameEn: "Water Small", nameAr: "مياه صغيرة", price: "$1" },
    ],
  },
];

export const branches: Branch[] = [
  { name: "Corniche El Mazraa", region: "Beirut", status: "open", callLabel: "Call 1535" },
  { name: "Khaldeh", region: "Highway", status: "open", callLabel: "Call 1535" },
  { name: "Aadshit", region: "Nabatieh / South Lebanon", status: "open", callLabel: "Call 1535" },
  { name: "Zefta", region: "Nabatieh / South Lebanon", status: "open", callLabel: "Call 1535" },
  { name: "Sidon", region: "South Lebanon", status: "open", callLabel: "Call 1535" },
  { name: "Haret Hreik", region: "Southern Suburbs of Beirut", status: "open", callLabel: "Call 1535" },
  { name: "Aramoun", region: "Mount Lebanon", status: "open", callLabel: "Call 1535" },
  { name: "Abraj, Furn El Chebbak", region: "Beirut Center", status: "open", callLabel: "Call 1535" },
  { name: "Bikfaya", region: "Mount Lebanon", status: "open", callLabel: "Call 1535" },
  { name: "Amioun", region: "El Koura / North Lebanon", status: "open", callLabel: "Call 1535" },
  { name: "Jal El Dib", region: "Mount Lebanon", status: "open", callLabel: "Call 1535" },
  { name: "Ghazieh", region: "South Lebanon", status: "kitchen", callLabel: "Kitchen" },
  { name: "Tyre", region: "South Lebanon", status: "soon", callLabel: "Soon" },
  { name: "Raouche", region: "Beirut", status: "soon", callLabel: "Soon" },
];

export const reviews = [
  {
    quote: "Simply the best authentic Lebanese chicken sandwich in town. Amazing taste and service.",
    name: "Mohamad Mislmany",
    country: "Qatar",
  },
  {
    quote: "Excellent food and amazing service. Very clean and welcoming place.",
    name: "Sam",
    country: "Lebanon",
  },
  {
    quote: "The original charcoal chicken.",
    name: "Adam Hajj",
    country: "Lebanon",
  },
];
