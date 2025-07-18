import { useEffect, useState } from 'react';
import './Home.css';
import AddCarForm from './AddCarForm';
import { useNavigate } from "react-router-dom";


  const API_URL = 'https://6870c09f7ca4d06b34b7ceab.mockapi.io/api/v1/cars'

  export default function Home() {

    const navigate = useNavigate();

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

  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");
  const [formEditing, setFormEditing] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [editOkno, setEditOkno] = useState(false)

 

  const startEdit = (car) => {
    setEditingId(car.id);   
    setFormEditing(car);           
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormEditing(prev => ({ ...prev, [name]: value }));
};

  useEffect(()=> {
    fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error('Error')
        return res.json()
    })
    .then((data) => {
      const sorted = data.sort((a, b) => b.id - a.id); 
      setCars(sorted);
      setCars(data)
      setLoading(false)
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  },[])

  if (loading) return <p>Завантаження...</p>
  if (error) return <p>Помилка: {error}</p>

  const handleCarAdded = (newCar) => {
    setCars(prev => [newCar, ...prev]);
  };

  const handleUpdate = (e) => {
  e.preventDefault();

  fetch(`${API_URL}/${editingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formEditing),
  })
  
    .then(res => res.json())
    .then((updatedCar) => {
      setCars(prev =>
        prev.map(car => (car.id === editingId ? updatedCar : car))
      );
      setEditOkno(false)
      setEditingId(null); 
      setFormEditing(initialForm);
    })
    .catch(console.error);
};


  function deleteItem (id) {
    fetch(`${API_URL}/${id}`, {
      method:'DELETE',
    })
    .then((res)=> {
      if (!res.ok) throw new Error('Failed to delete');
      setCars(prevCars => prevCars.filter(car => car.id !== id));
    })
    .catch((err) => {
      console.error('Ошибка при удалении:', err);
    })
  }

  const splivOkno = (editOkno) => {
    setEditOkno (prev => !prev)
  }

  return (
    <div className="App">
      <div className='container'>
        
        {editOkno ? (
        editingId && (
          <div className='fon'>
            <div className='modal-okno'>
              <form onSubmit={handleUpdate}>
                <input name="brand" value={formEditing.brand} onChange={handleChange} placeholder="Brand" />
                <input name="model" value={formEditing.model} onChange={handleChange} placeholder="Model" />
                <input name="year" value={formEditing.year} onChange={handleChange} placeholder="Year" />
                <input name="price" value={formEditing.price} onChange={handleChange} placeholder="Price" />
                <input name="engineType" value={formEditing.engineType} onChange={handleChange} placeholder="Engine" />
                <input name="mileage" value={formEditing.mileage} onChange={handleChange} placeholder="Mileage" />
                <input name="photoUrl" value={formEditing.photoUrl} onChange={handleChange} placeholder="Photo URL" />
                <textarea id="textarea" name="description" value={formEditing.description} onChange={handleChange} placeholder="Description" />
                
                <button type="submit" className='btn'>Сохранить</button>
              </form>
            </div>
          </div>
        )
        ) : (
          <AddCarForm onCarAdded={handleCarAdded}/>
        )}
        
        {cars.length === 0 && <p>Автомобілів не знайдено</p>}
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              
                <div className='kartochki' onClick={() => navigate(`/car/${car.id}`)}>
                  <div>
                    <img src={car.photoUrl} alt={`${car.brand} ${car.model}`} width={290} height={190}/>
                  </div>
                  <div>
                    <div className='kartochki_opis'>
                      <div id='button_delete'>
                        <p className='model'>{car.brand} {car.model} ({car.year})</p>
                        
                        <div className='btn_car' onClick={e => e.stopPropagation()}>
                          <button onClick={(e) => {e.preventDefault(); startEdit(car); splivOkno()}}>Редактировать</button>
                          <button onClick={(e) => {e.preventDefault(); deleteItem(car.id)}}>Удалить</button>
                        </div>
                      </div>
                      <p id='price'>${car.price}</p>
                    </div>

                    <hr/>

                    <div className='kartochki_opis'>
                      <p>Двигун: {car.engineType}</p>
                      <p>Пробіг: {car.mileage} км</p>
                    </div>
                  </div>
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  }