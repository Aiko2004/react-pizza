import {useEffect, useState} from 'react';
import classnames from 'classnames'

const Categories = () => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const [activeIndex, setActiveIndex] = useState(() => {
        // При первом рендере читаем сохранённый индекс
        const savedIndex = sessionStorage.getItem('categoryIndex');
        return savedIndex !== null ? Number(savedIndex) : 0;
    })

    useEffect(() => {
        sessionStorage.setItem('categoryIndex', activeIndex);
    }, [activeIndex])


    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) =>
                        <li
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={classnames({'active': activeIndex === index}) || undefined}
                        >
                            {category}
                        </li>
                    )}
            </ul>
        </div>
    );
}

export default Categories;