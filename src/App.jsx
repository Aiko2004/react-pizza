import {useEffect, useState} from 'react'

import './scss/app.scss'
import Header from "./components/Header";
import Categories from "./components/Categories"
import Sort from "./components/Sort";
import Pizza from "./components/Pizza/index.jsx";
import Skeleton from "./components/Pizza/Skeleton.jsx";

function App() {
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
      <div className="wrapper">
          <Header/>
          <div className="content">
              <div className="container">
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

              </div>
          </div>
      </div>
  )
}

export default App
