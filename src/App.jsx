import { useMemo, useState } from 'react'

const cars = [
  {
    id: 1,
    name: 'Mercedes-Benz C 300 AMG',
    brand: 'Mercedes-Benz',
    type: 'Sedan',
    year: 2023,
    price: 1.899,
    priceLabel: '1 tỷ 899 triệu',
    mileage: '8.500 km',
    fuel: 'Xăng',
    transmission: 'Tự động',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85',
    badge: 'Mới về',
    color: '#dce4ec',
  },
  {
    id: 2,
    name: 'BMW X5 xDrive40i',
    brand: 'BMW',
    type: 'SUV',
    year: 2022,
    price: 3.259,
    priceLabel: '3 tỷ 259 triệu',
    mileage: '12.000 km',
    fuel: 'Xăng',
    transmission: 'Tự động',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=85',
    badge: 'Giá tốt',
    color: '#e5e3df',
  },
  {
    id: 3,
    name: 'Porsche Macan',
    brand: 'Porsche',
    type: 'SUV',
    year: 2023,
    price: 3.850,
    priceLabel: '3 tỷ 850 triệu',
    mileage: '5.200 km',
    fuel: 'Xăng',
    transmission: 'Tự động',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1000&q=85',
    badge: 'Chính hãng',
    color: '#e4e6e5',
  },
  {
    id: 4,
    name: 'Lexus ES 250',
    brand: 'Lexus',
    type: 'Sedan',
    year: 2022,
    price: 2.190,
    priceLabel: '2 tỷ 190 triệu',
    mileage: '16.000 km',
    fuel: 'Xăng',
    transmission: 'Tự động',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=1000&q=85',
    badge: '',
    color: '#e3e7e9',
  },
  {
    id: 5,
    name: 'Audi Q5 Sportback',
    brand: 'Audi',
    type: 'SUV',
    year: 2023,
    price: 2.750,
    priceLabel: '2 tỷ 750 triệu',
    mileage: '9.800 km',
    fuel: 'Xăng',
    transmission: 'Tự động',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85',
    badge: 'Xe nổi bật',
    color: '#e1e4e8',
  },
  {
    id: 6,
    name: 'Volvo XC60 Recharge',
    brand: 'Volvo',
    type: 'SUV',
    year: 2024,
    price: 2.990,
    priceLabel: '2 tỷ 990 triệu',
    mileage: '2.100 km',
    fuel: 'Hybrid',
    transmission: 'Tự động',
    image: 'https://images.unsplash.com/photo-1631810716002-27f0b5dfd827?auto=format&fit=crop&w=1000&q=85',
    badge: 'Như xe mới',
    color: '#e7e7e3',
  },
  {
    id: 7,
    name: 'Porsche 911 Carrera',
    brand: 'Porsche',
    type: 'Coupe',
    year: 2022,
    price: 6.290,
    priceLabel: '6 tỷ 290 triệu',
    mileage: '7.300 km',
    fuel: 'Xăng',
    transmission: 'Tự động',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85',
    badge: 'Xe thể thao',
    color: '#e7e3df',
  },
  {
    id: 8,
    name: 'Tesla Model 3 Long Range',
    brand: 'Tesla',
    type: 'Xe điện',
    year: 2023,
    price: 1.590,
    priceLabel: '1 tỷ 590 triệu',
    mileage: '4.600 km',
    fuel: 'Điện',
    transmission: 'Tự động',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea?auto=format&fit=crop&w=1000&q=85',
    badge: 'Xe điện',
    color: '#e3e7e9',
  },
]

const categories = ['Tất cả xe', 'Sedan', 'SUV', 'Coupe', 'Xe điện']

function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    fuel: <><path d="M3 22h12" /><path d="M4 9V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17" /><path d="M14 13h2l3 3v4a2 2 0 0 0 4 0v-7l-4-4" /><path d="M8 7h2" /></>,
    speed: <><path d="m12 14 4-4" /><path d="M3.3 17a10 10 0 1 1 17.4 0" /><path d="M12 14v.1" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [category, setCategory] = useState('Tất cả xe')
  const [query, setQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [modalCar, setModalCar] = useState(null)
  const [appointmentOpen, setAppointmentOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)

  const filteredCars = useMemo(() => cars.filter((car) => {
    const matchesCategory = category === 'Tất cả xe' || car.type === category
    const matchesQuery = `${car.name} ${car.brand}`.toLowerCase().includes(query.trim().toLowerCase())
    const matchesPrice = priceRange === 'all'
      || (priceRange === 'under-2' && car.price < 2)
      || (priceRange === '2-3' && car.price >= 2 && car.price <= 3)
      || (priceRange === 'over-3' && car.price > 3)
    return matchesCategory && matchesQuery && matchesPrice
  }), [category, query, priceRange])

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function submitAppointment(event) {
    event.preventDefault()
    setAppointmentOpen(false)
    setModalCar(null)
    setNotice('Đã nhận yêu cầu! AUTORA sẽ liên hệ với bạn sớm nhất.')
    window.setTimeout(() => setNotice(''), 4500)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="AUTORA trang chủ">
          <span className="brand-mark">A<span>.</span></span>
          <span className="brand-name">AUTORA<span>DRIVE YOUR WAY</span></span>
        </a>
        <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Mở menu">
          <Icon name={mobileMenu ? 'close' : 'menu'} size={22} />
        </button>
        <nav className={mobileMenu ? 'main-nav is-open' : 'main-nav'}>
          <a className="nav-active" href="#xe" onClick={() => setMobileMenu(false)}>Mua xe</a>
          <a href="#ve-chung-toi" onClick={() => setMobileMenu(false)}>Về AUTORA</a>
          <a href="#quy-trinh" onClick={() => setMobileMenu(false)}>Quy trình</a>
          <a href="#lien-he" onClick={() => setMobileMenu(false)}>Liên hệ</a>
          <button className="nav-cta" onClick={() => { setModalCar(null); setAppointmentOpen(true) }}>Tư vấn ngay <Icon name="arrow" size={16} /></button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> SHOWROOM XE CAO CẤP</div>
            <h1>Chọn xe tốt.<br /><span>Chọn an tâm.</span></h1>
            <p>Hành trình tìm chiếc xe phù hợp của bạn, bắt đầu từ trải nghiệm mua xe minh bạch và tận tâm.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#xe">Khám phá xe <Icon name="arrow" size={17} /></a>
              <button className="text-button" onClick={() => { setModalCar(null); setAppointmentOpen(true) }}>Tư vấn miễn phí <span>↗</span></button>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars"><span>H</span><span>M</span><span>A</span><b>+</b></div>
              <div><strong>2.000+</strong><small>khách hàng hài lòng</small></div>
              <div className="proof-divider" />
              <div className="proof-rating"><strong>4.9<span> ★</span></strong><small>đánh giá khách hàng</small></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image" role="img" aria-label="Xe sedan sang trọng đỗ trên con đường núi" />
            <div className="image-caption"><span className="caption-dot" /> CHUYẾN ĐI CỦA BẠN, PHIÊN BẢN TỐT HƠN</div>
            <div className="hero-floating-card">
              <span className="floating-icon"><Icon name="check" size={17} /></span>
              <span><strong>Đã kiểm định 160 điểm</strong><small>An tâm trên mọi hành trình</small></span>
            </div>
            <span className="hero-index">01 <i /> 03</span>
          </div>
          <div className="hero-side-label">AUTORA SELECTION — 2024</div>
        </section>

        <section className="trust-strip" id="ve-chung-toi">
          <div className="trust-item"><span className="trust-icon">✳</span><span><strong>Xe chất lượng</strong><small>Kiểm định 160 điểm</small></span></div>
          <div className="trust-item"><span className="trust-icon">◇</span><span><strong>Giá minh bạch</strong><small>Không phí ẩn</small></span></div>
          <div className="trust-item"><span className="trust-icon">↗</span><span><strong>Hỗ trợ tận tâm</strong><small>Đồng hành dài lâu</small></span></div>
          <div className="trust-item"><span className="trust-icon">⌂</span><span><strong>Đổi xe dễ dàng</strong><small>Thu cũ, đổi mới</small></span></div>
        </section>

        <section className="inventory-section" id="xe">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> TUYỂN CHỌN DÀNH RIÊNG CHO BẠN</div>
              <h2>Những chiếc xe <span>đáng sở hữu.</span></h2>
            </div>
            <a className="all-cars-link" href="#xe">Xem tất cả xe <Icon name="arrow" size={17} /></a>
          </div>

          <div className="inventory-tools">
            <div className="category-tabs" role="tablist" aria-label="Lọc theo loại xe">
              {categories.map((item) => (
                <button key={item} className={category === item ? 'category-tab selected' : 'category-tab'} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{item}</button>
              ))}
            </div>
            <div className="filters">
              <label className="search-field">
                <Icon name="search" size={18} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm hãng xe, mẫu xe..." aria-label="Tìm xe" />
              </label>
              <label className="price-select">
                <span className="sr-only">Lọc theo giá</span>
                <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
                  <option value="all">Mức giá</option>
                  <option value="under-2">Dưới 2 tỷ</option>
                  <option value="2-3">2 – 3 tỷ</option>
                  <option value="over-3">Trên 3 tỷ</option>
                </select>
                <Icon name="chevron" size={16} />
              </label>
            </div>
          </div>

          {filteredCars.length > 0 ? (
            <div className="car-grid">
              {filteredCars.map((car) => (
                <article className="car-card" key={car.id}>
                  <div className="car-image-wrap" style={{ backgroundColor: car.color }}>
                    <img src={car.image} alt={car.name} loading="lazy" />
                    {car.badge && <span className="car-badge">{car.badge}</span>}
                    <button className={favorites.includes(car.id) ? 'favorite-button is-favorite' : 'favorite-button'} onClick={() => toggleFavorite(car.id)} aria-label={favorites.includes(car.id) ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'} aria-pressed={favorites.includes(car.id)}><Icon name="heart" size={18} /></button>
                  </div>
                  <div className="car-info">
                    <div className="car-year">{car.year} <span>•</span> {car.brand}</div>
                    <h3>{car.name}</h3>
                    <div className="car-specs"><span><Icon name="speed" size={15} />{car.mileage}</span><span><Icon name="fuel" size={15} />{car.fuel}</span><span>{car.transmission}</span></div>
                    <div className="car-card-bottom">
                      <div><small>Giá bán</small><strong>{car.priceLabel}</strong></div>
                      <button className="car-arrow" onClick={() => { setModalCar(car); setAppointmentOpen(true) }} aria-label={`Đặt lịch xem ${car.name}`}><Icon name="arrow" size={18} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state"><span>⌕</span><h3>Chưa tìm thấy chiếc xe phù hợp</h3><p>Thử đổi từ khóa hoặc bộ lọc để xem thêm lựa chọn nhé.</p><button onClick={() => { setQuery(''); setPriceRange('all'); setCategory('Tất cả xe') }}>Xóa bộ lọc</button></div>
          )}
          <div className="inventory-footer"><span>Đang hiển thị <strong>{filteredCars.length}</strong> trên <strong>{cars.length}</strong> xe tuyển chọn</span><a href="#lien-he">Bạn cần tìm mẫu xe khác? <strong>Liên hệ với chúng tôi <Icon name="arrow" size={15} /></strong></a></div>
        </section>

        <section className="experience-section" id="quy-trinh">
          <div className="experience-photo"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1300&q=85" alt="Xe sang trong không gian showroom" loading="lazy" /><div className="experience-stamp"><strong>10+</strong><span>NĂM KINH<br />NGHIỆM</span></div></div>
          <div className="experience-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> KHÁC BIỆT TỪ SỰ TẬN TÂM</div>
            <h2>Mua xe không chỉ là một giao dịch.</h2>
            <p>Đó là khởi đầu của những hành trình mới. AUTORA chăm chút từng chi tiết để mỗi quyết định của bạn đều thật sự xứng đáng.</p>
            <ul><li><span><Icon name="check" size={15} /></span> Lịch sử xe rõ ràng, kiểm định độc lập</li><li><span><Icon name="check" size={15} /></span> Tư vấn đúng nhu cầu, không áp lực</li><li><span><Icon name="check" size={15} /></span> Hỗ trợ hồ sơ và tài chính trọn gói</li></ul>
            <button className="button button-dark" onClick={() => { setModalCar(null); setAppointmentOpen(true) }}>Tìm hiểu về AUTORA <Icon name="arrow" size={17} /></button>
          </div>
        </section>

        <section className="contact-banner" id="lien-he">
          <div><div className="eyebrow"><span className="eyebrow-line" /> BẠN ĐANG TÌM CHIẾC XE CỦA MÌNH?</div><h2>Hãy để chúng tôi giúp bạn.</h2></div>
          <button className="button button-light" onClick={() => { setModalCar(null); setAppointmentOpen(true) }}>Nhận tư vấn miễn phí <Icon name="arrow" size={17} /></button>
          <span className="banner-decoration">A.</span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark">A<span>.</span></span><span className="brand-name">AUTORA<span>DRIVE YOUR WAY</span></span></a>
        <p><Icon name="pin" size={15} /> 28 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
        <span>© 2024 AUTORA. All rights reserved.</span>
      </footer>

      {appointmentOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) { setAppointmentOpen(false); setModalCar(null) } }}>
          <div className="appointment-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => { setAppointmentOpen(false); setModalCar(null) }} aria-label="Đóng"><Icon name="close" size={20} /></button>
            <div className="eyebrow"><span className="eyebrow-line" /> AUTORA LUÔN SẴN SÀNG</div>
            <h2 id="modal-title">{modalCar ? 'Đặt lịch xem xe' : 'Bắt đầu hành trình mới.'}</h2>
            <p>{modalCar ? `Để lại thông tin, chuyên viên sẽ liên hệ tư vấn ${modalCar.name}.` : 'Để lại thông tin, chúng tôi sẽ giúp bạn tìm chiếc xe phù hợp.'}</p>
            <form onSubmit={submitAppointment}>
              <label>Họ và tên<input required name="name" placeholder="Nguyễn Minh Anh" /></label>
              <label>Số điện thoại<input required name="phone" type="tel" pattern="[0-9+() .-]{9,15}" placeholder="09xx xxx xxx" /></label>
              <button className="button button-dark" type="submit">Gửi yêu cầu <Icon name="arrow" size={17} /></button>
            </form>
            <span className="modal-note">Thông tin của bạn được bảo mật tuyệt đối.</span>
          </div>
        </div>
      )}
      {notice && <div className="toast" role="status"><span><Icon name="check" size={17} /></span>{notice}</div>}
    </div>
  )
}

export default App
