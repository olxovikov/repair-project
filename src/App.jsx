import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form/Form'
import List from './components/List/List'
import io from 'socket.io-client'
import Finder from './components/Finder/Finder'

function App() {
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const SERVER_URL = `http://${window.location.hostname}:4000`

  useEffect(()=>{
    // 1. Первоначальная загрузка данных (через GET)
    const loadData = async () => {
      try {
        setLoading(true)
        // const res = await axios.get('http://localhost:4000/data')
        const res = await axios.get(`${SERVER_URL}/data`)
        if (res.data) {
          setData(res.data)
        } 
      } catch (error) {
        setError('Error fetching data')
        console.log('Error fetching data', error)
      } finally {
        setLoading(false)
      }
    }
  
    loadData()

     // 2. Подключение WebSocket и подписка на обновления
    const socket = io(SERVER_URL);
    
    socket.on('dataUpdated', (newData) => {
      setData(newData);        // обновляем состояние
      setLoading(false);       // если были в загрузке
    });

    // 3. Очистка при размонтировании компонента
    return () => {
      socket.disconnect();     // отключаем сокет
    };
    }, [])

  async function selectUnit(id) {
    // Находим текущий элемент, чтобы узнать новое значение isSelected
    const currentItem = data.find(el => el.id === id);
    if (!currentItem) return;
  
    const newSelectedState = !currentItem.isSelected;
  
    try {
      // Отправляем PATCH на сервер
      const response = await axios.patch(`${SERVER_URL}/data/${id}`, {
        isSelected: newSelectedState
      });
      
      // Обновляем состояние из ответа сервера (весь массив)
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при обновлении isSelected', error);
      // Можно показать уведомление пользователю
    }
  }

  async function changeStatus(action) { // action = 'waiting' | 'repair' | 'back'
    // Определяем, какие элементы нужно изменить и какие у них новые поля
    const updates = [];
      data.map(element => {
      if (!element.isSelected) return element; // не выбран – не меняем
  
      let updatedElement = null;
      // Применяем логику переходов
      if (element.status === 'waiting' && action === 'waiting') {
        updatedElement = { ...element, status: 'repair', isSelected: false, place: 'В ремонте' };
      } else if (element.status === 'repair' && action === 'repair') {
        updatedElement = { ...element, status: 'complited', isSelected: false, place: '' };
      } else if (element.status === 'complited' && action === 'back') {
        updatedElement = { ...element, status: 'repair', isSelected: false, place: 'В ремонте' };
      } else if (element.status === 'repair' && action === 'back') {
        updatedElement = { ...element, status: 'waiting', isSelected: false, place: '' };
      } else {
        // Если условие не подошло, не меняем элемент (например, статус не соответствует действию)
        return element;
      }
  
      // Добавляем обновление для этого id
      updates.push({
        id: element.id,
        status: updatedElement.status,
        isSelected: updatedElement.isSelected,
        place: updatedElement.place
      });
  
      return updatedElement;
    });
  
    // Если нет обновлений, выходим
    if (updates.length === 0) {
      console.log('Нет элементов для обновления');
      return;
    }

    // Отправляем массовый запрос на сервер
    try {
      const response = await axios.patch(`${SERVER_URL}/data/bulk`, {
        updates: updates,
        reorder: true
      });
      // Если сервер вернул обновлённый массив, можно синхронизироваться с ним
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при массовом обновлении статусов', error);
    }
  }

  async function deleteUnit(id) {
    try {
      const response = await axios.delete(`${SERVER_URL}/data`, {
        data: { ids: [id] }
      })
      setData(response.data)
    } catch (error) {
      console.log('Ошибка при удалении:', error)
    }
    
  }

  const deleteHistory = async (id, index) => {
    // Находим элемент, чтобы получить текущий массив истории
    const target = data.find(el => el.id === id);
    if (!target) return;
  
    // Формируем новый массив истории без указанного индекса
    const newHistory = target.history.filter((_, idx) => idx !== index);
  
    try {
      // Отправляем PATCH-запрос с обновлённым полем history
      const response = await axios.patch(`${SERVER_URL}/data/bulk`, [
        { id, history: newHistory }
      ]);
      // Обновляем локальное состояние из ответа сервера
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при удалении записи истории:', error);
      alert('Не удалось удалить запись. Попробуйте позже.');
    }
  };

  async function deleteSelected() {
    const selectedIds = data.filter(item=>item.isSelected).map(item=>item.id)

    try {
      const response = await axios.delete(`${SERVER_URL}/data`, {
        data: { ids: selectedIds }
      })
      setData(response.data)
    } catch (error) {
      console.log('Ошибка при удалении:', error)
    }
    
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="app">
      <Form SERVER_URL={SERVER_URL} data={data} setData={setData}/>
      {(data.length !== 0) ? (
      <>
        <List deleteHistory={deleteHistory} SERVER_URL={SERVER_URL} deleteSelected={deleteSelected} deleteUnit={deleteUnit} changeStatus={changeStatus} data={data} setData={setData} selectUnit={selectUnit} />
        <Finder data={data} setData={setData} deleteHistory={deleteHistory} SERVER_URL={SERVER_URL}/>
      </>
      ) : (null)}
    </div>
  )
}

export default App
