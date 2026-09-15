import './Finder.css'
import Unit from '../Unit/Unit'
import { useState, useMemo } from 'react'
import Pagination from '../Pagination/Pagination';

function Finder({data, setData, deleteHistory, SERVER_URL}) {
    const [finderInput, setFinderInput] = useState('')
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

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

    let totalPage = Math.ceil(filteredData.length/limit)

    const getVisibleItems = (page, limit) => {
        let array = []
        for (let i = (page-1)*limit; i < (page*limit) && filteredData[i]; i++) {
            array.push(filteredData[i])
        }
        return array;
    }

    const handlePageChange = (value) => {
        if (value === "&laquo;") {
            setPage(1);
        } else if (value === "&lsaquo;") {
            if (page !== 1) {
                setPage(page - 1)
            }
        } else if (value === "&rsaquo;") {
            if (page !== totalPage) {
                setPage(page + 1)
            }
        } else if (value === "&raquo;") {
            setPage(totalPage)
        } else {
            if (value !== " ..." && value !== "... ") {
                setPage(value)
            }
        }
    }

    return (
        <div className='finder'>
            <h2 style={{marginTop:0}}>Поиск</h2>
            <input
                type="text"
                value={finderInput}
                onChange={(e) => {
                    setFinderInput(e.target.value)
                    if (page !== 1) {
                        setPage(1)
                    }
                }}
                placeholder="Введите текст для поиска..."
                style={{ width: '300px', padding: '8px', fontSize: '16px', textAlign: 'center', backgroundColor:'#f9f9f9', border: '1px solid #ddd', borderRadius: '6px'}}
            />
            <div style={{display:'flex', flexDirection: 'column', alignItems:'center', marginTop: '20px' }}>
            
            {filteredData.length ? 
                <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} handlePageChange={handlePageChange}/>
            : null}

            {getVisibleItems(page, limit).map(element => {
                                return (
                                    <Unit key={element.id} info={element} deleteHistory={deleteHistory} SERVER_URL={SERVER_URL} setData={setData} popUpIsNeeded={false}/>
                                )
                            })}

            {(getVisibleItems(page, limit).length > 1) ? 
                <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} handlePageChange={handlePageChange}/>
            : null}

            {finderInput.trim() && filteredData.length === 0 && (
                <p>Ничего не найдено</p>
            )}
            </div>
        </div>
    )
}

export default Finder