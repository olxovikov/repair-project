import { useState } from "react"

function SearcherUnit ({item}) {
    const [historyIsOpen, setHistoryIsOpen] = useState(false)

    function getNameCyril(key) {
      if (key === 'name') {return 'Наименование'}
      if (key === 'inv') {return 'Инвентарный номер'}
      if (key === 'defect') {return 'Неисправность'}
      if (key === 'date1') {return 'Дата передачи на ремонт'}
      if (key === 'date2') {return 'Дата получения с ремонта'}
      if (key === 'comment') {return 'Комментарий'}
      if (key === 'status') {return 'Статус'}
      if (key === 'place') {return 'Местоположение'}
      if (key ==='history') {return 'История'}
      else {return key}
    }

    return (
        <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '12px',
                background: '#f9f9f9',
                textAlign: 'start',
                width: '70%',
              }}
            >
              {/* Выводим все поля объекта, кроме isSelected */}
              {Object.entries(item)
                .filter(([key]) => (key !== 'isSelected' && key !== 'id'))
                .map(([key, value]) => (
                  (key==='history' && Array.isArray(value) && value.length) 
                  ? 
                  <div key={key}>
                    
                  <div  style={{display:'grid', gridTemplateColumns: 'repeat(2,1fr)'}}>
                    <strong style={{textAlign:'end', marginRight:'5px'}}>{'История: '}</strong>
                    <a style={{cursor: 'pointer'}} onClick={()=>setHistoryIsOpen(!historyIsOpen)}>{historyIsOpen ? 'Скрыть историю' : 'Показать историю'}</a>
                  </div>
                  {historyIsOpen ? value.map((element, index)=>{
                    return (
                    <div style={{textAlign:'center'}} key={index}>
                        <hr />
                        <label  style={{whiteSpace: 'pre-line'}}>{element}</label>
                        {(index+1 === value.length) ? <hr style={{width:'100%'}}/> : null } 
                    </div>
                    )
                  }) : null}
                  </div>
                  :
                  <div key={key} style={{display:'grid', gridTemplateColumns: 'repeat(2,1fr)'}}>
                    <strong style={{textAlign:'end', marginRight:'5px'}}>
                      {getNameCyril(key)}:
                    </strong>{' '}
                    <label style={{whiteSpace: 'pre-line'}}>
                        {value !== null && value !== undefined && value.length
                        ? String(value)
                        : '—'}
                    </label>
                  </div>
                ))}
            </div>
    )
}

export default SearcherUnit
