import { useState, useEffect, useRef } from "react";
import classnames from "classnames";

const Sort = ({ sortType, onClickSort }) => {
  const sortingTypes = [
    { name: "популярности", sort: "rating", order: "desc" },
    { name: "цене", sort: "price", order: "desc" },
    { name: "алфавиту", sort: "title", order: "asc" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef();

  // Если sortType пустой (при первом рендере), ставим дефолт
  useEffect(() => {
    if (!sortType) {
      onClickSort(sortingTypes[0]);
    }
  }, [sortType]);

  useEffect(() => {
    if (sortType) {
      sessionStorage.setItem("sortType", JSON.stringify(sortType));
    }
  }, [sortType]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={!isOpen ? { transform: "rotate(-180deg)" } : {}}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>
          {sortType?.name || "популярности"}
        </span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortingTypes.map((item, i) => (
              <li
                key={i}
                className={classnames({ active: sortType?.name === item.name })}
                onClick={() => {
                  onClickSort(item);
                  setIsOpen(false);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
