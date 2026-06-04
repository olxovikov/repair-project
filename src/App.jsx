import './App.css'
import { useState } from 'react'
import Form from './components/Form/Form'
import List from './components/List/List'

function App() {

  const [data, setData] = useState([])

  function selectUnit(id) {

    let result = data.map((element)=>{
      if (element.id === id && element.isSelected === false) {return {...element, isSelected: true}}
      else if (element.id === id && element.isSelected === true) {return {...element, isSelected: false}}
      else {return {...element}}
    })

    setData(result)
  }

  function changeStatus(status) {
    let result = data.map((element)=>{
      if (element.isSelected === true && element.status === 'waiting' && status === 'waiting') {return {...element, status: 'repair', isSelected: false}}
      else if (element.isSelected === true && element.status === 'repair' && status === 'repair') {return {...element, status: 'complited', isSelected: false}}
      else if (element.isSelected === true && element.status === 'complited' && status === 'back') {return {...element, status: 'repair', isSelected: false}}
      else if (element.isSelected === true && element.status === 'repair' && status === 'back') {return {...element, status: 'waiting', isSelected: false}}
      else {return {...element}}
    })

    setData(result)
  }

  function deleteUnit(id) {
    setData(data.filter((element) => {return (element.id) !== id}))
  }

  function deleteSelected() {
    setData(data.filter((element)=>{return !element.isSelected}))
  }

  return (
    <div className="app">
      <Form data={data} setData={setData}/>
      {(data.length !== 0) ? (
      <List deleteSelected={deleteSelected} deleteUnit={deleteUnit} changeStatus={changeStatus} data={data} setData={setData} selectUnit={selectUnit} />) : (null)}
      
    </div>
  )
}

export default App
