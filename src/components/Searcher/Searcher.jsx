import { useState, useMemo } from 'react'
import './Searcher.css'

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
<div style={{ padding: '20px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Введите текст для поиска..."
        style={{ width: '300px', padding: '8px', fontSize: '16px' }}
      />
      <div style={{ marginTop: '20px' }}>
        {results.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          results.map((item) => (
            <div
              key={item.id}
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
                  <div key={key}>
                    <strong>{key}:</strong>{' '}
                    <label style={{whiteSpace: 'pre-line'}}>
                        {Array.isArray(value)
                        ? value.join(`,\n\n`) // для history выводим массив как строку
                        : value !== null && value !== undefined
                        ? String(value)
                        : '—'}
                    </label>
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
    )
}

export default Searcher