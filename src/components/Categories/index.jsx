import { useEffect, useState } from "react";
import classnames from "classnames";

const Categories = ({ category, onClickCategory, onCategoryChange }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const [activeIndex, setActiveIndex] = useState(() => {
    // При первом рендере читаем сохранённый индекс
    const savedIndex = sessionStorage.getItem("categoryIndex");
    return savedIndex !== null ? Number(savedIndex) : 0;
  });

  useEffect(() => {
    onClickCategory(activeIndex);
    onCategoryChange(categories[activeIndex]);
    sessionStorage.setItem("categoryIndex", activeIndex);
  }, [activeIndex, onClickCategory]);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={classnames({ active: category === index }) || undefined}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
