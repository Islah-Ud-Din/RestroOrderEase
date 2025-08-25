import { MenuItem } from '@/contexts/CartContext';

export const menuItems: MenuItem[] = [
    // Hot Deals
    {
        id: 'hot-deal-1',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with melted cheese, fresh lettuce, tomato, and our special sauce',
        price: 12.99,
        originalPrice: 16.99,
        discount: 25,
        image: '/images/menu/1.jpg',
        category: 'Burgers',
        isHotDeal: true,
        ordersCount: 342,
        taste: {
            flavor: 'Savory',
            spiceLevel: 'Mild',
            texture: 'Juicy and tender',
            notes: ['Tangy special sauce', 'Melted cheese', 'Fresh vegetables']
        },
        rating: {
            average: 4.5,
            totalReviews: 156,
            breakdown: { 5: 89, 4: 45, 3: 15, 2: 5, 1: 2 }
        },
        preparationTime: '8-10 minutes',
        calories: 580,
        allergens: ['Gluten', 'Dairy'],
        isPopular: true,
        tags: ['Bestseller', 'Classic', 'Hot Deal']
    },
    {
        id: 'hot-deal-2',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil on our crispy thin crust',
        price: 14.99,
        originalPrice: 19.99,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=600&fit=crop',
        category: 'Pizza',
        isHotDeal: true,
        ordersCount: 298,
        taste: {
            flavor: 'Fresh and aromatic',
            spiceLevel: 'Mild',
            texture: 'Crispy crust, creamy cheese',
            notes: ['Fresh basil', 'Tangy tomato sauce', 'Creamy mozzarella']
        },
        rating: {
            average: 4.7,
            totalReviews: 203,
            breakdown: { 5: 134, 4: 51, 3: 12, 2: 4, 1: 2 }
        },
        preparationTime: '12-15 minutes',
        calories: 720,
        allergens: ['Gluten', 'Dairy'],
        isPopular: true,
        tags: ['Italian', 'Classic', 'Hot Deal']
    },
    {
        id: 'hot-deal-3',
        name: 'Chicken Caesar Salad',
        description: 'Grilled chicken breast, romaine lettuce, parmesan cheese, and caesar dressing',
        price: 10.99,
        originalPrice: 13.99,
        discount: 21,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
        category: 'Salads',
        isHotDeal: true,
        ordersCount: 189,
        taste: {
            flavor: 'Savory and creamy',
            spiceLevel: 'Mild',
            texture: 'Crisp lettuce, tender chicken',
            notes: ['Creamy Caesar dressing', 'Sharp parmesan', 'Grilled chicken']
        },
        rating: {
            average: 4.4,
            totalReviews: 87,
            breakdown: { 5: 45, 4: 32, 3: 8, 2: 1, 1: 1 }
        },
        preparationTime: '6-8 minutes',
        calories: 420,
        allergens: ['Dairy', 'Eggs'],
        isPopular: false,
        tags: ['Healthy', 'Protein-rich', 'Hot Deal']
    },
    {
        id: 'hot-deal-4',
        name: 'Chocolate Milkshake',
        description: 'Rich and creamy chocolate milkshake topped with whipped cream',
        price: 5.99,
        originalPrice: 7.99,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&h=600&fit=crop',
        category: 'Beverages',
        isHotDeal: true,
        ordersCount: 267,
        taste: {
            flavor: 'Rich chocolate',
            spiceLevel: 'None',
            texture: 'Thick and creamy',
            notes: ['Decadent chocolate', 'Fluffy whipped cream', 'Smooth texture']
        },
        rating: {
            average: 4.6,
            totalReviews: 143,
            breakdown: { 5: 89, 4: 41, 3: 9, 2: 3, 1: 1 }
        },
        preparationTime: '3-5 minutes',
        calories: 380,
        allergens: ['Dairy'],
        isPopular: true,
        tags: ['Sweet', 'Dessert drink', 'Hot Deal']
    },

    // Regular Menu Items
    {
        id: 'burger-1',
        name: 'Bacon Deluxe Burger',
        description: 'Beef patty with crispy bacon, cheddar cheese, and caramelized onions',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&h=600&fit=crop',
        category: 'Burgers',
        ordersCount: 247,
        taste: {
            flavor: 'Savory and smoky',
            spiceLevel: 'Mild',
            texture: 'Juicy and crispy',
            notes: ['Smoky bacon', 'Rich cheddar', 'Sweet caramelized onions']
        },
        rating: {
            average: 4.6,
            totalReviews: 89,
            breakdown: { 5: 52, 4: 28, 3: 7, 2: 1, 1: 1 }
        },
        preparationTime: '10-12 minutes',
        calories: 650,
        allergens: ['Gluten', 'Dairy'],
        isPopular: true,
        tags: ['Bestseller', 'Protein-rich', 'Comfort food']
    },
    {
        id: 'burger-2',
        name: 'Veggie Burger',
        description: 'Plant-based patty with avocado, sprouts, and vegan cheese',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&h=600&fit=crop',
        category: 'Burgers',
        ordersCount: 156,
        taste: {
            flavor: 'Fresh and earthy',
            spiceLevel: 'Mild',
            texture: 'Hearty and fresh',
            notes: ['Creamy avocado', 'Fresh sprouts', 'Herbed plant patty']
        },
        rating: {
            average: 4.3,
            totalReviews: 72,
            breakdown: { 5: 34, 4: 28, 3: 8, 2: 1, 1: 1 }
        },
        preparationTime: '8-10 minutes',
        calories: 480,
        allergens: ['Gluten'],
        isPopular: false,
        tags: ['Vegan', 'Healthy', 'Plant-based']
    },
    {
        id: 'pizza-1',
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni with mozzarella cheese and tomato sauce',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=600&fit=crop',
        category: 'Pizza',
        ordersCount: 423,
        taste: {
            flavor: 'Savory and spicy',
            spiceLevel: 'Medium',
            texture: 'Crispy crust, chewy cheese',
            notes: ['Spicy pepperoni', 'Melted mozzarella', 'Tangy tomato sauce']
        },
        rating: {
            average: 4.8,
            totalReviews: 234,
            breakdown: { 5: 178, 4: 42, 3: 11, 2: 2, 1: 1 }
        },
        preparationTime: '15-18 minutes',
        calories: 850,
        allergens: ['Gluten', 'Dairy'],
        isPopular: true,
        tags: ['Bestseller', 'Classic', 'Spicy']
    },
    {
        id: 'pizza-2',
        name: 'BBQ Chicken Pizza',
        description: 'BBQ sauce, grilled chicken, red onions, and cilantro',
        price: 20.99,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',
        category: 'Pizza',
        ordersCount: 198,
        taste: {
            flavor: 'Sweet and smoky',
            spiceLevel: 'Mild',
            texture: 'Tender chicken, crispy base',
            notes: ['Smoky BBQ sauce', 'Tender grilled chicken', 'Fresh cilantro']
        },
        rating: {
            average: 4.5,
            totalReviews: 112,
            breakdown: { 5: 67, 4: 32, 3: 10, 2: 2, 1: 1 }
        },
        preparationTime: '16-20 minutes',
        calories: 780,
        allergens: ['Gluten', 'Dairy'],
        isPopular: false,
        tags: ['BBQ', 'Protein-rich', 'Gourmet']
    },
    {
        id: 'pasta-1',
        name: 'Spaghetti Carbonara',
        description: 'Pasta with eggs, cheese, pancetta, and black pepper',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        category: 'Pasta',
        ordersCount: 167,
        taste: {
            flavor: 'Rich and creamy',
            spiceLevel: 'Mild',
            texture: 'Silky pasta, crispy pancetta',
            notes: ['Creamy egg sauce', 'Crispy pancetta', 'Sharp black pepper']
        },
        rating: {
            average: 4.7,
            totalReviews: 98,
            breakdown: { 5: 68, 4: 22, 3: 6, 2: 1, 1: 1 }
        },
        preparationTime: '12-15 minutes',
        calories: 620,
        allergens: ['Gluten', 'Eggs', 'Dairy'],
        isPopular: true,
        tags: ['Italian', 'Classic', 'Rich']
    },
    {
        id: 'pasta-2',
        name: 'Fettuccine Alfredo',
        description: 'Fettuccine pasta with creamy alfredo sauce and parmesan cheese',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop',
        category: 'Pasta',
        ordersCount: 134,
        taste: {
            flavor: 'Creamy and buttery',
            spiceLevel: 'None',
            texture: 'Smooth and velvety',
            notes: ['Rich butter cream', 'Sharp parmesan', 'Silky pasta']
        },
        rating: {
            average: 4.4,
            totalReviews: 76,
            breakdown: { 5: 41, 4: 26, 3: 7, 2: 1, 1: 1 }
        },
        preparationTime: '10-12 minutes',
        calories: 580,
        allergens: ['Gluten', 'Dairy'],
        isPopular: false,
        tags: ['Italian', 'Creamy', 'Comfort food']
    },
    {
        id: 'salad-1',
        name: 'Greek Salad',
        description: 'Mixed greens, feta cheese, olives, cucumber, and red onion',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop',
        category: 'Salads',
        ordersCount: 89,
        taste: {
            flavor: 'Fresh and tangy',
            spiceLevel: 'Mild',
            texture: 'Crisp and refreshing',
            notes: ['Salty feta cheese', 'Briny olives', 'Fresh vegetables']
        },
        rating: {
            average: 4.2,
            totalReviews: 54,
            breakdown: { 5: 26, 4: 19, 3: 7, 2: 1, 1: 1 }
        },
        preparationTime: '5-7 minutes',
        calories: 320,
        allergens: ['Dairy'],
        isPopular: false,
        tags: ['Healthy', 'Mediterranean', 'Fresh']
    },
    {
        id: 'salad-2',
        name: 'Cobb Salad',
        description: 'Mixed greens, grilled chicken, bacon, eggs, avocado, and blue cheese',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
        category: 'Salads',
        ordersCount: 112,
        taste: {
            flavor: 'Rich and savory',
            spiceLevel: 'Mild',
            texture: 'Mixed textures, hearty',
            notes: ['Crispy bacon', 'Creamy avocado', 'Tangy blue cheese']
        },
        rating: {
            average: 4.5,
            totalReviews: 67,
            breakdown: { 5: 38, 4: 22, 3: 5, 2: 1, 1: 1 }
        },
        preparationTime: '8-10 minutes',
        calories: 520,
        allergens: ['Dairy', 'Eggs'],
        isPopular: false,
        tags: ['Protein-rich', 'Hearty', 'American']
    },
    {
        id: 'dessert-1',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten chocolate center, served with vanilla ice cream',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop',
        category: 'Desserts',
        ordersCount: 203,
        taste: {
            flavor: 'Rich chocolate',
            spiceLevel: 'None',
            texture: 'Warm cake, cold ice cream',
            notes: ['Molten chocolate center', 'Vanilla ice cream', 'Decadent sweetness']
        },
        rating: {
            average: 4.8,
            totalReviews: 134,
            breakdown: { 5: 102, 4: 24, 3: 6, 2: 1, 1: 1 }
        },
        preparationTime: '8-10 minutes',
        calories: 480,
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        isPopular: true,
        tags: ['Dessert', 'Chocolate', 'Warm']
    },
    {
        id: 'dessert-2',
        name: 'New York Cheesecake',
        description: 'Creamy cheesecake with graham cracker crust and berry compote',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&h=600&fit=crop',
        category: 'Desserts',
        ordersCount: 145,
        taste: {
            flavor: 'Creamy and tangy',
            spiceLevel: 'None',
            texture: 'Smooth and rich',
            notes: ['Creamy cheese filling', 'Crunchy graham crust', 'Sweet berry compote']
        },
        rating: {
            average: 4.6,
            totalReviews: 89,
            breakdown: { 5: 56, 4: 25, 3: 6, 2: 1, 1: 1 }
        },
        preparationTime: '5-7 minutes',
        calories: 420,
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        isPopular: false,
        tags: ['Dessert', 'Classic', 'Creamy']
    },
    {
        id: 'beverage-1',
        name: 'Fresh Lemonade',
        description: 'Homemade lemonade with fresh lemons and a hint of mint',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&h=600&fit=crop',
        category: 'Beverages',
        ordersCount: 178,
        taste: {
            flavor: 'Citrusy and refreshing',
            spiceLevel: 'None',
            texture: 'Light and refreshing',
            notes: ['Fresh lemon juice', 'Cooling mint', 'Sweet and tart']
        },
        rating: {
            average: 4.3,
            totalReviews: 92,
            breakdown: { 5: 45, 4: 33, 3: 11, 2: 2, 1: 1 }
        },
        preparationTime: '3-5 minutes',
        calories: 120,
        allergens: [],
        isPopular: false,
        tags: ['Refreshing', 'Natural', 'Citrus']
    },
    {
        id: 'beverage-2',
        name: 'Iced Coffee',
        description: 'Cold brewed coffee with cream and simple syrup',
        price: 4.49,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop',
        category: 'Beverages',
        ordersCount: 298,
        taste: {
            flavor: 'Rich coffee',
            spiceLevel: 'None',
            texture: 'Smooth and cold',
            notes: ['Bold coffee flavor', 'Creamy texture', 'Sweet finish']
        },
        rating: {
            average: 4.4,
            totalReviews: 156,
            breakdown: { 5: 78, 4: 58, 3: 15, 2: 3, 1: 2 }
        },
        preparationTime: '2-3 minutes',
        calories: 80,
        allergens: ['Dairy'],
        isPopular: true,
        tags: ['Caffeine', 'Cold drink', 'Morning']
    },
    {
        id: 'side-1',
        name: 'French Fries',
        description: 'Crispy golden fries seasoned with sea salt',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop',
        category: 'Sides',
        ordersCount: 456,
        taste: {
            flavor: 'Salty and savory',
            spiceLevel: 'None',
            texture: 'Crispy outside, fluffy inside',
            notes: ['Sea salt seasoning', 'Golden crispy exterior', 'Fluffy potato interior']
        },
        rating: {
            average: 4.5,
            totalReviews: 287,
            breakdown: { 5: 156, 4: 98, 3: 25, 2: 6, 1: 2 }
        },
        preparationTime: '5-7 minutes',
        calories: 320,
        allergens: [],
        isPopular: true,
        tags: ['Classic', 'Crispy', 'Side dish']
    },
    {
        id: 'side-2',
        name: 'Onion Rings',
        description: 'Beer-battered onion rings served with ranch dipping sauce',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800&h=600&fit=crop',
        category: 'Sides',
        ordersCount: 187,
        taste: {
            flavor: 'Savory and crispy',
            spiceLevel: 'Mild',
            texture: 'Crunchy batter, tender onion',
            notes: ['Beer batter crunch', 'Sweet onion', 'Creamy ranch dip']
        },
        rating: {
            average: 4.3,
            totalReviews: 98,
            breakdown: { 5: 48, 4: 35, 3: 12, 2: 2, 1: 1 }
        },
        preparationTime: '6-8 minutes',
        calories: 280,
        allergens: ['Gluten', 'Dairy'],
        isPopular: false,
        tags: ['Crispy', 'Beer battered', 'Side dish']
    },
];

export const getHotDeals = () => menuItems.filter(item => item.isHotDeal);
export const getMenuByCategory = (category: string) => menuItems.filter(item => item.category === category);
export const getAllCategories = () => [...new Set(menuItems.map(item => item.category))];
