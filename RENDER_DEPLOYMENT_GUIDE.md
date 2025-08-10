# 🚀 MZD Kebap Website - Render.com Deployment Kılavuzu

Bu kılavuz, MZD Kebap ve Dürüm Evi web sitesini Render.com'da nasıl canlıya alacağınızı adım adım anlatmaktadır.

## 📋 Ön Gereksinimler

- [Git](https://git-scm.com/) kurulu olmalı
- [GitHub](https://github.com/) hesabı
- [Render.com](https://render.com/) hesabı (ücretsiz)

## 🛠️ Kurulum Adımları

### 1. GitHub Repository Oluşturma

1. GitHub'da yeni bir repository oluşturun
2. Repository adını örneğin `mzd-kebap-website` yapabilirsiniz
3. Repository'yi public veya private olarak ayarlayın

### 2. Projeyi GitHub'a Yükleme

Proje klasöründe terminal açın ve şu komutları çalıştırın:

```bash
# Git repository'sini başlatın
git init

# Tüm dosyaları stage'e ekleyin
git add .

# İlk commit'i yapın
git commit -m "Initial commit: MZD Kebap website ready for deployment"

# GitHub repository'nizi remote olarak ekleyin (YOUR_USERNAME yerine GitHub kullanıcı adınızı yazın)
git remote add origin https://github.com/YOUR_USERNAME/mzd-kebap-website.git

# Ana branch'i main olarak ayarlayın
git branch -M main

# GitHub'a push yapın
git push -u origin main
```

### 3. Render.com'da Deployment

#### Adım 1: Render.com'a Giriş
1. [Render.com](https://render.com/) sitesine gidin
2. GitHub hesabınızla giriş yapın

#### Adım 2: Yeni Web Service Oluşturma
1. Dashboard'da **"New +"** butonuna tıklayın
2. **"Web Service"** seçeneğini seçin
3. GitHub repository'nizi bulup **"Connect"** butonuna tıklayın

#### Adım 3: Deployment Ayarları
Aşağıdaki ayarları yapın:

- **Name**: `mzd-kebap-website` (veya istediğiniz isim)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free` (ücretsiz plan)

#### Adım 4: Environment Variables (İsteğe Bağlı)
- `NODE_ENV`: `production`

#### Adım 5: Deploy
1. **"Create Web Service"** butonuna tıklayın
2. Deployment işlemi otomatik olarak başlayacak
3. 5-10 dakika bekleyin

## 🌐 Erişim

Deployment tamamlandıktan sonra sitenize şu adreslerden erişebilirsiniz:
- **Render URL**: `https://mzd-kebap-website.onrender.com/`
- **Custom Domain** (isterseniz daha sonra ekleyebilirsiniz)

## 📝 Proje Dosya Yapısı

```
mzd-kebap-website/
├── index.html              # Ana sayfa
├── pages/                  # Diğer sayfalar
│   ├── menu.html
│   ├── our-story.html
│   ├── contact.html
│   └── reservation.html
├── assets/                 # Statik dosyalar
│   ├── images/            # Resimler
│   └── css/               # CSS dosyaları
├── js/
│   └── app.js             # JavaScript dosyası
├── package.json           # Node.js dependencies
├── server.js              # Express.js server
├── render.yaml            # Render.com konfigürasyonu
├── .gitignore            # Git ignore dosyası
├── .env.example          # Environment variables örneği
└── Procfile              # Process dosyası
```

## 🔧 Konfigürasyon Dosyaları

### package.json
Node.js dependencies ve scripts tanımları içerir.

### server.js
Express.js tabanlı basit web server:
- Statik dosya servisi
- Compression middleware
- Security headers
- Routing for all pages

### render.yaml
Render.com otomatik deployment konfigürasyonu.

## 🚀 Özellikler

### ✅ Hazır Özellikler
- ✅ Multi-language support (Türkçe/İngilizce)
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Fast loading with compression
- ✅ Security headers
- ✅ CDN integration (Tailwind, Google Fonts, Font Awesome)

### 🔄 Otomatik Deployment
- Her GitHub push'unda otomatik deployment
- Zero-downtime deployment
- SSL sertifikası (HTTPS)

## 🛠️ Yerel Geliştirme

Projeyi yerel ortamda çalıştırmak için:

```bash
# Dependencies'leri yükleyin
npm install

# Development server'ı başlatın
npm start

# Tarayıcıda açın: http://localhost:3000
```

## 🎨 Özelleştirme

### Domain Değiştirme
Kendi domain'inizi kullanmak için:
1. Render dashboard'da "Settings" > "Custom Domains"
2. Domain'inizi ekleyin
3. DNS ayarlarını yapın

### Meta Tags Güncelleme
`index.html` dosyasındaki meta tagları güncelleyin:
```html
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:image" content="https://yourdomain.com/assets/images/hero-bg.jpg">
```

## 🔍 Debugging

### Log'ları Görüntüleme
Render dashboard'da:
1. Service'inizi seçin
2. "Logs" sekmesine gidin
3. Real-time log'ları görüntüleyin

### Yaygın Problemler

#### Build Hatası
```bash
# package.json kontrolü
npm install --dry-run

# Dependencies kontrolü
npm audit
```

#### Port Problemi
Render.com otomatik olarak PORT environment variable'ını ayarlar. server.js dosyasında bu zaten handle edilmiştir.

#### Static Files Bulunamıyor
Server.js dosyasında static middleware doğru konfigüre edilmiştir. Path'leri kontrol edin.

## 🚨 Güvenlik

### HTTPS
Render.com otomatik olarak SSL sertifikası sağlar.

### Security Headers
Helmet.js middleware ile güvenlik başlıkları eklenmiştir.

### Environment Variables
Hassas bilgileri .env dosyasında tutun ve .gitignore'a ekleyin.

## 📈 Performance

### Optimization
- Gzip compression aktif
- Static file caching (1 day)
- CDN kullanımı (external resources)

### Monitoring
Render dashboard'da performance metriklerini takip edebilirsiniz.

## 🆘 Destek

### Render.com Desteği
- [Render.com Documentation](https://render.com/docs)
- [Render.com Community](https://community.render.com/)

### Proje Desteği
Herhangi bir problemle karşılaştığınızda:
1. Logs'ları kontrol edin
2. GitHub Issues'da sorun bildirin
3. Bu kılavuzu tekrar gözden geçirin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 🎉 Tebrikler!

Siteniz artık canlıda! MZD Kebap ve Dürüm Evi web sitesi başarıyla Render.com'da yayına alınmıştır.

**Render URL**: https://mzd-kebap-website.onrender.com/

> **Not**: İlk erişimde site biraz yavaş açılabilir (cold start). Bu normal bir durumdur ve ücretsiz planın bir özelliğidir.