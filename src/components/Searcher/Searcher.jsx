import { useState, useMemo } from 'react'
import './Searcher.css'
import SearcherUnit from './SearcherUnit';

function Searcher({data}) {
    const [searchTerm, setSearchTerm] = useState('');

    // Функция фильтрации данных
    const filterData = (data, searchTerm) => {
        const trimmed = searchTerm.trim();
        if (!trimmed) return data; // если поле пустое – возвращаем все данные
    
        const term = trimmed.toLowerCase();
    
        return data.filter((item) => {
        // Собираем все значения объекта в одну строку, исключая isSelected
        const searchable = Object.keys(item)
            .filter((key) => key !== 'isSelected')
            .map((key) => item[key])
            .filter((val) => val !== null && val !== undefined) // пропускаем null/undefined
            .map((val) => {
            if (Array.isArray(val)) {
                // если массив (history) – объединяем элементы через пробел
                return val.join(' ');
            }
            return String(val);
            })
            .join(' ')
            .toLowerCase();
    
        return searchable.includes(term);
        });
    };

    const results = useMemo(() => filterData(data, searchTerm), [data, searchTerm]);

    return (
<div className={'searcher'}style={{ padding: '20px' }}>
      <h2 style={{marginTop:0}}>Поиск</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Введите текст для поиска..."
        style={{ width: '300px', padding: '8px', fontSize: '16px', textAlign: 'center', backgroundColor:'#f9f9f9', border: '1px solid #ddd', borderRadius: '6px'}}
      />
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', marginTop: '20px' }}>
        {results.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          results.map((item) => (
            <SearcherUnit key={item.id} item={item}/>
          ))
        )}
      </div>
    </div>
    )
}

export default Searcher