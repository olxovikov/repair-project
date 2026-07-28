import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form/Form'
import List from './components/List/List'
import Searcher from './components/Searcher/Searcher'

function App() {
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const loadData = async () => {
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:4000/data')
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
  }, [])

  // function selectUnit(id) {

  //   let result = data.map((element)=>{
  //     if (element.id === id && element.isSelected === false) {return {...element, isSelected: true}}
  //     else if (element.id === id && element.isSelected === true) {return {...element, isSelected: false}}
  //     else {return {...element}}
  //   })

  //   setData(result)
  // }

  async function selectUnit(id) {
    // Находим текущий элемент, чтобы узнать новое значение isSelected
    const currentItem = data.find(el => el.id === id);
    if (!currentItem) return;
  
    const newSelectedState = !currentItem.isSelected;
  
    try {
      // Отправляем PATCH на сервер
      const response = await axios.patch(`http://localhost:4000/data/${id}`, {
        isSelected: newSelectedState
      });
      
      // Обновляем состояние из ответа сервера (весь массив)
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при обновлении isSelected', error);
      // Можно показать уведомление пользователю
    }
  }

  // function changeStatus(status) {
  //   let result = data.map((element)=>{
  //     if (element.isSelected === true && element.status === 'waiting' && status === 'waiting') {return {...element, status: 'repair', isSelected: false, place: 'В ремонте'}}
  //     else if (element.isSelected === true && element.status === 'repair' && status === 'repair') {return {...element, status: 'complited', isSelected: false, place: ''}}
  //     else if (element.isSelected === true && element.status === 'complited' && status === 'back') {return {...element, status: 'repair', isSelected: false, place: 'В ремонте'}}
  //     else if (element.isSelected === true && element.status === 'repair' && status === 'back') {return {...element, status: 'waiting', isSelected: false, place: ''}}
  //     else {return {...element}}
  //   })

  //   setData(result)
  // }

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
      const response = await axios.patch('http://localhost:4000/data/bulk', updates);
      // Если сервер вернул обновлённый массив, можно синхронизироваться с ним
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при массовом обновлении статусов', error);
    }
  }

  async function deleteUnit(id) {
    try {
      const response = await axios.delete('http://localhost:4000/data', {
        data: { ids: [id] }
      })
      setData(response.data)
    } catch (error) {
      console.log('Ошибка при удалении:', error)
    }
    
  }

  async function deleteSelected() {
    const selectedIds = data.filter(item=>item.isSelected).map(item=>item.id)

    try {
      const response = await axios.delete('http://localhost:4000/data', {
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
      <Form data={data} setData={setData}/>
      {(data.length !== 0) ? (
      <>
        <hr />
        <List deleteSelected={deleteSelected} deleteUnit={deleteUnit} changeStatus={changeStatus} data={data} setData={setData} selectUnit={selectUnit} />
        <hr />
        <Searcher data={data}/>
      </>
      ) : (null)}
    </div>
  )
}

export default App
