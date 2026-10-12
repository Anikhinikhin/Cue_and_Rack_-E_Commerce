/* =====================================================================
   CUE & RACK — APP LOGIC (wireframe-accurate build, real photos)
   Client-side only: catalog browsing, cart, and a printable receipt.
   Every product has a real photo, a rating, specs, and a sample review
   so every category — not just Cues — feels complete.
   ===================================================================== */

// ---------------------------------------------------------------------
// 1. CATALOG
// ---------------------------------------------------------------------
const CATEGORIES = [
  { slug: "cues", name: "Cues" },
  { slug: "gloves", name: "Gloves" },
  { slug: "chalk", name: "Chalk & Accessories" },
  { slug: "cases", name: "Cases & Bags" },
  { slug: "balls", name: "Balls & Racks" },
  { slug: "tables", name: "Tables & Furniture" },
  { slug: "apparel", name: "Apparel" },
];

const HOME_CATEGORY_SLUGS = ["cues", "gloves", "chalk", "cases", "balls", "tables", "apparel"];

// Real product photos (supplied directly — one per product, in catalog order).
const PRODUCT_IMAGES = {
  "house-cue": "images/01_house_cue_starter.png",
  "maple-cue": "images/02_two_piece_maple_cue.png",
  "inlay-cue": "images/03_custom_cue_limited_edition.png",
  "single-glove": "images/04_single_billiard_glove.png",
  "glove-3pack": "images/05_3_pack_multi_size_gloves.png",
  "chalk-single": "images/06_master_chalk_single_cube.png",
  "chalk-12pack": "images/07_master_chalk_12_pack.png",
  "soft-case": "images/08_soft_case_1x1.png",
  "hard-case": "images/09_hard_case_2x4.png",
  "ball-set-standard": "images/10_standard_ball_set_full.png",
  "ball-set-tournament": "images/11_tournament_ball_set.png",
  "triangle-rack": "images/12_triangle_rack.png",
  "table-cover": "images/13_table_cover.png",
  "table-light": "images/14_table_light_hanging.png",
  "wall-cue-rack": "images/15_wall_mounted_cue_rack.png",
  "tshirt": "images/16_cue_and_rack_tshirt.png",
  "polo": "images/17_cue_and_rack_polo.png",
  "cap": "images/18_cue_and_rack_cap.png",
};

const PRODUCTS = [
  { id: "house-cue", category: "cues", name: "House Cue (Starter, One-Piece)", price: 39.99,
    desc: "A sturdy one-piece cue built for house tables and casual play — straight, reliable, and easy on a first budget.",
    variantLabel: "Weight", variantOptions: ["18oz", "19oz", "20oz"],
    rating: 4, reviews: 36,
    specs: ["Material: Kiln-dried maple, one-piece construction", "Tip: Hard leather, 13mm", "Best for: Bar and house tables"],
    quote: "Does exactly what a house cue should — straight and reliable." },
  { id: "maple-cue", category: "cues", name: "Two-Piece Maple Cue", price: 149.99, tag: "New",
    desc: "A traditional maple shaft with a quick-release joint, wrapped in Irish linen for a grip that holds up over long sessions.",
    variantLabel: "Tip Size", variantOptions: ["11.75mm", "12.75mm", "13mm"],
    rating: 5, reviews: 128,
    specs: ["Material: Canadian maple shaft, stained hardwood butt", "Joint: Quick-release, 5/16-18 pin", "Wrap: Irish linen"],
    quote: "The quick-release joint makes this so easy to carry to league night." },
  { id: "inlay-cue", category: "cues", name: "Custom Inlay Cue (Limited Edition)", price: 499.99, tag: "Limited",
    desc: "Hand-inlaid detailing on a premium maple blank — a limited run for players who want their cue to stand out in the rack.",
    variantLabel: "Tip Size", variantOptions: ["12.75mm", "13mm"],
    rating: 5, reviews: 42,
    specs: ["Material: Premium maple blank with hand-inlaid rings", "Finish: Multi-layer high-gloss lacquer", "Edition: Limited run, individually numbered"],
    quote: "Feels as good as it looks — and it looks incredible on the rack." },
  { id: "single-glove", category: "gloves", name: "Single Billiard Glove", price: 9.99,
    desc: "A breathable mesh glove that keeps your bridge hand gliding smoothly across every shot.",
    variantLabel: "Size", variantOptions: ["S", "M", "L", "XL"],
    rating: 4, reviews: 54,
    specs: ["Material: Breathable mesh polyester", "Fit: Three-finger open design", "Hand: Fits left or right"],
    quote: "Smooth glide, dries fast, holds up wash after wash." },
  { id: "glove-3pack", category: "gloves", name: "3-Pack Multi-Size Gloves", price: 24.99,
    desc: "Three gloves in a spread of sizes — handy for leagues, guests, or just always having a spare.",
    rating: 4, reviews: 29,
    specs: ["Material: Breathable mesh polyester", "Pack: 3 gloves, mixed sizing", "Hand: Fits left or right"],
    quote: "Handy to always have a spare in the bag for league nights." },
  { id: "chalk-single", category: "chalk", name: "Master Chalk (Single Cube)", price: 1.99,
    desc: "The standard for consistent contact and fewer miscues — one cube, ready for the table.",
    rating: 4, reviews: 61,
    specs: ["Material: Fine-ground chalk compound", "Size: Standard 1-inch cube", "Color: Blue"],
    quote: "Grips the tip well without caking it up." },
  { id: "chalk-12pack", category: "chalk", name: "Master Chalk (12-Pack)", price: 18.99,
    desc: "Stock up: a dozen cubes of the same trusted chalk, priced better by the pack.",
    rating: 5, reviews: 88,
    specs: ["Material: Fine-ground chalk compound", "Pack: 12 cubes", "Color: Blue"],
    quote: "Buying the 12-pack means I'm never digging around for chalk mid-game." },
  { id: "soft-case", category: "cases", name: "Soft Case (1x1)", price: 34.99,
    desc: "A padded, lightweight case for one butt and one shaft — built for players on the move.",
    rating: 4, reviews: 33,
    specs: ["Capacity: 1 butt, 1 shaft", "Material: Padded nylon exterior", "Strap: Adjustable shoulder strap"],
    quote: "Light enough to carry everywhere, padded enough to trust it." },
  { id: "hard-case", category: "cases", name: "Hard Case (2x4)", price: 79.99, wasPrice: 89.99, tag: "Sale",
    desc: "Rigid protection for up to two butts and four shafts, with room for chalk and accessories.",
    rating: 5, reviews: 47,
    specs: ["Capacity: 2 butts, 4 shafts", "Material: Rigid ABS shell", "Closures: Dual latch, carry handle"],
    quote: "Dropped my bag once and the cues inside didn't even notice." },
  { id: "ball-set-standard", category: "balls", name: "Standard Ball Set (Full)", price: 59.99,
    desc: "A complete, regulation-size ball set with consistent weight and a durable polymer finish.",
    rating: 4, reviews: 52,
    specs: ["Material: Durable polymer resin", "Set: Full 16-ball regulation set", "Finish: High-gloss, consistent weight"],
    quote: "Rolls true and the colors have stayed bright after months of play." },
  { id: "ball-set-tournament", category: "balls", name: "Tournament Ball Set", price: 129.99,
    desc: "Precision-cast and polished to tournament tolerances, for players who notice the difference.",
    rating: 5, reviews: 39,
    specs: ["Material: Precision-cast phenolic resin", "Set: Full 16-ball tournament set", "Tolerance: Cast to tournament spec"],
    quote: "You can feel the difference in roll compared to a standard set." },
  { id: "triangle-rack", category: "balls", name: "Triangle Rack", price: 14.99,
    desc: "A snug, warp-resistant rack that racks tight every time.",
    rating: 4, reviews: 24,
    specs: ["Material: Warp-resistant molded plastic", "Fits: Standard 2.25-inch balls", "Design: Snug, consistent rack every time"],
    quote: "Simple, but it racks tighter than the one that came with my table." },
  { id: "table-cover", category: "tables", name: "Table Cover", price: 29.99,
    desc: "A fitted cover that keeps dust, spills, and stray drinks off your felt between games.",
    rating: 4, reviews: 21,
    specs: ["Material: Water-resistant vinyl", "Fit: Fitted, elastic-edge design", "Care: Wipe clean"],
    quote: "Keeps dust and spills off the felt between games." },
  { id: "table-light", category: "tables", name: "Table Light (Hanging)", price: 149.99,
    desc: "Even, glare-free light across the full table — the kind of glow a good game deserves.",
    rating: 5, reviews: 31,
    specs: ["Fixture: 3-shade hanging bar light", "Finish: Brass hardware, enamel shades", "Mounting: Chain-hung, adjustable height"],
    quote: "Changed the whole feel of the game room — even light across the table." },
  { id: "wall-cue-rack", category: "tables", name: "Wall-Mounted Cue Rack", price: 69.99,
    desc: "Solid wood wall storage that keeps cues organized, visible, and off the table rail.",
    rating: 4, reviews: 18,
    specs: ["Material: Solid hardwood", "Capacity: Holds 8 cues", "Mounting: Wall-mount hardware included"],
    quote: "Finally got the cues off the table rail and onto the wall where they belong." },
  { id: "tshirt", category: "apparel", name: "Cue & Rack T-Shirt", price: 19.99,
    desc: "Soft cotton tee with the Cue & Rack mark — comfortable enough for a five-hour session.",
    variantLabel: "Size", variantOptions: ["S", "M", "L", "XL", "XXL"],
    rating: 4, reviews: 27,
    specs: ["Material: 100% combed cotton", "Fit: Regular, true to size", "Print: Front chest graphic"],
    quote: "Soft, holds up in the wash, and gets asked about every time I wear it." },
  { id: "polo", category: "apparel", name: "Cue & Rack Polo", price: 34.99,
    desc: "A clean, league-ready polo for players who like to look as sharp as they shoot.",
    variantLabel: "Size", variantOptions: ["S", "M", "L", "XL", "XXL"],
    rating: 4, reviews: 19,
    specs: ["Material: Cotton-poly piqué blend", "Fit: Regular, true to size", "Print: Embroidered chest logo"],
    quote: "Sharp enough for league night, comfortable enough for all night." },
  { id: "cap", category: "apparel", name: "Cue & Rack Cap", price: 17.99,
    desc: "An adjustable, low-profile cap for keeping the rail lights out of your eyes.",
    rating: 4, reviews: 22,
    specs: ["Material: Cotton twill", "Closure: Adjustable strap, one size", "Print: Embroidered front logo"],
    quote: "Great fit and the embroidery hasn't faded at all." },
];

const FEATURED_IDS = ["maple-cue", "glove-3pack", "hard-case", "chalk-12pack"];
const ATTRIBUTE_FILTERS = ["Price Range", "Cue Weight", "Wrap Type", "Brand", "Availability"];
const TABS = ["Description", "Specifications", "Shipping & Returns", "Reviews"];

// Simple static content pages for the footer's Customer Care / About links.
const INFO_PAGES = {
  support: {
    title: "Support Center",
    body: [
      "This is a demo storefront, so there's no live support team behind it yet — but here's how it would work.",
      "Most questions people ask a store like this: Is my cart saved? Yes, it's kept in your browser so it's there if you come back. Is my payment information collected? No — this build never asks for or stores payment details. Will my order actually ship? No, the order summary at checkout is for planning purposes only.",
      "In a live version of Cue & Rack, this page would include a searchable FAQ and a way to message a real support team.",
    ],
  },
  warranty: {
    title: "Warranty & Returns",
    body: [
      "Draft policy — not yet in effect, since no real orders are placed on this site.",
      "Cues and equipment would be covered by a 1-year warranty against manufacturing defects. Unused items in original packaging would be returnable within 30 days of a real purchase.",
      "Custom and limited-edition cues, along with any product listed as final sale, would not be eligible for return.",
    ],
  },
  story: {
    title: "Our Story",
    body: [
      "Cue & Rack started the way most good ideas at a pool table do — with an argument about equipment. Specifically, whether a $40 house cue could really play any worse than a $400 one.",
      "It can. That argument turned into a small collection of cues, gloves, and table accessories picked by people who play often enough to have opinions about tip hardness and wrap material.",
      "This site is still an early build — the catalog, photos, and policies here are a working draft, not a finished storefront.",
    ],
  },
  craft: {
    title: "Craftsmanship",
    body: [
      "Every cue in the catalog is described with the materials and construction details that actually matter at the table: shaft wood, joint type, wrap material, tip size.",
      "The same goes for the rest of the lineup — cases built to actually protect what's inside them, chalk that doesn't cake up, racks that hold their shape.",
      "As this store grows past its demo stage, this is where sourcing and manufacturing details for each product line would live.",
    ],
  },
  contact: {
    title: "Contact",
    body: [
      "This build doesn't have a live inbox yet, so messages sent from here wouldn't currently reach anyone.",
      "Once connected, this is where a real contact form or support email would go.",
    ],
  },
};

// ---------------------------------------------------------------------
// 2. HELPERS
// ---------------------------------------------------------------------
const $app = () => document.getElementById("app");
const money = (n) => "$" + n.toFixed(2);
const catName = (slug) => (CATEGORIES.find((c) => c.slug === slug) || {}).name || slug;
const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const stars = (n) => "&#9733;".repeat(n) + "&#9734;".repeat(5 - n);

function safeGet(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch (e) { return fallback; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable — app still runs, just won't persist */ }
}

// ---------------------------------------------------------------------
// 3. CART
// ---------------------------------------------------------------------
const CART_KEY = "cueRackCart";
const RECEIPT_KEY = "cueRackLastReceipt";

function getCart() { return safeGet(CART_KEY, []); }
function saveCart(cart) { safeSet(CART_KEY, cart); updateCartBadge(); }
function cartCount(cart) { return (cart || getCart()).reduce((sum, l) => sum + l.qty, 0); }
function cartLines() {
  return getCart().map((line) => {
    const product = findProduct(line.id);
    return product ? { ...line, product } : null;
  }).filter(Boolean);
}
function cartSubtotal() { return cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0); }

function addToCart(id, variant, qty) {
  const cart = getCart();
  const existing = cart.find((l) => l.id === id && l.variant === (variant || null));
  if (existing) existing.qty += qty;
  else cart.push({ id, variant: variant || null, qty });
  saveCart(cart);
  showToast(`Added "${findProduct(id).name}" to your cart`);
}
function updateCartLineQty(index, value) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, Math.min(99, value));
  saveCart(cart);
  render();
}
function removeCartLine(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  render();
}
function updateCartBadge() {
  const el = document.getElementById("cartCountBadge");
  if (el) el.textContent = "Cart(" + cartCount() + ")";
}

// ---------------------------------------------------------------------
// 4. TOAST
// ---------------------------------------------------------------------
let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="dot"></span>${esc(message)}`;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---------------------------------------------------------------------
// 5. SHARED MARKUP — header / footer
// ---------------------------------------------------------------------
function headerHTML() {
  const navItems = [
    { label: "Shop All", href: "#/shop" },
    { label: "Cues", href: "#/shop/cues" },
    { label: "Gloves", href: "#/shop/gloves" },
    { label: "Chalk & Accessories", href: "#/shop/chalk" },
    { label: "Cases", href: "#/shop/cases" },
    { label: "Balls & Racks", href: "#/shop/balls" },
    { label: "Tables", href: "#/shop/tables" },
    { label: "Apparel", href: "#/shop/apparel" },
  ];
  const { route, a } = parseHash();
  return `
    <header class="site-header">
      <div class="promo-bar">FREE SHIPPING ON ORDERS OVER $75 &bull; NEW CUSTOM CUE BUILDER NOW LIVE</div>
      <div class="wrap header-row">
        <a href="#/" class="logo-box">CUE &amp; RACK</a>
        <nav class="main-nav">
          ${navItems.map((n) => {
            const active = route === "shop" && n.href === `#/shop/${a || ""}`;
            return `<a href="${n.href}" class="${active ? "active" : ""}">${n.label}</a>`;
          }).join("")}
        </nav>
        <div class="header-actions">
          <button type="button" onclick="Site.toggleSearch()">Search</button>
          <a href="#/account" class="${route === "account" ? "active" : ""}">Acct</a>
          <a href="#/cart" id="cartCountBadge">Cart(${cartCount()})</a>
        </div>
      </div>
      <div class="search-bar ${route === "search" ? "open" : ""}" id="searchBar">
        <form class="wrap search-form" onsubmit="return Site.submitSearch(event)">
          <input type="text" id="searchInput" placeholder="Search cues, gloves, chalk, cases..." autocomplete="off" value="${route === "search" ? esc(decodeURIComponent(a || "")) : ""}">
          <button type="submit" class="btn btn-gold btn-sm">Search</button>
        </form>
      </div>
    </header>`;
}

function footerHTML() {
  const cols = [
    {
      title: "Shop",
      links: [
        { label: "Cues", href: "#/shop/cues" },
        { label: "Gloves", href: "#/shop/gloves" },
        { label: "Chalk & Accessories", href: "#/shop/chalk" },
        { label: "Cases & Bags", href: "#/shop/cases" },
        { label: "Balls & Racks", href: "#/shop/balls" },
        { label: "Tables & Furniture", href: "#/shop/tables" },
        { label: "Apparel", href: "#/shop/apparel" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { label: "Support Center", href: "#/page/support" },
        { label: "Warranty & Returns", href: "#/page/warranty" },
        { label: "Your Cart", href: "#/cart" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "Our Story", href: "#/page/story" },
        { label: "Craftsmanship", href: "#/page/craft" },
        { label: "Contact", href: "#/page/contact" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { label: "Instagram", href: "https://instagram.com", external: true },
        { label: "Facebook", href: "https://facebook.com", external: true },
        { label: "X (Twitter)", href: "https://x.com", external: true },
      ],
    },
  ];
  return `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        ${cols.map((c) => `
          <div class="footer-col">
            <h5>${esc(c.title)}</h5>
            ${c.links.map((l) => l.external
              ? `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.label)}</a>`
              : `<a href="${l.href}">${esc(l.label)}</a>`
            ).join("")}
          </div>`).join("")}
      </div>
      <div class="wrap footer-bottom">
        <span>&copy; 2026 Cue &amp; Rack &mdash; demo storefront, no real orders are placed</span>
      </div>
    </footer>`;
}

// ---------------------------------------------------------------------
// 6. MEDIA — real photo when available, wireframe placeholder otherwise
// ---------------------------------------------------------------------
function ph(className, label, tone) {
  const toneClass = tone ? `ph-${tone}` : "";
  return `<div class="ph ${toneClass} ${className}">${label ? `<div class="ph-label"><span>${esc(label)}</span></div>` : ""}</div>`;
}

function media(sizeClass, productOrId, altText) {
  const id = typeof productOrId === "string" ? productOrId : productOrId.id;
  const url = PRODUCT_IMAGES[id];
  if (url) {
    return `<div class="photo-box ${sizeClass}"><img src="${url}" alt="${esc(altText || id)}" loading="lazy"></div>`;
  }
  return ph(sizeClass, "PRODUCT IMG", "alt");
}

// ---------------------------------------------------------------------
// 7. PRODUCT CARD
// ---------------------------------------------------------------------
function productCardHTML(product) {
  const price = product.wasPrice
    ? `${money(product.price)}<span class="was">${money(product.wasPrice)}</span>`
    : money(product.price);
  return `
    <a href="#/product/${product.id}" class="product-card">
      <div style="position:relative;">
        ${product.tag ? `<span class="product-tag">${esc(product.tag)}</span>` : ""}
        ${media("product-media", product, product.name)}
      </div>
      <div class="product-body">
        <div class="product-name">${esc(product.name)}</div>
        <div class="product-rating">${stars(product.rating)} <span class="cnt">(${product.reviews})</span></div>
        <div class="product-price">${price}</div>
      </div>
    </a>`;
}

// ---------------------------------------------------------------------
// 8. VIEWS
// ---------------------------------------------------------------------
function viewHome() {
  const featured = FEATURED_IDS.map(findProduct).filter(Boolean);
  const homeCategories = HOME_CATEGORY_SLUGS.map((slug) => CATEGORIES.find((c) => c.slug === slug));

  return `
    <main class="wrap view">
      <section class="hero-section">
        <div class="photo-box hero-ph">
          <img src="${PRODUCT_IMAGES["inlay-cue"]}" alt="Featured cue collection" loading="lazy">
        </div>
        <div class="hero-cta"><a href="#/shop/cues" class="btn btn-gold">Shop Now</a></div>
      </section>

      <section style="margin-top:36px;">
        <div class="section-label">Shop by Category</div>
        <div class="category-grid">
          ${homeCategories.map((c) => {
            const rep = PRODUCTS.find((p) => p.category === c.slug);
            return `
              <a href="#/shop/${c.slug}" class="category-tile" style="display:block;position:relative;">
                ${rep ? media("category-tile", rep, c.name) : ph("category-tile", c.name, "plain")}
                <div style="position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px;pointer-events:none;">
                  <span style="background:var(--white);border:1px solid var(--gray-border);padding:0.25em 0.9em;font-size:0.82rem;font-weight:600;">${esc(c.name)}</span>
                </div>
              </a>`;
          }).join("")}
        </div>
      </section>

      <section style="margin-top:40px;">
        <div class="section-label">Best-Selling Cues &amp; Gear</div>
        <div class="product-grid">
          ${featured.map(productCardHTML).join("")}
        </div>
      </section>
    </main>`;
}

function viewShop(categorySlug, sort) {
  sort = sort || "featured";
  let items = categorySlug ? PRODUCTS.filter((p) => p.category === categorySlug) : PRODUCTS.slice();
  if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
  else if (sort === "name") items.sort((a, b) => a.name.localeCompare(b.name));

  const title = categorySlug ? catName(categorySlug) : "Shop All";

  return `
    <main class="wrap view">
      <div class="breadcrumb"><a href="#/">Home</a> / <a href="#/shop">Shop</a>${categorySlug ? " / " + esc(title) : ""}</div>
      <h1 class="page-title">${esc(title)}</h1>
      <div class="shop-layout">
        <aside class="filter-panel">
          <h4>Filter By</h4>
          ${ATTRIBUTE_FILTERS.map((f, i) => `
            <label class="filter-check">
              <input type="checkbox" id="filt-${i}">
              <span>${esc(f)}</span>
            </label>`).join("")}
        </aside>
        <div>
          <div class="shop-toolbar">
            <span class="count">${items.length} Results</span>
            <select class="sort-select" onchange="Site.setSort(this.value)">
              <option value="featured" ${sort === "featured" ? "selected" : ""}>Sort: Featured</option>
              <option value="price-asc" ${sort === "price-asc" ? "selected" : ""}>Price: Low to High</option>
              <option value="price-desc" ${sort === "price-desc" ? "selected" : ""}>Price: High to Low</option>
              <option value="name" ${sort === "name" ? "selected" : ""}>Name: A to Z</option>
            </select>
          </div>
          <div class="product-grid cols-3">
            ${items.map(productCardHTML).join("") || `<p style="color:var(--text-muted);">No products found.</p>`}
          </div>
        </div>
      </div>
    </main>`;
}

function tabPanelsFor(product) {
  const specsHTML = `<ul>${product.specs.map((s) => `<li>${esc(s)}</li>`).join("")}${product.variantLabel ? `<li>Available in multiple ${esc(product.variantLabel.toLowerCase())}s: ${product.variantOptions.map(esc).join(", ")}</li>` : ""}</ul>`;
  return {
    "Description": `<p>${esc(product.desc)}</p>`,
    "Specifications": specsHTML,
    "Shipping & Returns": `<p>This is a demo store — no items ship and no payment is collected. In a live store, shipping costs, delivery estimates, and the return window for this item would appear here.</p>`,
    "Reviews": `<p>${stars(product.rating)} &nbsp; ${product.reviews} reviews, averaging ${product.rating} out of 5 stars.</p><div class="review-quote">&ldquo;${esc(product.quote)}&rdquo;<span class="by">&mdash; a Cue &amp; Rack customer</span></div>`,
  };
}

function viewProduct(id, activeTab) {
  activeTab = activeTab || "Description";
  const product = findProduct(id);
  if (!product) return viewNotFound("product");

  const price = product.wasPrice
    ? `${money(product.price)}<span class="was">${money(product.wasPrice)}</span>`
    : money(product.price);

  const variantHTML = product.variantOptions ? `
    <div class="variant-heading">${esc(product.variantLabel)}</div>
    <div class="variant-row" id="variantRow">
      ${product.variantOptions.map((v, i) => `<button type="button" class="variant-btn ${i === 0 ? "active" : ""}" data-variant="${esc(v)}" onclick="Site.selectVariant(this)">${esc(v)}</button>`).join("")}
    </div>` : "";

  const ratingHTML = `<div class="pd-rating">${stars(product.rating)} <span class="count">(${product.reviews} reviews)</span></div>`;

  const tabPanels = tabPanelsFor(product);

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const thumbUrl = PRODUCT_IMAGES[product.id];

  return `
    <main class="wrap view">
      <div class="breadcrumb">
        <a href="#/">Home</a> / <a href="#/shop">Shop</a> / <a href="#/shop/${product.category}">${esc(catName(product.category))}</a> / ${esc(product.name)}
      </div>
      <div class="pd-grid">
        <div>
          ${media("pd-main-media", product, product.name)}
          <div class="pd-thumbs">
            ${thumbUrl
              ? Array.from({ length: 4 }).map(() => `<div class="photo-box pd-thumb"><img src="${thumbUrl}" alt="${esc(product.name)}" loading="lazy"></div>`).join("")
              : ph("pd-thumb") + ph("pd-thumb") + ph("pd-thumb") + ph("pd-thumb")}
          </div>
        </div>
        <div>
          <h1 class="pd-title">${esc(product.name)}</h1>
          ${ratingHTML}
          <div class="pd-price">${price}</div>
          <p class="pd-desc-text">${esc(product.desc)}</p>
          ${variantHTML}
          <div class="variant-heading">Quantity</div>
          <div class="qty-box">
            <button type="button" onclick="Site.stepQty(-1)">&minus;</button>
            <input type="number" id="qtyValue" value="1" min="1" max="99" oninput="Site.setQty(this.value)">
            <button type="button" onclick="Site.stepQty(1)">+</button>
          </div>
          <div class="pd-actions">
            <button type="button" class="btn btn-gold" onclick="Site.addCurrentToCart('${product.id}')">Add to Cart &mdash; ${money(product.price)}</button>
          </div>
        </div>
      </div>

      <div class="tab-row">
        ${TABS.map((t) => `<button type="button" class="tab-btn ${t === activeTab ? "active" : ""}" data-tab="${esc(t)}" onclick="Site.setTab('${product.id}','${t}')">${esc(t)}${t === "Reviews" ? " (" + product.reviews + ")" : ""}</button>`).join("")}
      </div>
      <div class="tab-panel">${tabPanels[activeTab]}</div>

      ${related.length ? `
      <section class="related-section">
        <div class="section-label">You Might Also Like</div>
        <div class="product-grid">${related.map(productCardHTML).join("")}</div>
      </section>` : ""}
    </main>`;
}

function viewInfoPage(slug) {
  const page = INFO_PAGES[slug];
  if (!page) return viewNotFound("page");
  return `
    <main class="wrap view" style="max-width:720px;">
      <div class="breadcrumb"><a href="#/">Home</a> / ${esc(page.title)}</div>
      <h1 class="page-title">${esc(page.title)}</h1>
      ${page.body.map((p) => `<p style="margin-bottom:16px;max-width:none;">${esc(p)}</p>`).join("")}
      <a href="#/shop" class="btn btn-outline" style="margin-top:12px;">Continue Shopping</a>
    </main>`;
}

function viewSearch(rawQuery) {
  const query = decodeURIComponent(rawQuery || "").trim();
  const q = query.toLowerCase();
  const items = query
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        catName(p.category).toLowerCase().includes(q)
      )
    : [];
  return `
    <main class="wrap view">
      <div class="breadcrumb"><a href="#/">Home</a> / Search</div>
      <h1 class="page-title">${items.length} result${items.length === 1 ? "" : "s"} for &ldquo;${esc(query)}&rdquo;</h1>
      <div class="product-grid cols-3">
        ${items.map(productCardHTML).join("") || `<p style="color:var(--text-muted);">No products matched your search. Try a different term, or <a href="#/shop" style="text-decoration:underline;">browse everything</a>.</p>`}
      </div>
    </main>`;
}

const ACCOUNT_USERNAME = "channingtitus13";

function viewAccount() {
  const receipt = safeGet(RECEIPT_KEY, null);
  return `
    <main class="wrap view" style="max-width:720px;">
      <div class="breadcrumb"><a href="#/">Home</a> / Account</div>
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px;">
        <div style="width:56px;height:56px;border-radius:50%;background:var(--felt);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-weight:700;font-size:1.3rem;flex-shrink:0;">CT</div>
        <div>
          <div style="font-size:0.8rem;color:var(--text-muted);">Signed in as</div>
          <h1 style="font-size:1.4rem;">${esc(ACCOUNT_USERNAME)}</h1>
        </div>
      </div>

      <div class="filter-panel" style="margin-bottom:20px;">
        <h4>Order History</h4>
        ${receipt
          ? `<p style="margin-bottom:12px;">Your most recent order: <strong>${esc(receipt.orderId)}</strong> &middot; ${esc(receipt.date)} &middot; ${money(receipt.total)}</p>
             <a href="#/receipt" class="btn btn-outline btn-sm">View Order Summary</a>`
          : `<p style="color:var(--text-muted);margin:0;">No orders yet. Items you check out will show up here.</p>`}
      </div>

      <div class="filter-panel" style="margin-bottom:20px;">
        <h4>Profile</h4>
        <div class="field"><label>Username</label><input type="text" value="${esc(ACCOUNT_USERNAME)}" disabled></div>
        <div class="field" style="margin-bottom:0;"><label>Email</label><input type="text" value="${esc(ACCOUNT_USERNAME)}@example.com" disabled></div>
      </div>

      <div class="scope-note">This is a demo account for preview purposes — there's no real login system behind it yet, so nothing here is editable or saved to a server.</div>
    </main>`;
}

function viewNotFound(what) {
  return `
    <main class="wrap view">
      <div class="empty-state">
        <h2>That ${esc(what)} wandered off the table.</h2>
        <p>We couldn't find what you were looking for.</p>
        <a href="#/" class="btn btn-gold">Back to Home</a>
      </div>
    </main>`;
}

function cartRowHTML(line, index) {
  const p = line.product;
  return `
    <div class="cart-row">
      ${media("cart-thumb", p, p.name)}
      <div>
        <div class="cart-name">${esc(p.name)}</div>
        <div class="cart-meta">${line.variant ? esc(p.variantLabel) + ": " + esc(line.variant) : esc(catName(p.category))}</div>
        <div class="cart-line-actions">
          <span class="qty-box">
            Qty:
            <input type="number" min="1" max="99" value="${line.qty}" class="cart-qty-input" style="width:32px;border:none;background:transparent;text-align:center;color:var(--text-dark);"
              oninput="Site.changeCartQty(${index}, this.value)">
          </span>
          <button type="button" class="remove-link" onclick="Site.removeFromCart(${index})">Remove</button>
        </div>
      </div>
      <div class="cart-price-col">${money(p.price * line.qty)}</div>
    </div>`;
}

function stepsRowHTML(activeIndex) {
  const labels = ["Shipping", "Payment", "Review", "Confirmation"];
  return `
    <div class="steps-row no-print">
      ${labels.map((label, i) => {
        const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "";
        const marker = i < activeIndex ? "&#10003;" : (i + 1);
        return `
          <div class="step-item ${state}">
            <span class="step-circle">${marker}</span>${label}
          </div>
          ${i < labels.length - 1 ? `<span class="step-line"></span>` : ""}`;
      }).join("")}
    </div>`;
}

function viewCart() {
  const lines = cartLines();
  if (!lines.length) {
    return `
      <main class="wrap view">
        <div class="empty-state">
          <h2>Your cart is empty.</h2>
          <p>Add a cue, a case, or a fresh set of chalk to get started.</p>
          <a href="#/shop" class="btn btn-gold">Continue Shopping</a>
        </div>
      </main>`;
  }
  const subtotal = cartSubtotal();
  const tax = subtotal * 0.065;
  const total = subtotal + tax;
  return `
    <main class="wrap view">
      <h1 class="page-title">Your Cart (${cartCount()} item${cartCount() === 1 ? "" : "s"})</h1>
      <div class="cart-layout">
        <div>
          ${lines.map(cartRowHTML).join("")}
          ${stepsRowHTML(0)}
          <div class="scope-note">
            <strong>Heads up:</strong> this is a demo checkout. No payment is collected and nothing ships &mdash; you'll get a printable order summary instead of a real order.
          </div>
        </div>
        <div class="order-summary">
          <h4>Order Summary</h4>
          <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>FREE</span></div>
          <div class="summary-row"><span>Estimated Tax</span><span>${money(tax)}</span></div>
          <hr class="summary-divider">
          <div class="summary-total"><span>Total</span><span>${money(total)}</span></div>
          <button type="button" class="btn btn-gold btn-block" onclick="location.hash='#/checkout'">Proceed to Checkout</button>
          <input type="text" class="promo-input" placeholder="Promo Code" disabled>
        </div>
      </div>
    </main>`;
}

function viewCheckout() {
  const lines = cartLines();
  if (!lines.length) { location.hash = "#/cart"; return ""; }
  const subtotal = cartSubtotal();
  const tax = subtotal * 0.065;
  const total = subtotal + tax;
  return `
    <main class="wrap view">
      ${stepsRowHTML(1)}
      <h1 class="page-title" style="margin-top:24px;">Review Your Order</h1>
      <p style="color:var(--text-muted); margin-bottom:24px;">Confirm your items, then generate a printable order summary. No payment is collected.</p>

      <div class="checkout-form">
        <div style="margin-bottom:28px;">
          ${lines.map((l) => `
            <div class="cart-row" style="grid-template-columns:76px 1fr auto;">
              ${media("cart-thumb", l.product, l.product.name)}
              <div>
                <div class="cart-name">${esc(l.product.name)}</div>
                <div class="cart-meta">${l.variant ? esc(l.product.variantLabel) + ": " + esc(l.variant) + " &middot; " : ""}Qty: ${l.qty}</div>
              </div>
              <div class="cart-price-col">${money(l.product.price * l.qty)}</div>
            </div>`).join("")}
        </div>

        <div class="field">
          <label for="custName">Name (shown on your receipt, optional)</label>
          <input type="text" id="custName" placeholder="Your name">
        </div>
        <div class="field">
          <label for="custEmail">Email (optional &mdash; for your own records, we don't send anything)</label>
          <input type="email" id="custEmail" placeholder="you@example.com">
        </div>

        <div class="order-summary" style="margin-top:24px;">
          <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>FREE</span></div>
          <div class="summary-row"><span>Estimated Tax</span><span>${money(tax)}</span></div>
          <hr class="summary-divider">
          <div class="summary-total"><span>Total</span><span>${money(total)}</span></div>
          <button type="button" class="btn btn-gold btn-block" onclick="Site.placeOrder()">Generate Order Summary</button>
          <a href="#/cart" style="display:block;text-align:center;margin-top:14px;font-size:0.9rem;color:var(--text-muted);text-decoration:underline;">&larr; Back to Cart</a>
        </div>
      </div>
    </main>`;
}

function viewReceipt() {
  const receipt = safeGet(RECEIPT_KEY, null);
  if (!receipt) {
    return `
      <main class="wrap view">
        <div class="empty-state">
          <h2>No recent order found.</h2>
          <p>Add something to your cart and check out to generate an order summary.</p>
          <a href="#/shop" class="btn btn-gold">Start Shopping</a>
        </div>
      </main>`;
  }
  return `
    <main class="wrap view">${stepsRowHTML(3)}</main>
    <div class="receipt-wrap">
      <div class="receipt-box">
        <h3>Cue &amp; Rack</h3>
        <div class="receipt-sub">Order Summary &mdash; not a payment receipt</div>
        <div class="receipt-meta">
          Order ${esc(receipt.orderId)} &middot; ${esc(receipt.date)}
          ${receipt.name ? "<br>Prepared for " + esc(receipt.name) : ""}
        </div>
        ${receipt.items.map((it) => `
          <div class="receipt-line">
            <span>${esc(it.name)}${it.variant ? " (" + esc(it.variant) + ")" : ""} &times;${it.qty}</span>
            <span>${money(it.price * it.qty)}</span>
          </div>`).join("")}
        <div class="receipt-line"><span>Subtotal</span><span>${money(receipt.subtotal)}</span></div>
        <div class="receipt-line"><span>Shipping</span><span>FREE</span></div>
        <div class="receipt-line"><span>Estimated Tax</span><span>${money(receipt.tax)}</span></div>
        <div class="receipt-total"><span>Total</span><span>${money(receipt.total)}</span></div>
        <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:16px;">This is a planning demo &mdash; no payment was collected and nothing will ship.</p>
      </div>
    </div>
    <div class="receipt-actions no-print">
      <button type="button" class="btn btn-gold" onclick="window.print()">Print / Save as PDF</button>
      <a href="#/shop" class="btn btn-outline">Continue Shopping</a>
    </div>`;
}

// ---------------------------------------------------------------------
// 9. ROUTER
// ---------------------------------------------------------------------
let currentProductQty = 1;
let currentVariant = null;
let currentTab = "Description";

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, "").split("?")[0];
  const [route, a] = hash.split("/").filter((x) => x !== undefined && x !== "");
  return { route: route || "", a };
}

function render() {
  const { route, a } = parseHash();
  const url = new URL(location.href);
  let html = "";

  if (route === "") html = viewHome();
  else if (route === "shop") html = viewShop(a, url.searchParams.get("sort") || "featured");
  else if (route === "product") { html = viewProduct(a, currentTab); }
  else if (route === "cart") html = viewCart();
  else if (route === "checkout") html = viewCheckout();
  else if (route === "receipt") html = viewReceipt();
  else if (route === "page") html = viewInfoPage(a);
  else if (route === "search") html = viewSearch(a);
  else if (route === "account") html = viewAccount();
  else html = viewNotFound("page");

  $app().innerHTML = headerHTML() + html + footerHTML();
  updateCartBadge();
  window.scrollTo(0, 0);
}

// ---------------------------------------------------------------------
// 10. PUBLIC API (used by inline handlers)
// ---------------------------------------------------------------------
const Site = {
  toggleSearch() {
    const bar = document.getElementById("searchBar");
    if (!bar) return;
    bar.classList.toggle("open");
    if (bar.classList.contains("open")) {
      const input = document.getElementById("searchInput");
      if (input) setTimeout(() => input.focus(), 50);
    }
  },
  submitSearch(e) {
    e.preventDefault();
    const q = (document.getElementById("searchInput") || {}).value || "";
    const trimmed = q.trim();
    if (!trimmed) return false;
    location.hash = "#/search/" + encodeURIComponent(trimmed);
    return false;
  },
  setSort(value) {
    const { a } = parseHash();
    location.hash = (a ? `#/shop/${a}` : "#/shop") + `?sort=${value}`;
  },
  selectVariant(btn) {
    currentVariant = btn.getAttribute("data-variant");
    Array.from(btn.parentElement.children).forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
  },
  stepQty(delta) {
    currentProductQty = Math.max(1, Math.min(99, currentProductQty + delta));
    const input = document.getElementById("qtyValue");
    if (input) input.value = currentProductQty;
  },
  setQty(value) {
    currentProductQty = Math.max(1, Math.min(99, parseInt(value, 10) || 1));
  },
  addCurrentToCart(id) {
    const product = findProduct(id);
    const variant = product.variantOptions ? (currentVariant || product.variantOptions[0]) : null;
    addToCart(id, variant, currentProductQty);
  },
  changeCartQty(index, value) { updateCartLineQty(index, parseInt(value, 10) || 1); },
  removeFromCart(index) { removeCartLine(index); },
  setTab(productId, tab) {
    // Update just the tab buttons + panel in place — no full re-render,
    // so the page never jumps back to the top when switching tabs.
    currentTab = tab;
    const product = findProduct(productId);
    if (!product) return;
    const panels = tabPanelsFor(product);
    const panelEl = document.querySelector(".tab-panel");
    if (panelEl) panelEl.innerHTML = panels[tab];
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tab);
    });
  },
  placeOrder() {
    const lines = cartLines();
    if (!lines.length) return;
    const subtotal = cartSubtotal();
    const tax = subtotal * 0.065;
    const total = subtotal + tax;
    const name = (document.getElementById("custName") || {}).value || "";
    const receipt = {
      orderId: "CR-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
      name: name.trim(),
      items: lines.map((l) => ({ name: l.product.name, variant: l.variant, qty: l.qty, price: l.product.price })),
      subtotal, tax, total,
    };
    safeSet(RECEIPT_KEY, receipt);
    saveCart([]);
    location.hash = "#/receipt";
  },
};

// ---------------------------------------------------------------------
// 11. INIT
// ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  currentProductQty = 1;
  render();
});
window.addEventListener("hashchange", () => {
  currentProductQty = 1;
  currentVariant = null;
  currentTab = "Description";
  render();
});
