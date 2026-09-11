import './Finder.css'
import Unit from '../Unit/Unit'
import { useState, useMemo } from 'react'

function Finder({data, setData, deleteHistory, SERVER_URL}) {
    const [finderInput, setFinderInput] = useState('')

    const filteredData = useMemo(()=>{
        const query = finderInput.trim().toLocaleLowerCase()

        if (!query) return data

        const tokens = query.split(/\s+/).filter(Boolean)

        return data.filter(element=>{
            const haystack = [
                element.id,
                element.name,
                element.inv,
                element.defect,
                element.date1,
                element.date2,
                element.comment,
                element.status,
                element.place,
                ...(Array.isArray(element.history) ? element.history : []),
            ]
                .map(value => String(value ?? '').toLowerCase())
                .join(' ')
            
            return tokens.every(token => haystack.includes(token))
        })
    }, [data, finderInput])

    return (
        <div className='finder'>
            <h2 style={{marginTop:0}}>Поиск</h2>
            <input
                type="text"
                value={finderInput}
                onChange={(e) => setFinderInput(e.target.value)}
                placeholder="Введите текст для поиска..."
                style={{ width: '300px', padding: '8px', fontSize: '16px', textAlign: 'center', backgroundColor:'#f9f9f9', border: '1px solid #ddd', borderRadius: '6px'}}
            />
            <div style={{display:'flex', flexDirection: 'column', alignItems:'center', marginTop: '20px' }}>

            {filteredData.map(element => {
                return (
                    <Unit key={element.id} info={element} deleteHistory={deleteHistory} SERVER_URL={SERVER_URL} setData={setData} popUpIsNeeded={false}/>
                )
            })}

            {finderInput.trim() && filteredData.length === 0 && (
                <p>Ничего не найдено</p>
            )}
            </div>
        </div>
    )
}

export default Finder