class PatentDataService {
    constructor() {
        this.countries = [
            { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
            { code: 'CN', name: 'China', flag: '🇨🇳' },
            { code: 'JP', name: 'Japón', flag: '🇯🇵' },
            { code: 'DE', name: 'Alemania', flag: '🇩🇪' },
            { code: 'KR', name: 'Corea del Sur', flag: '🇰🇷' },
            { code: 'GB', name: 'Reino Unido', flag: '🇬🇧' }
        ];
    }

    /**
     * Genera datos aleatorios de patentes para los 6 países
     * @returns {Array} Array de objetos con datos de patentes por país
     */
    generatePatentData() {
        const timestamp = new Date().toISOString();

        return this.countries.map(country => {
            // Generar número aleatorio entre 100 y 300
            const patents = Math.floor(Math.random() * (300 - 100 + 1)) + 100;

            // Agregar un poco de variabilidad basada en tendencias por país
            const countryMultiplier = this.getCountryMultiplier(country.code);
            const adjustedPatents = Math.floor(patents * countryMultiplier);

            // Asegurar que sigue en el rango 100-300
            const finalPatents = Math.max(100, Math.min(300, adjustedPatents));

            return {
                country: country.code,
                countryName: country.name,
                flag: country.flag,
                patents: finalPatents,
                timestamp: timestamp,
                trend: this.calculateTrend(),
                category: this.getRandomCategory()
            };
        }).sort((a, b) => b.patents - a.patents); // Ordenar por número de patentes descendente
    }

    /**
     * Obtiene un multiplicador basado en el país para simular tendencias reales
     * @param {string} countryCode - Código del país
     * @returns {number} Multiplicador para ajustar los datos
     */
    getCountryMultiplier(countryCode) {
        const multipliers = {
            'US': 1.2,  // Estados Unidos tiende a tener más patentes
            'CN': 1.15, // China también es muy activa
            'JP': 1.1,  // Japón tiene alta innovación
            'DE': 1.05, // Alemania es innovadora
            'KR': 1.0,  // Corea del Sur base
            'GB': 0.95  // Reino Unido ligeramente menor
        };

        return multipliers[countryCode] || 1.0;
    }

    /**
     * Calcula una tendencia aleatoria para el país
     * @returns {string} Tendencia: 'up', 'down', 'stable'
     */
    calculateTrend() {
        const trends = ['up', 'down', 'stable'];
        const weights = [0.4, 0.3, 0.3]; // 40% up, 30% down, 30% stable

        const random = Math.random();
        let cumulative = 0;

        for (let i = 0; i < weights.length; i++) {
            cumulative += weights[i];
            if (random < cumulative) {
                return trends[i];
            }
        }

        return 'stable';
    }

    /**
     * Obtiene una categoría aleatoria de patente
     * @returns {string} Categoría de la patente
     */
    getRandomCategory() {
        const categories = [
            'Tecnología',
            'Medicina',
            'Energía',
            'Biotecnología',
            'Inteligencia Artificial',
            'Nanotecnología'
        ];

        return categories[Math.floor(Math.random() * categories.length)];
    }

    /**
     * Genera estadísticas adicionales del sistema
     * @returns {Object} Objeto con estadísticas globales
     */
    generateGlobalStats() {
        const data = this.generatePatentData();
        const totalPatents = data.reduce((sum, country) => sum + country.patents, 0);
        const averagePatents = Math.round(totalPatents / data.length);
        const topCountry = data[0]; // Ya está ordenado por patentes descendente

        return {
            totalPatents,
            averagePatents,
            topCountry: {
                country: topCountry.country,
                countryName: topCountry.countryName,
                flag: topCountry.flag,
                patents: topCountry.patents
            },
            updateTime: new Date().toISOString(),
            activeCountries: this.countries.length
        };
    }
}

module.exports = PatentDataService;
