import { useState } from 'react';
import './Gallery.css';
import realism1 from '../../assets/images/real.png';
import realism2 from '../../assets/images/real2.png';
import mini from '../../assets/images/mini2.png';
import mini2 from '../../assets/images/mini.png';
import trad from '../../assets/images/trad.png';
import trad2 from '../../assets/images/trad2.png';
import akva from '../../assets/images/akva.png';
import akva2 from '../../assets/images/akva2.png';

const Gallery = () => {
    const works = [
        { id: 1, category: 'Реализм', master: 'Алексей', image: realism1, alt: "Реалистичная татуировка" },
        { id: 2, category: 'Минимализм', master: 'Мария', image: mini, alt: "Минималистичная татуировка" },
        { id: 3, category: 'Традишнл', master: 'Дмитрий', image: trad, alt: "Традиционная татуировка" },
        { id: 4, category: 'Акварель', master: 'Ольга', image: akva, alt: "Акварельная татуировка" },
        { id: 5, category: 'Реализм', master: 'Алексей', image: realism2, alt: "Реалистичная татуировка" },
        { id: 6, category: 'Минимализм', master: 'Мария', image: mini2, alt: "Минималистичная татуировка" },
        { id: 7, category: 'Традишнл', master: 'Дмитрий', image: trad2, alt: "Традиционная татуировка" },
        { id: 8, category: 'Акварель', master: 'Ольга', image: akva2, alt: "Акварельная татуировка" },
    ];

    const [activeFilter, setActiveFilter] = useState('Все работы');

    const filteredWorks = activeFilter === 'Все работы'
        ? works
        : works.filter(work => work.category === activeFilter);

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const categories = ['Все работы', 'Реализм', 'Минимализм', 'Традишнл', 'Акварель'];

    return (
        <div className="gallery">
            <h1>Галерея работ</h1>

            <div className="gallery-filters">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                        onClick={() => handleFilterClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className={`gallery-grid ${activeFilter !== 'Все работы' ? 'filtered' : ''}`}>
                {filteredWorks.map(work => (
                    <div key={work.id} className="gallery-item">
                        <div className="image-container">
                            <img
                                src={work.image}
                                alt={work.alt}
                                className="tattoo-image"
                            />
                        </div>
                        <div className="work-info">
                            <span className="work-category">{work.category}</span>
                            <span className="work-master">{work.master}</span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredWorks.length === 0 && (
                <div className="no-works-message">
                    <p>Нет работ в выбранной категории</p>
                </div>
            )}
        </div>
    );
};

export default Gallery;