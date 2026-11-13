// ============================================================
// CUSTOMIZATION FILE — Edit names, messages, and image lists
// ============================================================

export const COUPLE = {
  husband: {
    name: "Dr. John",
    shortName: "John",
    title: "Dr.",
    // Single portrait photo for the appreciation card
    photo: "IMG_4414.JPG",     // ← Replace with his solo photo
    appreciation: `A man of extraordinary character, unwavering strength, and a heart as vast as the sky. 
You have walked through every season of life with wisdom, grace, and an infectious joy that lights up every room you enter. 
As a husband, you are the steady anchor and the warm shelter that makes home feel like heaven. 
As a mentor, your words have planted seeds of greatness in hearts that will carry your legacy forward. 
As a role model, you have shown what it truly means to love faithfully, lead humbly, and live purposefully. 
Today, we celebrate not just the years you have shared, but the countless lives you have touched simply by being who you are.`,
  },
  wife: {
    name: "Merjerie",
    shortName: "Merjerie",
    title: "Mrs.",
    // Single portrait photo for the appreciation card
    photo: "IMG_4415.JPG",     // ← Replace with her solo photo
    appreciation: `She is grace personified — a woman whose love runs deeper than any ocean and whose strength holds the entire family together like a beautiful song. 
In her presence, peace settles and warmth fills every corner of the room. 
She loves without condition, gives without counting the cost, and smiles through every season — turning ordinary moments into extraordinary memories. 
Her kindness is a garden where everyone around her grows. 
As a wife, she is the heartbeat of a beautiful home. As a mother, she is the gentle hand that shapes the future. 
Today, we celebrate her — not just for what she does, but for who she beautifully is.`,
  },
  anniversary: {
    year: new Date().getFullYear(),
    // If you know the exact year they married, set it here and the count will auto-compute
    weddingYear: null, // e.g. 2001
    hashtag: "#ForeverInLove",
  },
};

// ============================================================
// GALLERY IMAGES
// Add or remove filenames and captions as needed.
// All files must be placed in the /public folder of this project.
// ============================================================
export const GALLERY_IMAGES = [
  { src: "IMG_4414.JPG", caption: "A moment to cherish forever" },
  { src: "IMG_4415.JPG", caption: "Love in every glance" },
  { src: "IMG_4416.JPG", caption: "Together is our favourite place" },
  { src: "IMG_4417.JPG", caption: "Beautiful memories" },
  { src: "IMG_4418.JPG", caption: "Side by side, always" },
  { src: "IMG_4419.JPG", caption: "Our story" },
  { src: "IMG_4420.JPG", caption: "A love like no other" },
  { src: "IMG_4421.JPG", caption: "Smiles that light up the world" },
  { src: "IMG_4422.JPG", caption: "Walking into forever" },
  { src: "IMG_4423.JPG", caption: "Celebrating love" },
  { src: "IMG_4424.JPG", caption: "Every moment matters" },
  { src: "IMG_4425.JPG", caption: "Endless love" },
  { src: "IMG_4426.JPG", caption: "Hearts intertwined" },
  { src: "IMG_4427.JPG", caption: "A journey of two souls" },
  { src: "IMG_4428.JPG", caption: "Joy in every season" },
  { src: "IMG_4429.JPG", caption: "Written in the stars" },
  { src: "IMG_4430.JPG", caption: "Laughter and love" },
  { src: "IMG_4431.JPG", caption: "Our beautiful life" },
  { src: "IMG_4432.JPG", caption: "Cherished moments" },
  { src: "IMG_4433.JPG", caption: "Hand in hand, heart to heart" },
  { src: "IMG_4434.JPG", caption: "A story worth telling" },
  { src: "IMG_4435.JPG", caption: "Blessed beyond measure" },
  { src: "IMG_4436.JPG", caption: "Treasured memories" },
  { src: "IMG_4437.JPG", caption: "Two become one" },
  { src: "IMG_4438.JPG", caption: "Love that grows deeper" },
  { src: "IMG_4439.JPG", caption: "Forever begins here" },
  { src: "IMG_4440.JPG", caption: "A day to remember" },
  { src: "IMG_4441.JPG", caption: "So much beauty" },
  { src: "IMG_4442.JPG", caption: "Grace and elegance" },
  { src: "IMG_4443.JPG", caption: "Celebrating you both" },
  { src: "IMG_4444.JPG", caption: "Wrapped in love" },
  { src: "IMG_4445.JPG", caption: "Still choosing each other" },
  { src: "IMG_4446.JPG", caption: "Every day, a gift" },
  { src: "IMG_4447.JPG", caption: "Warmth and togetherness" },
  { src: "IMG_4448.JPG", caption: "Years of beautiful memories" },
  { src: "IMG_4449.JPG", caption: "Devoted and in love" },
  { src: "IMG_4450.JPG", caption: "A family built on love" },
  { src: "IMG_4451.JPG", caption: "Radiating joy" },
  { src: "IMG_4452.JPG", caption: "Precious beyond words" },
  { src: "IMG_4453.JPG", caption: "Love is patient, love is kind" },
  { src: "IMG_4454.JPG", caption: "Two hearts, one home" },
  { src: "IMG_4455.JPG", caption: "Strength in unity" },
  { src: "IMG_4456.JPG", caption: "A legacy of love" },
  { src: "IMG_4457.JPG", caption: "Glowing with happiness" },
  { src: "IMG_4458.JPG", caption: "An everlasting bond" },
  { src: "IMG_4459.JPG", caption: "Celebrating this beautiful union" },
  { src: "IMG_4460.JPG", caption: "Love that never fades" },
  { src: "IMG_4461.JPG", caption: "God's greatest blessing" },
  { src: "IMG_4462.JPG", caption: "Forever and always" },
  { src: "IMG_4463.JPG", caption: "A lifetime of happiness" },
  { src: "IMG_4464.JPG", caption: "Still madly in love" },
  { src: "IMG_4465.JPG", caption: "Unbreakable" },
  { src: "IMG_4466.JPG", caption: "Beautiful inside and out" },
  { src: "IMG_4467.JPG", caption: "A union blessed by God" },
  { src: "IMG_4468.JPG", caption: "Our favourite love story" },
  { src: "IMG_4469.JPG", caption: "And so the love continues…" },
];

// Hero background images (shown in a rotating slideshow)
export const HERO_IMAGES = [
  "IMG_4464.JPG",
  "IMG_4446.JPG",
  "IMG_4431.JPG",
  "IMG_4420.JPG",
  "IMG_4417.JPG",
];

// Final section couple photo
export const FINAL_COUPLE_PHOTO = "IMG_4444.JPG"; // ← Replace with favourite couple photo

// ============================================================
// ANNIVERSARY WISH CARDS
// ============================================================
export const WISH_CARDS = [
  {
    icon: "💝",
    front: "May your love grow stronger",
    back: "With every passing year, may you discover new reasons to fall in love with each other, deeper and more beautifully than before.",
    color: "from-rose-50 to-pink-100",
    borderColor: "border-rose-200",
  },
  {
    icon: "🏡",
    front: "May your home overflow with peace",
    back: "May your home be a sanctuary of laughter, warmth, and unending peace — a place where love is always the loudest voice.",
    color: "from-amber-50 to-yellow-100",
    borderColor: "border-amber-200",
  },
  {
    icon: "🙏",
    front: "May God continue to bless your union",
    back: "May the God who brought your hearts together continue to hold them close, covering your marriage with His grace and unending favour.",
    color: "from-purple-50 to-violet-100",
    borderColor: "border-purple-200",
  },
  {
    icon: "😄",
    front: "May you never run out of reasons to smile",
    back: "May your days be filled with simple joys — shared laughter, quiet evenings, and the beautiful comfort of knowing you have each other.",
    color: "from-green-50 to-emerald-100",
    borderColor: "border-green-200",
  },
  {
    icon: "✨",
    front: "May your journey remain beautiful",
    back: "May every chapter ahead be more beautiful than the last — written with love, faith, and the extraordinary gift of choosing each other every single day.",
    color: "from-sky-50 to-blue-100",
    borderColor: "border-sky-200",
  },
  {
    icon: "👑",
    front: "May you always find each other",
    back: "In every storm and every sunshine, may you always turn to each other — finding home in the warmth of each other's presence.",
    color: "from-orange-50 to-amber-100",
    borderColor: "border-orange-200",
  },
];
