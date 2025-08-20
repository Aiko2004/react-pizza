import {useEffect, useState} from "react";

import Categories from "../components/Categories/index.jsx";
import Sort from "../components/Sort/index.jsx";
import Skeleton from "../components/Pizza/Skeleton.jsx";
import Pizza from "../components/Pizza/index.jsx";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [pizzas, setPizzas] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [categoryName, setCategoryName] = useState("Все")
    // Достаём объект сортировки из sessionStorage или дефолтное значение (null)
    const [sortType, setSortType] = useState(() => {
        const saved = sessionStorage.getItem("sortType");
        return saved ? JSON.parse(saved) : null;
    });
    console.log(sortType)

    useEffect(() => {
        setIsLoading(true)

        const categoryQuery = categoryId > 0 ? `?category=${categoryId}` : ""
        const query = 'https://6897aa6b250b078c20428172.mockapi.io/api/v1/pizzas' + categoryQuery
        const url = new URL(query)
        url.searchParams.append('sortBy', sortType.sort)
        url.searchParams.append('order', sortType.order)

        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            });
    }, [categoryId, sortType]);

    return (
        <>
            <div className="content__top">
                <Categories category={categoryId} onClickCategory={(id) => setCategoryId(id)} onCategoryChange={(name) => setCategoryName(name)} />
                <Sort sortType={sortType} onClickSort={setSortType}/>
            </div>
            <h2 className="content__title">{categoryName} пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) // 6 скелетонов
                        : pizzas?.map(({id, title, price, imageUrl, sizes, types}) => (
                            <Pizza
                                key={id}
                                title={title}
                                price={price}
                                image={imageUrl}
                                sizes={sizes}
                                types={types}
                            />
                        ))
                }
            </div>
        </>
    );
}

export default Home;