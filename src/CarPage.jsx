import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './CarPage.css'


const API_URL = 'https://6870c09f7ca4d06b34b7ceab.mockapi.io/api/v1/cars'


export default function CarPage() {

    const {id} = useParams()
    const [car, setCar] = useState(null)

    useEffect(() => {
        fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => setCar(data))
        .catch(console.error);
    },[id])

    if (!car) return <p>Завантаження...</p>;

  return (
    <div className="CarPage">
        <div className="container1">
            <div id="photo">
                <img src={car.photoUrl} alt={`${car.brand} ${car.model}`} width="700" />
            </div>
            <div className="kartochki1">
                <div>
                    <div className="opis">
                        <h1 id="model_page">{car.brand} / {car.model}</h1>
                        <p id="price_page">${car.price}</p>
                    </div>
                </div>

                <div id="Page">
                    <hr/>
                </div>

                <div>
                    <div className="opis2">
                        <p>Рік: {car.year}</p>
                        <p>Тип двигуна: {car.engineType}</p>
                        <p>Пробіг: {car.mileage} км</p>
                    </div>
                </div>
            </div>

            <div id="description"><p>{car.description}</p></div>

        </div>
    </div>
  )
}


