// SliceCraft Full-Stack Pizza App Logic with Razorpay Simulation & Admin Inventory
class PizzaApp {
  constructor() {
    this.STORAGE_KEY_ORDERS = 'slicecraft_orders_v1';
    this.STORAGE_KEY_STOCK = 'slicecraft_stock_v1';

    // State
    this.cart = [];
    this.orders = this.loadOrders();
    this.inventory = this.loadInventory();

    this.customSelection = {
      base: { name: 'Thin Crust', price: 199 },
      sauce: { name: 'Classic Marinara', price: 30 },
      cheese: { name: 'Mozzarella', price: 60 },
      veggies: [
        { name: 'Bell Peppers', price: 25 },
        { name: 'Black Olives', price: 35 }
      ]
    };

    // Pre-configured Signature Pizzas
    this.menuPizzas = [
      {
        id: 'piz-1',
        title: 'Margherita Fresca',
        desc: 'Crushed San Marzano marinara, fresh fior di latte mozzarella, basil, and cold-pressed olive oil.',
        price: 349,
        emoji: '🍕',
        badge: 'Classic Favorite',
        ingredients: ['Thin Crust', 'Classic Marinara', 'Mozzarella']
      },
      {
        id: 'piz-2',
        title: 'Peri-Peri Inferno',
        desc: 'Spicy peri-peri sauce, smoked paprika, jalapeños, sweet corn, red onion, and mozzarella.',
        price: 429,
        emoji: '🔥',
        badge: 'Chef Spicy Special',
        ingredients: ['Pan Crust', 'Spicy Peri-Peri', 'Mozzarella', 'Jalapeños', 'Sweet Corn']
      },
      {
        id: 'piz-3',
        title: 'Truffle Mushroom Alfredo',
        desc: 'Wild sautéed cremini and button mushrooms over rich garlic alfredo sauce and shaved parmesan.',
        price: 499,
        emoji: '🍄',
        badge: 'Gourmet Deluxe',
        ingredients: ['Stuffed Crust', 'Creamy Alfredo', 'Parmesan', 'Mushrooms']
      },
      {
        id: 'piz-4',
        title: 'Mediterranean Farmhouse',
        desc: 'Sun-ripened tomatoes, black olives, crisp bell peppers, red onions, and mozzarella on whole wheat.',
        price: 449,
        emoji: '🫒',
        badge: 'Healthy & Fresh',
        ingredients: ['Whole Wheat', 'Pesto Genovese', 'Mozzarella', 'Bell Peppers', 'Black Olives']
      }
    ];

    // Builder Ingredients Options
    this.builderData = {
      bases: [
        { name: 'Thin Crust', price: 199, stockKey: 'Thin Crust Base' },
        { name: 'Pan Crust', price: 229, stockKey: 'Pan Crust Base' },
        { name: 'Stuffed Crust', price: 279, stockKey: 'Stuffed Crust Base' },
        { name: 'Whole Wheat', price: 249, stockKey: 'Whole Wheat Base' },
        { name: 'Gluten-Free', price: 269, stockKey: 'Gluten-Free Base' }
      ],
      sauces: [
        { name: 'Classic Marinara', price: 30, stockKey: 'Marinara Sauce' },
        { name: 'Spicy Peri-Peri', price: 40, stockKey: 'Peri-Peri Sauce' },
        { name: 'Creamy Alfredo', price: 45, stockKey: 'Alfredo Sauce' },
        { name: 'Tangy BBQ', price: 40, stockKey: 'BBQ Sauce' },
        { name: 'Pesto Genovese', price: 50, stockKey: 'Pesto Sauce' }
      ],
      cheeses: [
        { name: 'Mozzarella', price: 60, stockKey: 'Mozzarella Cheese' },
        { name: 'Cheddar Blend', price: 70, stockKey: 'Cheddar Blend' },
        { name: 'Aged Parmesan', price: 80, stockKey: 'Aged Parmesan' },
        { name: 'Vegan Mozzarella', price: 75, stockKey: 'Vegan Mozzarella' }
      ],
      veggies: [
        { name: 'Bell Peppers', price: 25, stockKey: 'Bell Peppers' },
        { name: 'Black Olives', price: 35, stockKey: 'Black Olives' },
        { name: 'Jalapeños', price: 25, stockKey: 'Jalapeños' },
        { name: 'Mushrooms', price: 30, stockKey: 'Mushrooms' },
        { name: 'Sweet Corn', price: 25, stockKey: 'Sweet Corn' },
        { name: 'Red Onions', price: 20, stockKey: 'Red Onions' }
      ]
    };

    this.initDOM();
  }

  loadOrders() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_ORDERS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'SC-8924',
        date: new Date(Date.now() - 1000 * 60 * 15).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        items: ['Margherita Fresca (x1)', 'Custom Pizza (Thin Crust, Pesto, Olives)'],
        amount: 733,
        status: 'In Kitchen', // Received, In Kitchen, Out for Delivery, Delivered
        statusCode: 2
      }
    ];
  }

  loadInventory() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_STOCK);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return {
      'Thin Crust Base': 48,
      'Pan Crust Base': 35,
      'Stuffed Crust Base': 18, // Triggers demo low-stock alert!
      'Whole Wheat Base': 42,
      'Gluten-Free Base': 25,
      'Marinara Sauce': 80,
      'Peri-Peri Sauce': 50,
      'Alfredo Sauce': 32,
      'BBQ Sauce': 40,
      'Pesto Sauce': 28,
      'Mozzarella Cheese': 95,
      'Cheddar Blend': 60,
      'Aged Parmesan': 30,
      'Vegan Mozzarella': 24,
      'Bell Peppers': 70,
      'Black Olives': 65,
      'Jalapeños': 55,
      'Mushrooms': 45,
      'Sweet Corn': 60,
      'Red Onions': 85
    };
  }

  saveOrders() {
    localStorage.setItem(this.STORAGE_KEY_ORDERS, JSON.stringify(this.orders));
  }

  saveInventory() {
    localStorage.setItem(this.STORAGE_KEY_STOCK, JSON.stringify(this.inventory));
  }

  initDOM() {
    // Navigation routing
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.view;
        this.switchView(targetView, btn);
      });
    });

    // Cart Drawer Toggle
    const cartTrigger = document.getElementById('btn-cart-trigger');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCartBtn = document.getElementById('btn-close-cart');

    cartTrigger.addEventListener('click', () => cartDrawer.classList.add('open'));
    closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('open'));

    // Razorpay Modal Listeners
    const btnRazorpay = document.getElementById('btn-razorpay-checkout');
    const rzpModal = document.getElementById('razorpay-modal');
    const rzpCancel = document.getElementById('btn-rzp-cancel');
    const rzpSimFail = document.getElementById('btn-rzp-simulate-fail');
    const rzpSimSuccess = document.getElementById('btn-rzp-simulate-success');

    btnRazorpay.addEventListener('click', () => {
      if (this.cart.length === 0) {
        alert('Your cart is empty! Please add a delicious pizza first.');
        return;
      }
      const total = this.calculateCartTotal();
      document.getElementById('rzp-modal-amount').textContent = `Total: ₹${total.totalPayable}`;
      rzpModal.classList.add('open');
    });

    rzpCancel.addEventListener('click', () => rzpModal.classList.remove('open'));
    rzpSimFail.addEventListener('click', () => {
      rzpModal.classList.remove('open');
      alert('❌ Payment Cancelled. Your cart items are preserved.');
    });

    rzpSimSuccess.addEventListener('click', () => {
      this.confirmOrder();
      rzpModal.classList.remove('open');
      cartDrawer.classList.remove('open');
    });

    // Admin Controls
    document.getElementById('btn-simulate-stock-alert').addEventListener('click', () => {
      const banner = document.getElementById('admin-stock-alert');
      banner.classList.toggle('visible');
    });

    document.getElementById('btn-restock-all').addEventListener('click', () => {
      Object.keys(this.inventory).forEach(key => {
        this.inventory[key] += 50;
      });
      this.saveInventory();
      this.renderAdminInventory();
      alert('✅ All inventory items restocked by +50 units.');
    });

    // Builder Add to Cart
    document.getElementById('btn-add-custom-to-cart').addEventListener('click', () => {
      this.addCustomPizzaToCart();
    });

    // Render Initial UI
    this.renderMenu();
    this.renderBuilderOptions();
    this.updateBuilderSummary();
    this.renderCart();
    this.renderOrders();
    this.renderAdminInventory();
    this.renderAdminQueue();
  }

  switchView(viewId, activeBtn) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    const targetSection = document.getElementById(viewId);
    if (targetSection) targetSection.classList.add('active');
    if (activeBtn) activeBtn.classList.add('active');
  }

  renderMenu() {
    const grid = document.getElementById('pizza-menu-grid');
    grid.innerHTML = '';

    this.menuPizzas.forEach(pizza => {
      const card = document.createElement('div');
      card.className = 'pizza-card';
      card.innerHTML = `
        <div class="pizza-visual-box">
          <span class="pizza-emoji-large">${pizza.emoji}</span>
          <span class="pizza-badge">${pizza.badge}</span>
        </div>
        <div class="pizza-info">
          <h3 class="pizza-title">${pizza.title}</h3>
          <p class="pizza-ingredients">${pizza.desc}</p>
          <div class="pizza-action-row">
            <span class="pizza-price">₹${pizza.price}</span>
            <button class="btn-add-item" data-id="${pizza.id}">+ Add to Cart</button>
          </div>
        </div>
      `;

      card.querySelector('.btn-add-item').addEventListener('click', () => {
        this.cart.push({
          title: pizza.title,
          desc: pizza.desc,
          price: pizza.price,
          ingredients: pizza.ingredients
        });
        this.renderCart();
        document.getElementById('cart-drawer').classList.add('open');
      });

      grid.appendChild(card);
    });
  }

  renderBuilderOptions() {
    // 1. Bases
    const baseGrid = document.getElementById('base-options-grid');
    baseGrid.innerHTML = '';
    this.builderData.bases.forEach(b => {
      const isSel = this.customSelection.base.name === b.name;
      const el = document.createElement('div');
      el.className = `option-item ${isSel ? 'selected' : ''}`;
      el.innerHTML = `<span class="opt-name">${b.name}</span><span class="opt-cost">₹${b.price}</span>`;
      el.addEventListener('click', () => {
        this.customSelection.base = b;
        this.renderBuilderOptions();
        this.updateBuilderSummary();
      });
      baseGrid.appendChild(el);
    });

    // 2. Sauces
    const sauceGrid = document.getElementById('sauce-options-grid');
    sauceGrid.innerHTML = '';
    this.builderData.sauces.forEach(s => {
      const isSel = this.customSelection.sauce.name === s.name;
      const el = document.createElement('div');
      el.className = `option-item ${isSel ? 'selected' : ''}`;
      el.innerHTML = `<span class="opt-name">${s.name}</span><span class="opt-cost">+₹${s.price}</span>`;
      el.addEventListener('click', () => {
        this.customSelection.sauce = s;
        this.renderBuilderOptions();
        this.updateBuilderSummary();
      });
      sauceGrid.appendChild(el);
    });

    // 3. Cheese
    const cheeseGrid = document.getElementById('cheese-options-grid');
    cheeseGrid.innerHTML = '';
    this.builderData.cheeses.forEach(c => {
      const isSel = this.customSelection.cheese.name === c.name;
      const el = document.createElement('div');
      el.className = `option-item ${isSel ? 'selected' : ''}`;
      el.innerHTML = `<span class="opt-name">${c.name}</span><span class="opt-cost">+₹${c.price}</span>`;
      el.addEventListener('click', () => {
        this.customSelection.cheese = c;
        this.renderBuilderOptions();
        this.updateBuilderSummary();
      });
      cheeseGrid.appendChild(el);
    });

    // 4. Veggies (Multi-select)
    const vegGrid = document.getElementById('veggies-options-grid');
    vegGrid.innerHTML = '';
    this.builderData.veggies.forEach(v => {
      const isSel = this.customSelection.veggies.some(item => item.name === v.name);
      const el = document.createElement('div');
      el.className = `option-item ${isSel ? 'selected' : ''}`;
      el.innerHTML = `<span class="opt-name">${v.name}</span><span class="opt-cost">+₹${v.price}</span>`;
      el.addEventListener('click', () => {
        if (isSel) {
          this.customSelection.veggies = this.customSelection.veggies.filter(i => i.name !== v.name);
        } else {
          this.customSelection.veggies.push(v);
        }
        this.renderBuilderOptions();
        this.updateBuilderSummary();
      });
      vegGrid.appendChild(el);
    });
  }

  updateBuilderSummary() {
    document.getElementById('sum-base').textContent = this.customSelection.base.name;
    document.getElementById('sum-sauce').textContent = this.customSelection.sauce.name;
    document.getElementById('sum-cheese').textContent = this.customSelection.cheese.name;

    const vegNames = this.customSelection.veggies.map(v => v.name).join(', ') || 'None';
    document.getElementById('sum-veggies').textContent = vegNames;

    const vegTotal = this.customSelection.veggies.reduce((acc, v) => acc + v.price, 0);
    const totalPrice = this.customSelection.base.price + this.customSelection.sauce.price + this.customSelection.cheese.price + vegTotal;

    document.getElementById('sum-price').textContent = `₹${totalPrice}`;
    document.getElementById('btn-custom-price').textContent = `₹${totalPrice}`;
  }

  addCustomPizzaToCart() {
    const vegTotal = this.customSelection.veggies.reduce((acc, v) => acc + v.price, 0);
    const totalPrice = this.customSelection.base.price + this.customSelection.sauce.price + this.customSelection.cheese.price + vegTotal;
    const vegNames = this.customSelection.veggies.map(v => v.name).join(', ');

    const ingredientsList = [
      this.customSelection.base.name,
      this.customSelection.sauce.name,
      this.customSelection.cheese.name,
      ...this.customSelection.veggies.map(v => v.name)
    ];

    this.cart.push({
      title: `Custom ${this.customSelection.base.name} Pizza`,
      desc: `${this.customSelection.sauce.name}, ${this.customSelection.cheese.name}${vegNames ? ', ' + vegNames : ''}`,
      price: totalPrice,
      ingredients: ingredientsList
    });

    this.renderCart();
    document.getElementById('cart-drawer').classList.add('open');
  }

  calculateCartTotal() {
    const subtotal = this.cart.reduce((acc, item) => acc + item.price, 0);
    const tax = Math.round(subtotal * 0.05);
    const totalPayable = subtotal + tax;
    return { subtotal, tax, totalPayable };
  }

  renderCart() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge-count');
    badge.textContent = this.cart.length;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <span style="font-size: 3rem;">🛒</span>
          <h4>Your cart is empty</h4>
          <p>Add a signature pizza or build your own to start your order.</p>
        </div>
      `;
      document.getElementById('cart-subtotal').textContent = '₹0';
      document.getElementById('cart-tax').textContent = '₹0';
      document.getElementById('cart-total-payable').textContent = '₹0';
      document.getElementById('btn-rzp-amount').textContent = '₹0';
      return;
    }

    container.innerHTML = '';
    this.cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <span class="cart-item-price">₹${item.price}</span>
          <button class="cart-item-remove" data-index="${index}" title="Remove item">🗑️</button>
        </div>
      `;
      div.querySelector('.cart-item-remove').addEventListener('click', () => {
        this.cart.splice(index, 1);
        this.renderCart();
      });
      container.appendChild(div);
    });

    const { subtotal, tax, totalPayable } = this.calculateCartTotal();
    document.getElementById('cart-subtotal').textContent = `₹${subtotal}`;
    document.getElementById('cart-tax').textContent = `₹${tax}`;
    document.getElementById('cart-total-payable').textContent = `₹${totalPayable}`;
    document.getElementById('btn-rzp-amount').textContent = `₹${totalPayable}`;
  }

  confirmOrder() {
    const { totalPayable } = this.calculateCartTotal();
    const orderId = 'SC-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      items: this.cart.map(c => `${c.title} (₹${c.price})`),
      amount: totalPayable,
      status: 'Order Received',
      statusCode: 1
    };

    // Decrement inventory automatically for each item in order
    this.cart.forEach(cartItem => {
      if (cartItem.ingredients && Array.isArray(cartItem.ingredients)) {
        cartItem.ingredients.forEach(ing => {
          Object.keys(this.inventory).forEach(stockItem => {
            if (stockItem.toLowerCase().includes(ing.toLowerCase())) {
              this.inventory[stockItem] = Math.max(0, this.inventory[stockItem] - 1);
            }
          });
        });
      }
    });

    this.saveInventory();
    this.orders.unshift(newOrder);
    this.saveOrders();

    this.cart = [];
    this.renderCart();
    this.renderOrders();
    this.renderAdminInventory();
    this.renderAdminQueue();

    // Switch to Orders View automatically
    this.switchView('orders-view', document.getElementById('nav-orders'));
    alert(`🎉 Payment Successful! Your order #${orderId} is now confirmed.`);
  }

  renderOrders() {
    const list = document.getElementById('orders-list-container');
    const badge = document.getElementById('active-orders-count');
    badge.textContent = this.orders.filter(o => o.statusCode < 4).length;

    if (this.orders.length === 0) {
      list.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 3rem;">No active orders yet. Place an order to start tracking.</div>`;
      return;
    }

    list.innerHTML = '';
    this.orders.forEach(order => {
      const card = document.createElement('div');
      card.className = 'order-tracker-card';

      const steps = [
        { label: 'Order Received', code: 1 },
        { label: 'In Kitchen', code: 2 },
        { label: 'Sent to Delivery', code: 3 },
        { label: 'Delivered', code: 4 }
      ];

      let stepperHtml = '';
      steps.forEach(s => {
        let cls = '';
        if (order.statusCode > s.code) cls = 'completed';
        else if (order.statusCode === s.code) cls = 'active';

        stepperHtml += `
          <div class="stepper-step ${cls}">
            <div class="step-circle">${order.statusCode > s.code ? '✓' : s.code}</div>
            <span class="step-label">${s.label}</span>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="order-top">
          <div>
            <div class="order-id">Order #${order.id}</div>
            <span class="order-date">${order.date}</span>
          </div>
          <span class="order-total-badge">₹${order.amount}</span>
        </div>

        <div class="order-stepper">
          ${stepperHtml}
        </div>

        <div class="order-items-summary">
          <strong>Ordered Items:</strong> ${order.items.join(' • ')}
        </div>
      `;

      list.appendChild(card);
    });
  }

  renderAdminInventory() {
    const tbody = document.getElementById('inventory-table-body');
    tbody.innerHTML = '';

    let hasLowStock = false;

    Object.entries(this.inventory).forEach(([item, count]) => {
      const isLow = count < 20;
      if (isLow) hasLowStock = true;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="tag" style="background: rgba(255,255,255,0.05); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">Ingredient</span></td>
        <td><strong>${item}</strong></td>
        <td><span class="stock-pill ${isLow ? 'stock-low' : 'stock-good'}">${count} units</span></td>
        <td>${isLow ? '<span style="color: #ef4444; font-weight: bold;">⚠️ Low Stock</span>' : '<span style="color: #10b981;">✓ Optimal</span>'}</td>
        <td>
          <button class="stock-btn" data-item="${item}" data-delta="10" title="Add 10 units">+</button>
          <button class="stock-btn" data-item="${item}" data-delta="-5" title="Deduct 5 units">-</button>
        </td>
      `;

      tr.querySelectorAll('.stock-btn').forEach(b => {
        b.addEventListener('click', () => {
          const delta = parseInt(b.dataset.delta);
          this.inventory[item] = Math.max(0, this.inventory[item] + delta);
          this.saveInventory();
          this.renderAdminInventory();
        });
      });

      tbody.appendChild(tr);
    });

    const alertBanner = document.getElementById('admin-stock-alert');
    if (hasLowStock) {
      alertBanner.classList.add('visible');
    } else {
      alertBanner.classList.remove('visible');
    }
  }

  renderAdminQueue() {
    const queue = document.getElementById('admin-orders-queue');
    queue.innerHTML = '';

    if (this.orders.length === 0) {
      queue.innerHTML = `<p style="color: var(--text-dim); text-align: center; padding: 2rem;">No orders currently in queue.</p>`;
      return;
    }

    this.orders.forEach(order => {
      const card = document.createElement('div');
      card.className = 'queue-card';

      const nextStatusMap = {
        1: { nextLabel: 'Start Cooking 🍳', nextCode: 2, nextName: 'In Kitchen' },
        2: { nextLabel: 'Dispatch for Delivery 🛵', nextCode: 3, nextName: 'Sent to Delivery' },
        3: { nextLabel: 'Mark Delivered 🎉', nextCode: 4, nextName: 'Delivered' }
      };

      const nextStep = nextStatusMap[order.statusCode];

      card.innerHTML = `
        <div class="queue-head">
          <strong>#${order.id} (₹${order.amount})</strong>
          <span style="font-size: 0.82rem; color: var(--accent-pizza); font-weight: 700;">${order.status}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-dim);">${order.items.join(', ')}</p>
        <div>
          ${nextStep ? `<button class="queue-status-btn" data-id="${order.id}">${nextStep.nextLabel}</button>` : `<span style="color: #10b981; font-weight: 700; font-size: 0.85rem;">✓ Order Completed</span>`}
        </div>
      `;

      if (nextStep) {
        card.querySelector('.queue-status-btn').addEventListener('click', () => {
          order.statusCode = nextStep.nextCode;
          order.status = nextStep.nextName;
          this.saveOrders();
          this.renderAdminQueue();
          this.renderOrders();
        });
      }

      queue.appendChild(card);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.pizzaApp = new PizzaApp();
});
