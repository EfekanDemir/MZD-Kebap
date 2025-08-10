# 🚀 MZD Kebap - Deployment Özeti

## ✅ Hazırlanan Dosyalar

- `package.json` - Node.js dependencies
- `server.js` - Express.js web server
- `render.yaml` - Render.com konfigürasyonu
- `.gitignore` - Git ignore dosyası
- `.env.example` - Environment variables örneği
- `Procfile` - Process konfigürasyonu
- `setup-deployment.sh` - Otomatik kurulum scripti
- `RENDER_DEPLOYMENT_GUIDE.md` - Detaylı kılavuz

## 🚀 Hızlı Başlangıç

### 1. Otomatik Kurulum
```bash
./setup-deployment.sh
```

### 2. Manuel Kurulum
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

## 🌐 Render.com Adımları

1. **GitHub'a giriş**: [render.com](https://render.com)
2. **New + → Web Service**
3. **Repository seç**
4. **Ayarlar**:
   - Name: `mzd-kebap-website`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: `Free`

## 📱 Test Etme

### Yerel Test
```bash
npm start
# http://localhost:3000
```

### Canlı Site
- **URL**: `https://mzd-kebap-website.onrender.com/`
- **İlk yüklenme**: 1-2 dakika sürebilir (cold start)

## 🔧 Özellikler

- ✅ Multi-language (TR/EN)
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Fast loading (compression)
- ✅ Security headers
- ✅ SSL/HTTPS
- ✅ Auto deployment

## 📞 Destek

- **Detaylı kılavuz**: `RENDER_DEPLOYMENT_GUIDE.md`
- **Render docs**: [render.com/docs](https://render.com/docs)
- **GitHub Issues**: Problem bildirimi için

---

**🎉 Tebrikler! Siteniz canlıya alınmaya hazır!**