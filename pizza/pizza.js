 // Image slider logic
 const slides = document.querySelectorAll('.slide');
 let index = 0;
 setInterval(() => {
   slides[index].classList.remove('active');
   index = (index + 1) % slides.length;
   slides[index].classList.add('active');
 }, 3000);

 // Copy code functionality for offer cards
 document.querySelectorAll('.copy-btn').forEach(button => {
   button.addEventListener('click', function() {
     const offerText = this.getAttribute('data-offer');
     const textarea = document.createElement('textarea');
     textarea.value = offerText;
     document.body.appendChild(textarea);
     textarea.select();
     document.execCommand('copy');
     document.body.removeChild(textarea);
     alert('Offer code copied: ' + offerText);
   });
 });

 // Footer SPA-like navigation (for dynamic page loading)
 document.querySelectorAll('footer a').forEach(link => {
   link.addEventListener('click', (e) => {
     e.preventDefault();
     const target = link.getAttribute('href');
     fetch(target)
       .then(res => res.text())
       .then(data => {
         document.body.innerHTML = data;
         window.history.pushState({}, '', target);
       })
       .catch(err => console.error("Failed to load page:", err));
   });
 });

 // Register Service Worker for PWA
 if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('service-worker.js')
     .then(reg => console.log('Service Worker registered ✅', reg))
     .catch(err => console.error('Service Worker registration failed ❌', err));
 }

 /********************
  * Menu Section JS  *
  ********************/
 // Sample data for menu items
 const menuData = {
   veg: [
     { image: "https://via.placeholder.com/250x150?text=Veg+1", name: "Margherita Pizza", price: "$10", description: "Classic delight with fresh tomatoes and basil." },
     { image: "https://via.placeholder.com/250x150?text=Veg+2", name: "Veggie Supreme", price: "$12", description: "Loaded with onions, capsicum, tomatoes, and olives." },
     { image: "https://via.placeholder.com/250x150?text=Veg+3", name: "Farmhouse Pizza", price: "$11", description: "A delightful combination of onion, capsicum, tomato & grilled mushroom." },
     { image: "https://via.placeholder.com/250x150?text=Veg+4", name: "Paneer Makhani", price: "$13", description: "Topped with succulent paneer with makhani sauce." },
     { image: "https://via.placeholder.com/250x150?text=Veg+5", name: "Corn Pizza", price: "$9", description: "Sweet corn along with a spicy twist." },
     { image: "https://via.placeholder.com/250x150?text=Veg+6", name: "Mexican Green Wave", price: "$14", description: "Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno." },
     { image: "https://via.placeholder.com/250x150?text=Veg+7", name: "Deluxe Veggie", price: "$15", description: "A mix of fresh veggies that is simply delicious." },
     { image: "https://via.placeholder.com/250x150?text=Veg+8", name: "Cheesy Veg", price: "$12", description: "Extra cheese with mixed veggies for a gooey treat." },
     { image: "https://via.placeholder.com/250x150?text=Veg+9", name: "Spinach Delight", price: "$11", description: "Fresh spinach mixed with other premium veggies." },
     { image: "https://via.placeholder.com/250x150?text=Veg+10", name: "Mediterranean Veg", price: "$13", description: "A colorful mix of Mediterranean ingredients." }
   ],
   nonveg: [
     { image: "https://via.placeholder.com/250x150?text=Non+Veg+1", name: "Chicken Pepperoni", price: "$14", description: "Loaded with succulent chicken pepperoni." },
     { image: "https://via.placeholder.com/250x150?text=Non+Veg+2", name: "Chicken Supreme", price: "$15", description: "Chunks of chicken with fresh veggies." },
     { image: "https://via.placeholder.com/250x150?text=Non+Veg+3", name: "BBQ Chicken", price: "$16", description: "Grilled chicken with BBQ sauce drizzle." },
     { image: "https://via.placeholder.com/250x150?text=Non+Veg+4", name: "Chicken Tikka", price: "$15", description: "Tikka marinated chicken pieces for a spicy twist." },
     { image: "https://via.placeholder.com/250x150?text=Non+Veg+5", name: "Chicken Cheesy", price: "$16", description: "Extra cheese with grilled chicken toppings." },
     { image: "https://via.placeholder.com/250x150?text=Non+Veg+6", name: "Spicy Chicken", price: "$14", description: "Packed with spicy chicken chunks." },
     { image: "https://via.placeholder.com/250x150?text=Non+Veg+7", name: "Pepper Barbecue", price: "$15", description: "Tender chicken with pepper and BBQ flavors." }
   ],
   dessert: [
     { image: "https://via.placeholder.com/250x150?text=Dessert+1", name: "Chocolate Lava Cake", price: "$6", description: "Warm, gooey chocolate cake served with ice cream." },
     { image: "https://via.placeholder.com/250x150?text=Dessert+2", name: "Cheesecake", price: "$7", description: "Creamy cheesecake with a crunchy base." },
     { image: "https://via.placeholder.com/250x150?text=Dessert+3", name: "Ice Cream Sundae", price: "$5", description: "Classic sundae with assorted toppings." }
   ],
   drink: [
     { image: "https://via.placeholder.com/250x150?text=Drink+1", name: "Coke", price: "$2", description: "Refreshing cold Coke." },
     { image: "https://via.placeholder.com/250x150?text=Drink+2", name: "Pepsi", price: "$2", description: "Chilled Pepsi served ice cold." },
     { image: "https://via.placeholder.com/250x150?text=Drink+3", name: "Iced Tea", price: "$3", description: "Homemade iced tea with lemon." },
     { image: "https://via.placeholder.com/250x150?text=Drink+4", name: "Lemonade", price: "$3", description: "Freshly squeezed lemonade." },
     { image: "https://via.placeholder.com/250x150?text=Drink+5", name: "Orange Juice", price: "$4", description: "Fresh orange juice, no pulp." }
   ]
 };

 // Render menu items based on selected category
 function renderMenu(category) {
   const menuItemsContainer = document.getElementById("menuItems");
   const items = menuData[category] || [];
   let html = "";
   items.forEach(item => {
     html += `
       <div class="menu-card">
         <img src="${item.image}" alt="${item.name}">
         <div class="menu-card-content">
           <h4>${item.name}</h4>
           <p>${item.description}</p>
           <div class="price">${item.price}</div>
         </div>
         <div class="menu-card-actions">
           <input type="number" min="1" value="1">
           <button>Add to Cart</button>
         </div>
       </div>
     `;
   });
   menuItemsContainer.innerHTML = html;
 }

 // Initial rendering for Veg items
 renderMenu("veg");

 // Tab switching
 const tabs = document.querySelectorAll('.menu-tab');
 tabs.forEach(tab => {
   tab.addEventListener('click', function() {
     tabs.forEach(t => t.classList.remove('active'));
     this.classList.add('active');
     const category = this.getAttribute('data-category');
     renderMenu(category);
   });
 });
