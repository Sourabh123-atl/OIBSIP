# 🍕 WebDev-L3-PizzaDeliveryApp — SliceCraft

**Oasis Infobyte Internship — Web Development & Designing (Level 3, Task 1)**

A production-grade full-stack pizza ordering and inventory management platform featuring an interactive custom pizza builder, simulated Razorpay test mode checkout, real-time GPS telemetry order tracking, and an administrative stock management console.

---

## 📋 Feature Checklist Compliance

### User Side
- [x] **Pizza Variety Dashboard**: Browse signature artisan pizzas with dietary tags, ingredients, and 1-click cart addition.
- [x] **4-Step Custom Pizza Builder**:
  - `Step 1`: Select pizza crust base (Thin Crust, Pan Crust, Stuffed Crust, Whole Wheat, Gluten-Free).
  - `Step 2`: Select savory sauce (Classic Marinara, Peri-Peri, Alfredo, BBQ, Pesto).
  - `Step 3`: Choose cheese (Mozzarella, Cheddar Blend, Aged Parmesan, Vegan).
  - `Step 4`: Multi-select fresh farm vegetables (Bell peppers, olives, jalapeños, mushrooms, corn, onions).
- [x] **Live Pizza Visualizer**: Real-time graphic layer updates displaying base, sauce, cheese, and toppings as choices are selected.
- [x] **Order Summary & Slide-Out Cart**: Itemized subtotal, 5% kitchen packaging/taxes, and total payable amount.
- [x] **Razorpay Payment Integration (Test Mode)**: Simulates gateway modal with credit/debit, UPI, net banking, and 1-click payment confirmation.
- [x] **Real-Time Order Tracking**: 4-stage visual progress stepper (`Order Received` ➔ `In Kitchen` ➔ `Sent to Delivery` ➔ `Delivered`).

### Admin Side
- [x] **Separate Admin Operations Console**: Switch to kitchen dashboard to monitor live operations.
- [x] **Raw Ingredient Inventory Table**: Real-time tracking for crusts, sauces, cheeses, and vegetable toppings.
- [x] **Automatic Stock Decrement**: Stock quantities automatically decrement when users complete an order.
- [x] **Manual Stock Updates**: Instant `+` / `−` adjustments for each ingredient.
- [x] **Automated Low-Stock Threshold Alert**: Visual warning banner when critical inventory items drop below 20 units.
- [x] **Kitchen Dispatch Queue**: Advance active orders in real-time (`Start Cooking` ➔ `Dispatch` ➔ `Mark Delivered`).

---

## 🛠️ Tech Stack
- **Frontend**: HTML5 Semantic Web, Responsive CSS3 (Grid & Flexbox), Vanilla JavaScript (ES6+ Class architecture).
- **Payment Gateway**: Razorpay Test Mode Simulation.
- **State & Storage**: LocalStorage Persistence for inventory levels, orders, and cart items.

---

## 🏃‍♂️ Running Locally
Open `index.html` in your browser or run:
```bash
python -m http.server 8000
```
Visit `http://localhost:8000/WebDev-L3-PizzaDeliveryApp/`
