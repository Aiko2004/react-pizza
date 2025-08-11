import {useEffect, useState} from "react";

import Categories from "../components/Categories/index.jsx";
import Sort from "../components/Sort/index.jsx";
import Skeleton from "../components/Pizza/Skeleton.jsx";
import Pizza from "../components/Pizza/index.jsx";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pizzas, setPizzas] = useState([])


    useEffect(() => {
        fetch('https://6897aa6b250b078c20428172.mockapi.io/api/v1/pizzas')
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
                console.log(data);
                setIsLoading(false);
            });
    }, []);
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) // 6 скелетонов
                        : pizzas.map(({id, name, price, imageUrl, sizes, types}) => (
                            <Pizza
                                key={id}
                                name={name}
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