import { useState } from "react"

function SearcherUnit ({item}) {
    const [historyIsOpen, setHistoryIsOpen] = useState(false)

    return (
        <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '12px',
                background: '#f9f9f9',
              }}
            >
              {/* Выводим все поля объекта, кроме isSelected */}
              {Object.entries(item)
                .filter(([key]) => key !== 'isSelected')
                .map(([key, value]) => (
                  (key==='history' && Array.isArray(value) && value.length) 
                  ? 
                  <div key={key}>
                    
                  <div  style={{display:'flex', justifyContent: 'space-between'}}>
                    <strong>{key}:</strong>
                    <a style={{cursor: 'pointer'}} onClick={()=>setHistoryIsOpen(!historyIsOpen)}>{historyIsOpen ? 'Скрыть историю' : 'Показать историю'}</a>
                  </div>
                  {historyIsOpen ? value.map((element, index)=>{
                    return (
                    <div key={index}>
                        <hr />
                        <label  style={{whiteSpace: 'pre-line'}}>{element}</label>
                        {(index+1 === value.length) ? <hr style={{width:'100%'}}/> : null } 
                    </div>
                    )
                  }) : null}
                  </div>
                  :
                  <div key={key} style={{display:'flex', justifyContent: 'space-between'}}>
                    <strong>{key}:</strong>{' '}
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
