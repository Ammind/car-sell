import { useState } from "react";
import './AddCarForm.css'

const initialForm = {
  brand: "",
  model: "",
  year: "",
  price: "",
  engineType: "",
  mileage: "",
  photoUrl: "",
  description: "",
};

const API_URL = "https://6870c09f7ca4d06b34b7ceab.mockapi.io/api/v1/cars";

export default function AddCarForm({ onCarAdded }) {
    const [form, setForm] = useState(initialForm)
    const [addOkno, setAddOkno] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit  = (e) => {
        e.preventDefault()

        fetch(API_URL,{
            method:'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form),
        })
            .then(res=> res.json())
            .then((newCar) => {
                onCarAdded(newCar)
                setForm(initialForm)
                setAddOkno(false)
            })
            .catch(console.error)
    }

    const splivPolya = (addOkno) => {
        setAddOkno(prev => !prev)
    }

    return(
        <div>
            {addOkno ? (
            <div className="modal_fon">
                <div className="modal">
                    <form onSubmit={handleSubmit}>
                        <input name="brand" placeholder="Бренд" value={form.brand} onChange={handleChange} />
                        <input name="model" placeholder="Модель" value={form.model} onChange={handleChange} />
                        <input name="year" placeholder="Рік" type="number" value={form.year} onChange={handleChange} />
                        <input name="price" placeholder="Ціна" type="number" value={form.price} onChange={handleChange} />
                        <input name="engineType" placeholder="Тип двигуна" value={form.engineType} onChange={handleChange} />
                        <input name="mileage" placeholder="Пробіг" type="number" value={form.mileage} onChange={handleChange} />
                        <input name="photoUrl" placeholder="URL фото" value={form.photoUrl} onChange={handleChange} />
                        <textarea name="description" placeholder="Опис" value={form.description} onChange={handleChange} />
                        
                        <button type="submit" className="btn">Додати</button>
                    </form>
                    <>
                    <button onClick={()=> splivPolya()} className="btn">Назад</button>
                    </>
                </div>
            </div>
            ):(
                <div style={{ textAlign: 'right' }}>
                <button onClick={()=> splivPolya()} id="addAuto">Додати авто</button>
                </div>
            )}
        </div>
    )
}