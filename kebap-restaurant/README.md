# Ocakbaşı Kebap — Taslak Web Sitesi

Bu proje, kebap restoranı için modern, responsive bir tek sayfa site taslağıdır. İçerik ve görseller placeholder olarak eklenmiştir.

## Önizleme

- Tarayıcıda `index.html` dosyasını açın
- Veya basit bir sunucu ile çalıştırın:
  - Python (3.x):
    ```bash
    cd kebap-restaurant
    python3 -m http.server 8080
    ```
    Ardından `http://localhost:8080` adresine gidin.

## Yapı

- `index.html`: Semantik bölümler (Hero, Hakkımızda, Menü, Şubeler, Rezervasyon, Galeri, İletişim)
- `styles/main.css`: Tema, layout ve bileşen stilleri
- `scripts/main.js`: Mobil menü, smooth scroll, basit form doğrulama
- `assets/logo.svg`: Geçici logo
- `assets/hero.jpg`: Geçici hero görsel placeholder (gerçek görsel ile değiştirin)

## Özelleştirme

- Logo: `assets/logo.svg` dosyasını kendi logonuz ile değiştirin
- Hero görseli: `assets/hero.jpg` dosyasını değiştirin
- Menü ve metinler: `index.html` içerisinde ilgili başlıkları düzenleyin
- Renkler: `styles/main.css` içindeki `:root` bölümünden tema renklerini güncelleyin

## Notlar

- Rezervasyon formu demonstrasyon amaçlıdır; gerçek entegrasyon eklenmelidir (ör. e‑posta, WhatsApp, veya backend API)
- Galeri ve menü görselleri şu an `picsum.photos` placeholderlarıdır