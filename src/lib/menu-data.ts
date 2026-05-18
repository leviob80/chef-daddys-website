export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceCents: number;
  category: MenuCategoryId;
  imageAlt: string;
  popular?: boolean;
}

export type MenuCategoryId =
  | 'bbq-specialties'
  | 'soul-food-plates'
  | 'meats-by-pound'
  | 'sides'
  | 'extras'
  | 'drinks'
  | 'desserts';

export interface MenuSection {
  id: MenuCategoryId;
  label: string;
  description: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    id: 'bbq-specialties',
    label: 'BBQ Specialties',
    description: 'Slow-smoked over hickory wood for hours — the way it was meant to be.',
    items: [
      {
        id: 'ribs-half',
        name: 'BBQ Ribs — Half Rack',
        description: '<!-- PLACEHOLDER: Insert actual description — e.g., "Tender St. Louis-style pork ribs, smoked low and slow with Chef Daddy\'s signature dry rub and finished with house BBQ sauce." -->',
        price: '$XX.XX',
        priceCents: 1899,
        category: 'bbq-specialties',
        imageAlt: 'Half rack of BBQ pork ribs at Chef Daddy\'s Bar-B-Que',
        popular: true,
      },
      {
        id: 'ribs-full',
        name: 'BBQ Ribs — Full Rack',
        description: '<!-- PLACEHOLDER: Full rack description -->',
        price: '$XX.XX',
        priceCents: 3299,
        category: 'bbq-specialties',
        imageAlt: 'Full rack of BBQ pork ribs at Chef Daddy\'s',
      },
      {
        id: 'pulled-pork',
        name: 'Pulled Pork Plate',
        description: '<!-- PLACEHOLDER: e.g., "Hickory-smoked pulled pork, hand-pulled and piled high. Served with two sides and bread." -->',
        price: '$XX.XX',
        priceCents: 1499,
        category: 'bbq-specialties',
        imageAlt: 'Pulled pork BBQ plate at Chef Daddy\'s St. Louis',
        popular: true,
      },
      {
        id: 'brisket',
        name: 'Beef Brisket Plate',
        description: '<!-- PLACEHOLDER: Brisket description — mention smoke ring, tenderness -->',
        price: '$XX.XX',
        priceCents: 1799,
        category: 'bbq-specialties',
        imageAlt: 'Sliced beef brisket plate at Chef Daddy\'s BBQ',
        popular: true,
      },
      {
        id: 'smoked-chicken',
        name: 'Smoked Chicken Plate',
        description: '<!-- PLACEHOLDER: Smoked chicken description -->',
        price: '$XX.XX',
        priceCents: 1399,
        category: 'bbq-specialties',
        imageAlt: 'Smoked chicken plate at Chef Daddy\'s Bar-B-Que',
      },
      {
        id: 'rib-tips',
        name: 'BBQ Rib Tips',
        description: '<!-- PLACEHOLDER: Rib tips description — a St. Louis staple -->',
        price: '$XX.XX',
        priceCents: 1299,
        category: 'bbq-specialties',
        imageAlt: 'BBQ rib tips at Chef Daddy\'s Soul Food St. Louis',
        popular: true,
      },
      {
        id: 'hot-links',
        name: 'Smoked Links (Hot Links)',
        description: '<!-- PLACEHOLDER: Smoked link/hot link description -->',
        price: '$XX.XX',
        priceCents: 1199,
        category: 'bbq-specialties',
        imageAlt: 'Smoked hot links at Chef Daddy\'s BBQ',
      },
    ],
  },
  {
    id: 'soul-food-plates',
    label: 'Soul Food Plates',
    description: 'Grandma\'s recipes, Chef Daddy\'s touch. Real soul food made with love.',
    items: [
      {
        id: 'fried-chicken',
        name: 'Fried Chicken Plate',
        description: '<!-- PLACEHOLDER: e.g., "Hand-breaded and fried to golden perfection. Served with two sides and cornbread." -->',
        price: '$XX.XX',
        priceCents: 1299,
        category: 'soul-food-plates',
        imageAlt: 'Fried chicken soul food plate at Chef Daddy\'s St. Louis',
        popular: true,
      },
      {
        id: 'smothered-chicken',
        name: 'Smothered Chicken Plate',
        description: '<!-- PLACEHOLDER: Smothered chicken in gravy description -->',
        price: '$XX.XX',
        priceCents: 1399,
        category: 'soul-food-plates',
        imageAlt: 'Smothered chicken plate at Chef Daddy\'s Soul Food',
      },
      {
        id: 'catfish',
        name: 'Catfish Plate',
        description: '<!-- PLACEHOLDER: Fried catfish description -->',
        price: '$XX.XX',
        priceCents: 1499,
        category: 'soul-food-plates',
        imageAlt: 'Fried catfish soul food plate at Chef Daddy\'s',
      },
      {
        id: 'oxtail',
        name: 'Oxtail Plate',
        description: '<!-- PLACEHOLDER: Slow-braised oxtail description -->',
        price: '$XX.XX',
        priceCents: 1999,
        category: 'soul-food-plates',
        imageAlt: 'Braised oxtail soul food plate at Chef Daddy\'s',
      },
      {
        id: 'meatloaf',
        name: 'Meatloaf Plate',
        description: '<!-- PLACEHOLDER: Homestyle meatloaf description -->',
        price: '$XX.XX',
        priceCents: 1299,
        category: 'soul-food-plates',
        imageAlt: 'Homestyle meatloaf soul food plate at Chef Daddy\'s',
      },
    ],
  },
  {
    id: 'meats-by-pound',
    label: 'Meats by the Pound',
    description: 'Feed the whole crew. Order in bulk — perfect for feeding a crowd.',
    items: [
      {
        id: 'pulled-pork-lb',
        name: 'Pulled Pork (per lb)',
        description: '<!-- PLACEHOLDER: Price per pound pulled pork -->',
        price: '$XX.XX/lb',
        priceCents: 1499,
        category: 'meats-by-pound',
        imageAlt: 'Pulled pork by the pound at Chef Daddy\'s BBQ St. Louis',
      },
      {
        id: 'brisket-lb',
        name: 'Beef Brisket (per lb)',
        description: '<!-- PLACEHOLDER: Price per pound brisket -->',
        price: '$XX.XX/lb',
        priceCents: 2199,
        category: 'meats-by-pound',
        imageAlt: 'Sliced beef brisket by the pound at Chef Daddy\'s',
      },
      {
        id: 'rib-tips-lb',
        name: 'Rib Tips (per lb)',
        description: '<!-- PLACEHOLDER: Price per pound rib tips -->',
        price: '$XX.XX/lb',
        priceCents: 1499,
        category: 'meats-by-pound',
        imageAlt: 'BBQ rib tips by the pound at Chef Daddy\'s Bar-B-Que',
      },
      {
        id: 'links-lb',
        name: 'Smoked Links (per lb)',
        description: '<!-- PLACEHOLDER: Price per pound smoked links -->',
        price: '$XX.XX/lb',
        priceCents: 1299,
        category: 'meats-by-pound',
        imageAlt: 'Smoked hot links by the pound at Chef Daddy\'s',
      },
    ],
  },
  {
    id: 'sides',
    label: 'Sides',
    description: 'No BBQ is complete without the sides. Made fresh daily.',
    items: [
      {
        id: 'mac-cheese',
        name: 'Mac & Cheese',
        description: 'Rich, creamy, and baked to a golden finish. Made from scratch with a blend of real cheeses — comfort food at its finest.',
        price: '$X.XX',
        priceCents: 499,
        category: 'sides',
        imageAlt: 'Homemade baked mac and cheese at Chef Daddy\'s Soul Food',
        popular: true,
      },
      {
        id: 'collard-greens',
        name: 'Collard Greens',
        description: '<!-- PLACEHOLDER: Slow-cooked collard greens description -->',
        price: '$X.XX',
        priceCents: 499,
        category: 'sides',
        imageAlt: 'Slow-cooked collard greens at Chef Daddy\'s St. Louis',
        popular: true,
      },
      {
        id: 'baked-beans',
        name: 'Baked Beans',
        description: '<!-- PLACEHOLDER: Smoked baked beans description -->',
        price: '$X.XX',
        priceCents: 449,
        category: 'sides',
        imageAlt: 'Smoked baked beans side at Chef Daddy\'s BBQ',
      },
      {
        id: 'candied-yams',
        name: 'Candied Yams',
        description: '<!-- PLACEHOLDER: Candied yams description -->',
        price: '$X.XX',
        priceCents: 499,
        category: 'sides',
        imageAlt: 'Candied yams soul food side at Chef Daddy\'s',
      },
      {
        id: 'cornbread',
        name: 'Cornbread',
        description: '<!-- PLACEHOLDER: Homemade cornbread description -->',
        price: '$X.XX',
        priceCents: 299,
        category: 'sides',
        imageAlt: 'Homemade cornbread at Chef Daddy\'s Bar-B-Que',
      },
      {
        id: 'potato-salad',
        name: 'Potato Salad',
        description: '<!-- PLACEHOLDER: Southern-style potato salad description -->',
        price: '$X.XX',
        priceCents: 449,
        category: 'sides',
        imageAlt: 'Southern potato salad side at Chef Daddy\'s',
      },
      {
        id: 'coleslaw',
        name: 'Coleslaw',
        description: '<!-- PLACEHOLDER: Coleslaw description -->',
        price: '$X.XX',
        priceCents: 399,
        category: 'sides',
        imageAlt: 'Creamy coleslaw side at Chef Daddy\'s BBQ',
      },
      {
        id: 'green-beans',
        name: 'Green Beans',
        description: '<!-- PLACEHOLDER: Slow-cooked green beans description -->',
        price: '$X.XX',
        priceCents: 449,
        category: 'sides',
        imageAlt: 'Slow-cooked green beans side at Chef Daddy\'s Soul Food',
      },
    ],
  },
  {
    id: 'extras',
    label: 'Extras & Add-Ons',
    description: 'Make it exactly how you like it.',
    items: [
      {
        id: 'extra-sauce',
        name: 'Extra BBQ Sauce',
        description: '<!-- PLACEHOLDER: Sauce description/options -->',
        price: '$X.XX',
        priceCents: 99,
        category: 'extras',
        imageAlt: 'Extra BBQ sauce at Chef Daddy\'s',
      },
      {
        id: 'extra-bread',
        name: 'Extra Bread',
        description: '<!-- PLACEHOLDER: Bread description -->',
        price: '$X.XX',
        priceCents: 99,
        category: 'extras',
        imageAlt: 'Extra bread at Chef Daddy\'s Bar-B-Que',
      },
      {
        id: 'jalapenos',
        name: 'Jalapeños',
        description: '<!-- PLACEHOLDER: Jalapeño add-on description -->',
        price: '$X.XX',
        priceCents: 99,
        category: 'extras',
        imageAlt: 'Jalapeño add-on at Chef Daddy\'s BBQ',
      },
      {
        id: 'pickles',
        name: 'Pickles',
        description: '<!-- PLACEHOLDER: Pickles add-on description -->',
        price: '$X.XX',
        priceCents: 99,
        category: 'extras',
        imageAlt: 'Pickles add-on at Chef Daddy\'s',
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    description: 'Cold and refreshing to cool down that smoky heat.',
    items: [
      {
        id: 'sweet-tea',
        name: 'Sweet Tea',
        description: '<!-- PLACEHOLDER: House-made sweet tea description -->',
        price: '$X.XX',
        priceCents: 299,
        category: 'drinks',
        imageAlt: 'Sweet tea at Chef Daddy\'s Soul Food St. Louis',
        popular: true,
      },
      {
        id: 'lemonade',
        name: 'Lemonade',
        description: '<!-- PLACEHOLDER: Fresh lemonade description -->',
        price: '$X.XX',
        priceCents: 299,
        category: 'drinks',
        imageAlt: 'Lemonade at Chef Daddy\'s Bar-B-Que',
      },
{
        id: 'soda',
        name: 'Soda',
        description: '<!-- PLACEHOLDER: Soda options/brands description -->',
        price: '$X.XX',
        priceCents: 199,
        category: 'drinks',
        imageAlt: 'Canned soda at Chef Daddy\'s BBQ',
      },
      {
        id: 'water',
        name: 'Bottled Water',
        description: 'Ice cold bottled water.',
        price: '$X.XX',
        priceCents: 149,
        category: 'drinks',
        imageAlt: 'Bottled water at Chef Daddy\'s',
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    description: 'Save room. You\'re going to want to.',
    items: [
      {
        id: 'sweet-potato-pie-slice',
        name: 'Sweet Potato Pie (Slice)',
        description: '<!-- PLACEHOLDER: Sweet potato pie slice description -->',
        price: '$X.XX',
        priceCents: 499,
        category: 'desserts',
        imageAlt: 'Sweet potato pie slice at Chef Daddy\'s Soul Food',
        popular: true,
      },
      {
        id: 'sweet-potato-pie-whole',
        name: 'Sweet Potato Pie (Whole)',
        description: '<!-- PLACEHOLDER: Whole sweet potato pie description -->',
        price: '$XX.XX',
        priceCents: 2499,
        category: 'desserts',
        imageAlt: 'Whole sweet potato pie at Chef Daddy\'s',
      },
      {
        id: 'peach-cobbler',
        name: 'Peach Cobbler',
        description: '<!-- PLACEHOLDER: Homemade peach cobbler description -->',
        price: '$X.XX',
        priceCents: 499,
        category: 'desserts',
        imageAlt: 'Homemade peach cobbler at Chef Daddy\'s Bar-B-Que',
        popular: true,
      },
      {
        id: 'banana-pudding',
        name: 'Banana Pudding',
        description: '<!-- PLACEHOLDER: Banana pudding description -->',
        price: '$X.XX',
        priceCents: 449,
        category: 'desserts',
        imageAlt: 'Banana pudding dessert at Chef Daddy\'s Soul Food',
      },
    ],
  },
];

export const popularItems = menuSections
  .flatMap((s) => s.items)
  .filter((i) => i.popular);
