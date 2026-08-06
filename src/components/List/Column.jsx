import Unit from './Unit'
import './Column.css'
import { useState, useMemo, useRef, useEffect } from 'react';

function Column({title, status, data, SERVER_URL, deleteHistory, setData, deleteUnit, selectUnit}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [maxHeight, setMaxHeight] = useState('0px')
    const contentRef = useRef(null)

    const items = useMemo(
        ()=> data.filter(element => element.status === status),
        [data]
    )

    const total = items.length
    const showToggleButton = total > 3;
    const needScroll = isExpanded && total > 10;

    // Функция для пересчёта высоты
    const updateHeight = () => {
        if (!contentRef.current) return;
        const children = contentRef.current.children;
        if (children.length === 0) {
        setMaxHeight('0px');
        return;
        }

        if (isExpanded) {
        // Развёрнуто – высота всего содержимого
        const fullHeight = contentRef.current.scrollHeight;
        if (needScroll) {
            // Если нужно показывать скролл, ограничиваем высотой первых 10 элементов
            let heightFor10 = 0;
            for (let i = 0; i < Math.min(10, children.length); i++) {
            heightFor10 += children[i].offsetHeight;
            }
            setMaxHeight(`${heightFor10}px`);
        } else {
            setMaxHeight(`${fullHeight}px`);
        }
        } else {
        // Свёрнуто – высота первых 3 элементов
        let heightFor3 = 0;
        for (let i = 0; i < Math.min(3, children.length); i++) {
            heightFor3 += children[i].offsetHeight;
        }
        setMaxHeight(`${heightFor3}px`);
        }
    };

    // Пересчитываем высоту при изменении данных или состояния развёрнутости
    useEffect(() => {
        updateHeight();
    }, [isExpanded, items, needScroll]);

    // Также пересчитываем при ресайзе, если нужно (опционально)
    useEffect(() => {
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);    

    const visibleItems = isExpanded ? items : items.slice(0, 3)
    const toggleExpanded = () => setIsExpanded(prev => !prev)

    return (
        <div className={`columns`}>
            <h3>{title}</h3>
            <div 
                className={`columns-container ${needScroll ? 'scrollable' : ''}`}
                style={{
                    maxHeight: maxHeight,
                    transition: 'max-height 0.4s ease-in-out'
                }}
            >
                <div ref={contentRef}>
                    {
                        visibleItems.map(element => (
                            <Unit SERVER_URL={SERVER_URL} deleteHistory={deleteHistory} setData={setData} deleteUnit={deleteUnit} info={element} selectUnit={selectUnit} id={element.id} name={element.name} key={element.id} isSelected={element.isSelected}/>
                        ))
                    }
                </div>
            </div>
            {
                showToggleButton && (
                    <button style={{width: '100%', height: 'auto', opacity: '0.6'}} onClick={toggleExpanded}>
                        {isExpanded ? 'Свернуть' : 'Раскрыть'}
                    </button>
                )
            }
        </div>
)}

export default Column