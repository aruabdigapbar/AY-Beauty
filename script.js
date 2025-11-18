async function loadProducts() {
  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Ошибка загрузки products.json:', err);
    return [];
  }
}

function formatPrice(price) {
  return `${price} ₸`;
}

function createCard(product) {
  const el = document.createElement('div');
  el.className = 'product';
  el.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="desc">${product.shortDesc}</p>
    <p class="meta">Объём: ${product.volume || '—'}</p>
    <p class="price">${formatPrice(product.price)}</p>
    <button type="button" aria-label="Купить ${product.name}">Купить</button>
  `;

  const btn = el.querySelector('button');
  btn.addEventListener('click', () => {
    // Простая заглушка покупки — позже можно добавить корзину в localStorage
    alert(`Покупка оформлена: ${product.name} — ${formatPrice(product.price)}`);
  });

  return el;
}

function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  if (!list.length) {
    grid.innerHTML = '<p>Товары не найдены.</p>';
    return;
  }
  list.forEach(p => grid.appendChild(createCard(p)));
}

async function init() {
  const products = await loadProducts();
  renderProducts(products);

  const filter = document.getElementById('skinFilter');
  filter.addEventListener('change', () => {
    const value = filter.value;
    const filtered = (value === 'all') ? products : products.filter(p => p.skinType === value);
    renderProducts(filtered);
  });
}

document.addEventListener('DOMContentLoaded', init);