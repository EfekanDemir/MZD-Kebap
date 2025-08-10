#!/bin/bash

# MZD Kebap Website - Render.com Deployment Setup Script
# Bu script deployment için gerekli adımları otomatik olarak gerçekleştirir

echo "🍽️  MZD Kebap Website - Render.com Deployment Setup"
echo "=================================================="

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Hata kontrolü fonksiyonu
check_error() {
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Hata: $1${NC}"
        exit 1
    fi
}

# Git kontrol
echo -e "${BLUE}🔍 Git kontrolü yapılıyor...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git kurulu değil. Lütfen Git'i kurun: https://git-scm.com/${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git kurulu${NC}"

# Node.js kontrol
echo -e "${BLUE}🔍 Node.js kontrolü yapılıyor...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js kurulu değil. Yerel test için gerekli${NC}"
else
    echo -e "${GREEN}✅ Node.js kurulu ($(node --version))${NC}"
fi

# NPM kontrol
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm kurulu değil. Yerel test için gerekli${NC}"
else
    echo -e "${GREEN}✅ npm kurulu ($(npm --version))${NC}"
fi

# Git repository kontrolü
echo -e "\n${BLUE}🔍 Git repository kontrolü...${NC}"
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📦 Git repository başlatılıyor...${NC}"
    git init
    check_error "Git repository başlatılamadı"
    echo -e "${GREEN}✅ Git repository başlatıldı${NC}"
else
    echo -e "${GREEN}✅ Git repository mevcut${NC}"
fi

# Dependencies kurulumu (eğer Node.js varsa)
if command -v npm &> /dev/null; then
    echo -e "\n${BLUE}📦 Dependencies kuruluyor...${NC}"
    npm install
    check_error "Dependencies kurulamadı"
    echo -e "${GREEN}✅ Dependencies kuruldu${NC}"
fi

# Git add ve commit
echo -e "\n${BLUE}📝 Dosyalar Git'e ekleniyor...${NC}"
git add .
check_error "Git add başarısız"

echo -e "${BLUE}💾 Commit yapılıyor...${NC}"
git commit -m "Initial commit: MZD Kebap website ready for deployment" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Commit yapılamadı (dosyalar değişmemiş olabilir)${NC}"
else
    echo -e "${GREEN}✅ Commit yapıldı${NC}"
fi

# Remote repository URL'si al
echo -e "\n${YELLOW}🔗 GitHub repository URL'inizi girin:${NC}"
echo -e "${BLUE}Örnek: https://github.com/username/mzd-kebap-website.git${NC}"
read -p "GitHub URL: " github_url

if [ ! -z "$github_url" ]; then
    echo -e "${BLUE}🔗 Remote repository ekleniyor...${NC}"
    git remote remove origin 2>/dev/null
    git remote add origin "$github_url"
    check_error "Remote repository eklenemedi"
    
    echo -e "${BLUE}📤 GitHub'a push yapılıyor...${NC}"
    git branch -M main
    git push -u origin main
    check_error "GitHub'a push yapılamadı"
    
    echo -e "${GREEN}✅ Kod GitHub'a yüklendi${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub URL girilmedi. Manuel olarak push yapmanız gerekiyor.${NC}"
fi

# Test server (eğer Node.js varsa)
if command -v npm &> /dev/null; then
    echo -e "\n${BLUE}🚀 Test server başlatılıyor...${NC}"
    echo -e "${YELLOW}📝 Test için: http://localhost:3000${NC}"
    echo -e "${YELLOW}🛑 Durdurmak için: Ctrl+C${NC}"
    echo -e "\n${GREEN}✅ Hazır! Server başlatılıyor...${NC}"
    sleep 2
    npm start
else
    echo -e "\n${YELLOW}⚠️  Node.js kurulu olmadığı için test server başlatılamıyor${NC}"
fi

echo -e "\n${GREEN}🎉 Setup tamamlandı!${NC}"
echo -e "\n${BLUE}📋 Sonraki Adımlar:${NC}"
echo -e "1. Render.com'a gidin: https://render.com/"
echo -e "2. GitHub hesabınızla giriş yapın"
echo -e "3. 'New +' → 'Web Service' seçin"
echo -e "4. Repository'nizi seçin"
echo -e "5. Ayarları yapın ve deploy edin"
echo -e "\n${YELLOW}📖 Detaylı kılavuz: RENDER_DEPLOYMENT_GUIDE.md${NC}"