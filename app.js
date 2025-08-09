/**
 * Sultan's Feast - Multi-Language Support & App Logic
 * Handles language switching, localStorage persistence, and dynamic content translation
 */

class LanguageManager {
    constructor() {
        this.currentLanguage = 'tr'; // Default to Turkish
        this.storageKey = 'sultans-feast-language';
        this.supportedLanguages = ['tr', 'en'];
        
        this.init();
    }
    
    /**
     * Initialize the language manager
     */
    init() {
        // Load saved language or default to Turkish
        this.currentLanguage = this.getStoredLanguage();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupLanguageSwitchers();
                this.setLanguage(this.currentLanguage);
                this.updateLanguageSwitcherUI();
            });
        } else {
            this.setupLanguageSwitchers();
            this.setLanguage(this.currentLanguage);
            this.updateLanguageSwitcherUI();
        }
    }
    
    /**
     * Get stored language from localStorage
     */
    getStoredLanguage() {
        const stored = localStorage.getItem(this.storageKey);
        return this.supportedLanguages.includes(stored) ? stored : 'tr';
    }
    
    /**
     * Store language preference in localStorage
     */
    storeLanguage(lang) {
        localStorage.setItem(this.storageKey, lang);
    }
    
    /**
     * Set up event listeners for language switchers
     */
    setupLanguageSwitchers() {
        // Desktop language switchers
        const trSwitchers = document.querySelectorAll('[data-lang-switch="tr"]');
        const enSwitchers = document.querySelectorAll('[data-lang-switch="en"]');
        
        trSwitchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                e.preventDefault();
                this.setLanguage('tr');
            });
        });
        
        enSwitchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                e.preventDefault();
                this.setLanguage('en');
            });
        });
        
        // Mobile language switchers
        const mobileTrSwitchers = document.querySelectorAll('[data-mobile-lang-switch="tr"]');
        const mobileEnSwitchers = document.querySelectorAll('[data-mobile-lang-switch="en"]');
        
        mobileTrSwitchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                e.preventDefault();
                this.setLanguage('tr');
            });
        });
        
        mobileEnSwitchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                e.preventDefault();
                this.setLanguage('en');
            });
        });
    }
    
    /**
     * Set the active language and translate all content
     */
    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Unsupported language: ${lang}`);
            return;
        }
        
        this.currentLanguage = lang;
        this.storeLanguage(lang);
        
        // Translate all elements with data-lang attributes
        this.translateElements();
        
        // Update language switcher UI
        this.updateLanguageSwitcherUI();
        
        // Update page title and meta description if available
        this.updatePageMeta();
        
        // Trigger custom event for other components to react
        this.dispatchLanguageChangeEvent();
        
        // Special handling for menu page
        if (window.location.pathname.includes('menu.html') && typeof window.renderMenu === 'function') {
            window.renderMenu(lang);
        }
        
        // Update document language attribute
        document.documentElement.lang = lang;
    }
    
    /**
     * Translate all elements with data-lang attributes
     */
    translateElements() {
        const elements = document.querySelectorAll(`[data-lang-${this.currentLanguage}]`);
        
        elements.forEach(element => {
            const translation = element.getAttribute(`data-lang-${this.currentLanguage}`);
            if (translation) {
                // Handle different content types
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = translation;
                } else if (element.hasAttribute('placeholder')) {
                    // Handle placeholder attributes
                    const placeholderKey = `data-placeholder-${this.currentLanguage}`;
                    const placeholderTranslation = element.getAttribute(placeholderKey);
                    if (placeholderTranslation) {
                        element.placeholder = placeholderTranslation;
                    }
                } else if (element.hasAttribute('alt')) {
                    // Handle alt attributes for images
                    const altKey = `data-alt-${this.currentLanguage}`;
                    const altTranslation = element.getAttribute(altKey);
                    if (altTranslation) {
                        element.alt = altTranslation;
                    }
                } else {
                    // Handle regular text content
                    if (element.innerHTML.includes('<') && !element.innerHTML.includes('data-lang-')) {
                        // If element contains HTML but no nested translatable elements
                        element.innerHTML = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            }
        });
    }
    
    /**
     * Update language switcher UI to show active language
     */
    updateLanguageSwitcherUI() {
        // Update desktop language switchers
        const allSwitchers = document.querySelectorAll('[data-lang-switch]');
        allSwitchers.forEach(switcher => {
            const switchLang = switcher.getAttribute('data-lang-switch');
            if (switchLang === this.currentLanguage) {
                switcher.classList.add('text-gold');
                switcher.classList.remove('text-white', 'text-gray-300');
            } else {
                switcher.classList.remove('text-gold');
                switcher.classList.add('text-white');
            }
        });
        
        // Update mobile language switchers
        const allMobileSwitchers = document.querySelectorAll('[data-mobile-lang-switch]');
        allMobileSwitchers.forEach(switcher => {
            const switchLang = switcher.getAttribute('data-mobile-lang-switch');
            if (switchLang === this.currentLanguage) {
                switcher.classList.add('text-gold');
                switcher.classList.remove('text-white', 'text-gray-300');
            } else {
                switcher.classList.remove('text-gold');
                switcher.classList.add('text-white');
            }
        });
    }
    
    /**
     * Update page title and meta description based on current language
     */
    updatePageMeta() {
        const titleElement = document.querySelector('title[data-lang-tr][data-lang-en]');
        if (titleElement) {
            const newTitle = titleElement.getAttribute(`data-lang-${this.currentLanguage}`);
            if (newTitle) {
                document.title = newTitle;
            }
        }
        
        const metaDescription = document.querySelector('meta[name="description"][data-lang-tr][data-lang-en]');
        if (metaDescription) {
            const newDescription = metaDescription.getAttribute(`data-lang-${this.currentLanguage}`);
            if (newDescription) {
                metaDescription.setAttribute('content', newDescription);
            }
        }
    }
    
    /**
     * Dispatch custom event when language changes
     */
    dispatchLanguageChangeEvent() {
        const event = new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    /**
     * Translate a specific string based on current language
     */
    translate(trText, enText) {
        return this.currentLanguage === 'tr' ? trText : enText;
    }
}

/**
 * Menu Data Manager for dynamic menu rendering
 */
class MenuManager {
    constructor(languageManager) {
        this.languageManager = languageManager;
        this.menuData = null;
        this.activeFilter = 'all';
    }
    
    /**
     * Set menu data
     */
    setMenuData(data) {
        this.menuData = data;
    }
    
    /**
     * Render menu with current language
     */
    renderMenu(lang = null) {
        const currentLang = lang || this.languageManager.getCurrentLanguage();
        
        if (!this.menuData) {
            console.warn('Menu data not available');
            return;
        }
        
        const menuContainer = document.getElementById('menu-container');
        const loadingElement = document.getElementById('menu-loading');
        
        if (!menuContainer) return;
        
        // Show loading state
        setTimeout(() => {
            if (loadingElement) loadingElement.classList.add('hidden');
            menuContainer.classList.remove('hidden');
            
            // Clear existing content
            menuContainer.innerHTML = '';
            
            // Generate category filters
            this.generateCategoryFilters(currentLang);
            
            // Render each category
            this.menuData.categories.forEach((category, index) => {
                if (this.activeFilter === 'all' || this.activeFilter === category.id) {
                    const categorySection = this.createCategorySection(category, index, currentLang);
                    menuContainer.appendChild(categorySection);
                }
            });
            
            // Add fade-in animations
            this.addFadeInAnimations();
        }, 800);
    }
    
    /**
     * Generate category filter buttons
     */
    generateCategoryFilters(lang) {
        const filtersContainer = document.getElementById('category-filters');
        if (!filtersContainer) return;
        
        // Clear existing filters except "All" button
        const allButton = filtersContainer.querySelector('[data-category="all"]');
        filtersContainer.innerHTML = '';
        
        if (allButton) {
            // Update "All" button text
            const allButtonText = lang === 'tr' ? 'Tüm Menü' : 'All Menu';
            allButton.innerHTML = `<i class="fas fa-th-large mr-2"></i>${allButtonText}`;
            filtersContainer.appendChild(allButton);
        }
        
        // Add category filters
        this.menuData.categories.forEach(category => {
            const filterButton = document.createElement('button');
            filterButton.className = 'filter-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gray-700 text-white hover:bg-gray-600';
            filterButton.setAttribute('data-category', category.id);
            
            const categoryName = category[`name_${lang}`] || category.name_tr;
            filterButton.innerHTML = `<i class="${category.icon} mr-2"></i>${categoryName}`;
            
            filterButton.addEventListener('click', () => {
                this.setActiveFilter(category.id);
            });
            
            filtersContainer.appendChild(filterButton);
        });
    }
    
    /**
     * Set active filter
     */
    setActiveFilter(categoryId) {
        this.activeFilter = categoryId;
        
        // Update button styles
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-gold', 'text-gray-900');
            btn.classList.add('bg-gray-700', 'text-white');
        });
        
        const activeButton = document.querySelector(`[data-category="${categoryId}"]`);
        if (activeButton) {
            activeButton.classList.remove('bg-gray-700', 'text-white');
            activeButton.classList.add('bg-gold', 'text-gray-900');
        }
        
        // Re-render menu
        this.renderMenu();
    }
    
    /**
     * Create category section
     */
    createCategorySection(category, index, lang) {
        const section = document.createElement('section');
        section.className = 'mb-16';
        section.style.animationDelay = `${index * 0.1}s`;
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'text-center mb-12';
        
        const categoryName = category[`name_${lang}`] || category.name_tr;
        categoryHeader.innerHTML = `
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
                <i class="${category.icon} text-2xl text-gray-900"></i>
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold text-gold mb-4">${categoryName}</h2>
            <div class="w-24 h-1 bg-gold mx-auto rounded"></div>
        `;
        
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12';
        
        category.items.forEach((item, itemIndex) => {
            const menuCard = this.createMenuCard(item, itemIndex, lang);
            itemsGrid.appendChild(menuCard);
        });
        
        section.appendChild(categoryHeader);
        section.appendChild(itemsGrid);
        
        return section;
    }
    
    /**
     * Create menu card
     */
    createMenuCard(item, index, lang) {
        const card = document.createElement('div');
        card.className = 'menu-card bg-gray-800 rounded-lg overflow-hidden shadow-lg relative';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const itemName = item[`name_${lang}`] || item.name_tr;
        const itemDescription = item[`description_${lang}`] || item.description_tr;
        
        // Popular badge
        const popularText = lang === 'tr' ? 'Popüler' : 'Popular';
        const popularBadge = item.isPopular ? 
            `<div class="absolute top-4 left-4 z-10 bg-gold text-gray-900 px-3 py-1 rounded-full text-sm font-bold">${popularText}</div>` : '';
        
        // Vegetarian badge
        const vegetarianText = lang === 'tr' ? 'Vejetaryen' : 'Vegetarian';
        const vegetarianBadge = item.isVegetarian ? 
            `<div class="absolute top-4 right-4 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"><i class="fas fa-leaf mr-1"></i>${vegetarianText}</div>` : '';
        
        // Button text
        const addToCartText = lang === 'tr' ? 'Sepete Ekle' : 'Add to Cart';
        const detailsText = lang === 'tr' ? 'Detaylar' : 'Details';
        
        card.innerHTML = `
            ${popularBadge}
            ${vegetarianBadge}
            <div class="relative overflow-hidden">
                <img src="${item.image}" 
                     alt="${itemName}" 
                     class="menu-image w-full h-48 object-cover loading-shimmer"
                     loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-bold text-gold">${itemName}</h3>
                    <span class="text-lg font-bold text-gold ml-4">${item.price}</span>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed mb-4">${itemDescription}</p>
                <div class="flex justify-between items-center">
                    <button class="btn-gold text-gray-900 px-4 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform" 
                            onclick="addToOrder('${item.id}')">
                        <i class="fas fa-plus mr-1"></i>${addToCartText}
                    </button>
                    <button class="text-gold hover:text-yellow-300 transition-colors" 
                            onclick="viewItemDetails('${item.id}')">
                        <i class="fas fa-info-circle mr-1"></i>${detailsText}
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    /**
     * Add fade-in animations
     */
    addFadeInAnimations() {
        const animatedElements = document.querySelectorAll('.menu-card, section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

/**
 * Utility Functions
 */
const AppUtils = {
    /**
     * Format date according to language
     */
    formatDate: function(date, lang) {
        const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
        return new Date(date).toLocaleDateString(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    /**
     * Format time according to language
     */
    formatTime: function(timeString, lang) {
        const [hour, minute] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hour), parseInt(minute));
        
        if (lang === 'tr') {
            return date.toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }
    },
    
    /**
     * Debounce function for performance
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

/**
 * Global instances
 */
window.languageManager = new LanguageManager();
window.menuManager = new MenuManager(window.languageManager);
window.AppUtils = AppUtils;

/**
 * Expose functions globally for backward compatibility
 */
window.setLanguage = function(lang) {
    window.languageManager.setLanguage(lang);
};

window.getCurrentLanguage = function() {
    return window.languageManager.getCurrentLanguage();
};

/**
 * Export for module systems (if needed)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageManager,
        MenuManager,
        AppUtils
    };
}