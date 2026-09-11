import Unit from '../Unit/Unit'
import './Column.css'
import { useState, useMemo, } from 'react';

function Column({title, status, data, SERVER_URL, deleteHistory, setData, deleteUnit, selectUnit}) {
    const [isExpanded, setIsExpanded] = useState(false)

    const items = useMemo(
        ()=> data.filter(element => element.status === status),
        [data, status]
    )
    /// Для плавности попробовать вариант №2 из дипсика (чистый react + css)
    const total = items.length
    const showToggleButton = total > 3;
    const needScroll = isExpanded && total > 10;

    const visibleItems = isExpanded ? items : items.slice(0, 3)

    return (
        <div className={`columns`}>
            <h3>{title}</h3>
            <div 
                className={`columns-container ${needScroll ? 'scrollable' : ''}`}
            >
                {
                    visibleItems.map(element => (
                        <Unit key={element.id} SERVER_URL={SERVER_URL} deleteHistory={deleteHistory} setData={setData} deleteUnit={deleteUnit} info={element} selectUnit={selectUnit} id={element.id} name={element.name} isSelected={element.isSelected} popUpIsNeeded={true}/>
                    ))
                }
                
            </div>
            {
                showToggleButton && (
                    <button style={{width: '100%', height: 'auto', opacity: '0.6'}} onClick={()=>setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'Свернуть' : 'Раскрыть'}
                    </button>
                )
            }
        </div>
)}

export default Column