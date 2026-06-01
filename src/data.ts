/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  calories?: string;
  rating?: number;
  tags?: string[];
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Grill' | 'Pizza' | 'Tacos & Wings' | 'Salads' | 'Desserts' | 'Coffee Drinks' | 'Sides & Fruits';
  isPopular?: boolean;
  price: number;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  role: 'Student' | 'Faculty' | 'Parent' | 'Guest' | 'Regular';
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: "Roadrunner Café",
  category: "Student Cafeteria / Dining Hall",
  rating: 3.9,
  reviewCount: 347,
  priceRange: "$10–20 per person",
  status: "Open • Closes 10 PM",
  address: "1 UTSA Circle, San Antonio, TX 78249, United States",
  phone: "+1 210-458-7683",
  phoneRaw: "+12104587683",
  description: "Roadrunner Café is UTSA's leading student-first dining destination. We serve fresh, quick meals—from hearty breakfasts to flame-grilled burgers, fresh-fired pizzas, specialty tacos, and artisan coffees—designed to fuel your academic success.",
  officialInfoUrl: "https://mydininghub.com",
  officialUrlLabel: "mydininghub.com",
  timeSpentRange: "25 min to 2 hr",
  doorRateNote: "No meal plan? No problem! Door rates are open to all students, faculty, staff, and campus visitors."
};

export const OPERATING_HOURS = [
  { day: 'Monday', hours: '7:00 AM – 10:00 PM', short: 'Mon' },
  { day: 'Tuesday', hours: '7:00 AM – 10:00 PM', short: 'Tue' },
  { day: 'Wednesday', hours: '7:00 AM – 10:00 PM', short: 'Wed' },
  { day: 'Thursday', hours: '7:00 AM – 10:00 PM', short: 'Thu' },
  { day: 'Friday', hours: '7:00 AM – 10:00 PM', short: 'Fri' },
  { day: 'Saturday', hours: '10:00 AM – 10:00 PM', short: 'Sat' },
  { day: 'Sunday', hours: '10:00 AM – 10:00 PM', short: 'Sun' }
];

export const POPULAR_TIMES = [
  { label: '8 AM', value: 30, desc: 'Breakfast rush' },
  { label: '10 AM', value: 15, desc: 'Quiet coffee hour' },
  { label: '12 PM', value: 95, desc: 'Peak Lunch rush' },
  { label: '2 PM', value: 40, desc: 'Afternoon study sessions' },
  { label: '4 PM', value: 25, desc: 'Quiet downtime' },
  { label: '6 PM', value: 85, desc: 'Peak Dinner rush' },
  { label: '8 PM', value: 55, desc: 'Late night fuel' }
];

export const REVIEWS_LIST: Review[] = [
  {
    id: "rev-1",
    author: "Elena Vasquez",
    rating: 5,
    text: "Honestly, the Belgian waffles and buffalo chicken tacos are heavenly compared to typical cafeteria food. It is such a great value on campus!",
    role: "Student",
    date: "May 2026"
  },
  {
    id: "rev-2",
    author: "Dr. Marcus Chen",
    rating: 4,
    text: "The staff is incredibly friendly and welcoming. Perfect for grabbing a quick, protein-rich Grilled Chicken Salad between lectures.",
    role: "Faculty",
    date: "April 2026"
  },
  {
    id: "rev-3",
    author: "Tyler Collins",
    rating: 3,
    text: "The seating anxiety is real during the noon rush, so I suggest going off-peak for a calmer vibe. But the burger and waffle stations are always solid.",
    role: "Student",
    date: "May 2026"
  },
  {
    id: "rev-4",
    author: "Gabriela Torres",
    rating: 4,
    text: "Great variety of hot foods! Love the freshly built soft beef tacos and the jalapeño pizza. It is very convenient and reliable when you're hungry fast.",
    role: "Student",
    date: "March 2026"
  },
  {
    id: "rev-5",
    author: "Robert Miller",
    rating: 4,
    text: "Visiting my freshman daughter and we popped in for lunch. Clean stations, very courteous employees, and the doors are open to everyone. Solid deal under $20.",
    role: "Parent",
    date: "May 2026"
  },
  {
    id: "rev-6",
    author: "Aaliyah Jackson",
    rating: 3,
    text: "Sometimes option consistency varies day-to-day, but they compensate with amazing burgers, BBQ turkey options, and superb breakfast potatoes.",
    role: "Student",
    date: "April 2026"
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do I need a meal plan to eat at Roadrunner Café?",
    answer: "No! Everyone is welcome to dine here. We accept credit cards, debit cards, Rowdy Dollars, and walk-in cash door rates ($10–20 per person)."
  },
  {
    id: "faq-2",
    question: "What are the exact operation hours?",
    answer: "We are open Monday through Friday from 7:00 AM to 10:00 PM, and Saturday & Sunday from 10:00 AM to 10:00 PM."
  },
  {
    id: "faq-3",
    question: "Where is the café located on the UTSA campus?",
    answer: "We are situated in the heart of UTSA main campus at 1 UTSA Circle, San Antonio, TX 78249, within short walking distance to major residential halls and classes."
  },
  {
    id: "faq-4",
    question: "What food items are considered popular signatures?",
    answer: "UTSA students highly recommend our Golden Belgian Waffles, Buffalo Chicken Tacos, fresh-fired Jalapeño Pizza, Grilled Chicken Salads, and burger specials."
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m-1",
    name: "Belgian Waffle",
    description: "Fluffy golden grid-waffle baked on-the-spot. Served with hot maple syrup, whipped cream, and fresh seasonal berry topping.",
    calories: "450 kcal",
    tags: ["Student Favorite", "Breakfast Signature"],
    category: "Breakfast",
    isPopular: true,
    price: 8.50,
    image: "https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-2",
    name: "Grilled Chicken Salad",
    description: "Flame-grilled chicken breast over crisp mixed field greens, hand-cut cucumbers, grape tomatoes, loaded with healthy vinaigrette dressing.",
    calories: "320 kcal",
    tags: ["Fresh", "High Protein"],
    category: "Salads",
    isPopular: true,
    price: 11.25,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-3",
    name: "Burger and Fries",
    description: "Juicy premium beef patty topped with lettuce, vine-ripe tomato, cheddar cheese, and pickles on a toasted brioche bun with crispy golden fries.",
    calories: "780 kcal",
    tags: ["Grill Classic"],
    category: "Grill",
    isPopular: true,
    price: 11.95,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-4",
    name: "Buffalo Chicken Tacos",
    description: "Three warm corn tortillas loaded with spicy buffalo-style grilled chicken, shredded romaine lettuce, cotija cheese, and blue cheese drizzle.",
    calories: "510 kcal",
    tags: ["Popular Spicy"],
    category: "Tacos & Wings",
    isPopular: true,
    price: 10.50,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-5",
    name: "Jello Dessert",
    description: "Light and refreshing layered red strawberry or green lime gelatin dessert topped with sweet whipped topping.",
    calories: "90 kcal",
    tags: ["Light Sweet"],
    category: "Desserts",
    isPopular: false,
    price: 2.95,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-6",
    name: "Stroganoff Vegetable",
    description: "Rich, creamy sautéed wild mushrooms and tender vegetables tossed with egg noodles in a light sour cream gravy.",
    calories: "410 kcal",
    tags: ["Vegetarian Favor"],
    category: "Dinner",
    isPopular: false,
    price: 12.50,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-7",
    name: "Pecan Shortbread",
    description: "Buttery, crumbly freshly-baked shortbread cookies enriched with roasted Texas pecans. Perfect with coffee.",
    calories: "210 kcal",
    tags: ["Baked on Campus"],
    category: "Desserts",
    isPopular: false,
    price: 3.50,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-8",
    name: "Buffalo Wings",
    description: "Crispy chicken wings tossed in our signature tangy buffalo hot sauce. Served with celery sticks and house ranch dip.",
    calories: "680 kcal",
    tags: ["Game Day Classic"],
    category: "Tacos & Wings",
    isPopular: true,
    price: 12.95,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-9",
    name: "Soft Beef Tacos",
    description: "Two flour tortillas stuffed with seasoned Tex-Mex ground beef, cheddar-jack medley, shredded lettuce, and fresh pico de gallo.",
    calories: "440 kcal",
    tags: ["Tex-Mex Classic"],
    category: "Tacos & Wings",
    isPopular: false,
    price: 9.25,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-10",
    name: "Scrambled Eggs",
    description: "Light, fluffy farm-fresh scrambled eggs seasoned lightly with black pepper and chives. Hot off the morning griddle.",
    calories: "160 kcal",
    tags: ["Daily Essential"],
    category: "Breakfast",
    isPopular: false,
    price: 4.95,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-11",
    name: "Egg Bacon and Potatoes",
    description: "Perfect morning platter: scrambled eggs, thick-cut crispy hickory wood smoked bacon, and seasoned golden home-fries.",
    calories: "590 kcal",
    tags: ["Heavy Charger"],
    category: "Breakfast",
    isPopular: true,
    price: 9.75,
    image: "https://images.unsplash.com/photo-1533089860891-a7c6f0c88b29?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-12",
    name: "Turkey Swiss Cheese Sandwich",
    description: "Thinly sliced premium roasted turkey breast, creamy imported Swiss cheese, leaf lettuce, and light honey mustard on multigrain bread.",
    calories: "380 kcal",
    tags: ["Grab & Go"],
    category: "Lunch",
    isPopular: false,
    price: 8.95,
    image: "https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-13",
    name: "Jalapeño Pizza",
    description: "Fresh-pushed dough base topped with house marinara, spicy sliced green jalapeños, spicy pepperoni, and premium whole-milk mozzarella cheese.",
    calories: "620 kcal",
    tags: ["UTSA Spicy Level"],
    category: "Pizza",
    isPopular: true,
    price: 13.50,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-14",
    name: "BBQ Turkey and Pork Chop",
    description: "Savor our double-feature meat platter: smoky BBQ-glazed pulled turkey alongside a tender, flame-broiled bone-in pork chop.",
    calories: "730 kcal",
    tags: ["Chef Special"],
    category: "Dinner",
    isPopular: true,
    price: 15.95,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-15",
    name: "Watermelon",
    description: "Fresh, hand-carved sweet Texas seedless watermelon wedges, kept chilled on ice for a pure, refreshing morning or afternoon snack.",
    calories: "60 kcal",
    tags: ["Organic & Raw"],
    category: "Sides & Fruits",
    isPopular: false,
    price: 3.25,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-16",
    name: "Caramel Macchiato",
    description: "Steamed organic whole milk marked with a double shot of bold espresso, layered with sweet vanilla syrup and buttery caramel sauce drizzle.",
    calories: "280 kcal",
    tags: ["Coffee Counter"],
    category: "Coffee Drinks",
    isPopular: true,
    price: 5.25,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-17",
    name: "Double Shot Espresso",
    description: "Hand-pulled bold, full-bodied espresso with a rich crema, made from UT-crafted toasted local Texas espresso beans.",
    calories: "5 kcal",
    tags: ["Pure Energy"],
    category: "Coffee Drinks",
    isPopular: false,
    price: 3.75,
    image: "https://images.unsplash.com/photo-1510972527409-cef190317417?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-18",
    name: "Classic Cheese Pizza",
    description: "Crispy freshly-baked high-gluten crust, tangy homemade tomato sauce, and three-cheese Italian blend melted to bubbly golden perfection.",
    calories: "540 kcal",
    tags: ["All-Time Favorite"],
    category: "Pizza",
    isPopular: false,
    price: 11.50,
    image: "https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=600&q=80"
  }
];

export const GALLERY_IMAGES = [
  {
    id: "g-1",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    caption: "The coffee station with hand-made espresso and chill coffee house seating",
    height: "h-64"
  },
  {
    id: "g-2",
    url: "https://images.unsplash.com/photo-1513442547838-c14a1c23d95e?auto=format&fit=crop&w=800&q=80",
    caption: "Fresh gourmet breakfast platter featuring Belgian waffles, bacon, and potatoes",
    height: "h-80"
  },
  {
    id: "g-3",
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    caption: "Our signature flame-grilled Burger & Fries cooked hot off the flat top",
    height: "h-72"
  },
  {
    id: "g-4",
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    caption: "A fresh crispy slice of Jalapeño Pizza topped with bubbly rich cheese",
    height: "h-64"
  },
  {
    id: "g-5",
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    caption: "Vibrant Grilled Chicken Salad prepared daily with organic leafy field greens",
    height: "h-80"
  },
  {
    id: "g-6",
    url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    caption: "Tex-Mex soft beef tacos on flour tortillas topped with pico de gallo",
    height: "h-72"
  },
  {
    id: "g-7",
    url: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=800&q=80",
    caption: "Comfortable and spacious high-table student dining hall workspace",
    height: "h-64"
  },
  {
    id: "g-8",
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    caption: "Fluffy Belgian Waffle stacked with caramelized warm brown maple syrup",
    height: "h-80"
  },
  {
    id: "g-9",
    url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    caption: "Delightful range of student desserts, including Texans shortbreads and jellies",
    height: "h-72"
  }
];
