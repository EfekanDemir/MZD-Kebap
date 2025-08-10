# Sultanahmet Kebap Evi - Web Sitesi

Bu proje, Midpoint restoranının web sitesinden ilham alınarak oluşturulmuş modern bir kebap restoranı web sitesidir.

## Özellikler

### 🎨 Tasarım
- Modern ve çekici arayüz tasarımı
- Türk mutfağına uygun renk paleti (bordo, altın, krem)
- Responsive (mobil uyumlu) tasarım
- Smooth scrolling ve animasyonlar

### 📱 Responsive Tasarım
- Masaüstü, tablet ve mobil cihazlara uyumlu
- Mobil hamburger menü
- Esnek grid yapısı

### 🍽️ İçerik Bölümleri
- **Ana Sayfa**: Hero section ve öne çıkan lezzetler
- **Hakkımızda**: Restoran hikayesi ve özellikler
- **Menü**: Kategorili menü (Kebaplar, Başlangıçlar, Tatlılar, İçecekler)
- **Şubeler**: Lokasyon bilgileri ve iletişim
- **İletişim**: Contact form ve sosyal medya linkleri

### ⚡ Interaktif Özellikler
- Dinamik menü kategori değiştirme
- Mobil menü toggle
- Form validasyonu
- Scroll animasyonları
- Navbar background değişimi

## Dosya Yapısı

```
/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── script.js           # JavaScript işlevleri
└── README.md          # Bu dosya
```

## Kullanılan Teknolojiler

- **HTML5**: Semantic markup
- **CSS3**: Modern styling, Flexbox, Grid, Animations
- **JavaScript**: DOM manipulation, Event handling
- **Font Awesome**: İkonlar
- **Google Fonts**: Typography (Playfair Display, Inter)

## Kurulum ve Çalıştırma

### Yerel Geliştirme
```bash
# Dependencies'leri yükleyin
npm install

# Development server'ı başlatın
npm start

# Tarayıcıda açın: http://localhost:3000
```

### Render.com'da Canlıya Alma

#### Hızlı Kurulum (Otomatik)
```bash
# Setup script'ini çalıştırın
./setup-deployment.sh
```

#### Manuel Kurulum
```bash
# Git repository'sini başlatın
git init
git add .
git commit -m "Initial commit"

# GitHub'a yükleyin
git remote add origin https://github.com/username/mzd-kebap-website.git
git push -u origin main
```

Detaylı kılavuz için: **[RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)**

## Assetler için Hazırlık

Şu anda placeholder görsellerle çalışmaktadır. Gerçek görseller eklemek için:

### Görsel Önerileri:
- **Hero Section**: Kebap restoranı ambiyansı (1200x600px)
- **Menü Kartları**: Yemek görselleri (400x200px)
- **Hakkımızda**: Mutfak ekibi veya restoran görüntüsü (600x400px)

### Görsel Yerleri:
```css
/* CSS'de aşağıdaki selector'larda background-image eklenebilir */
.hero .placeholder-image
.menu-image.placeholder-image
.about-image .placeholder-image
```

## Özelleştirme

### Renk Paleti
```css
/* Ana renkler */
--primary-color: #8B2635;    /* Bordo */
--secondary-color: #D4AF37;  /* Altın */
--accent-color: #FFF8DC;     /* Krem */
```

### Typography
- Başlıklar: Playfair Display (Serif)
- Metin: Inter (Sans-serif)

## Tarayıcı Desteği

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Lisans

Bu proje eğitim amaçlı oluşturulmuştur.

## İletişim

Web sitesi geliştirme sürecinde herhangi bir sorunuz olursa benimle iletişime geçebilirsiniz.