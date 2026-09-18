import Unit from '../Unit/Unit'
import './Column.css'
import { useState, useMemo } from 'react'

const ITEM_HEIGHT = 24
const COLLAPSED_COUNT = 3
const MAX_VISIBLE_COUNT = 6

function Column({
    title,
    status,
    data,
    SERVER_URL,
    deleteHistory,
    setData,
    deleteUnit,
    selectUnit,
}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [renderAll, setRenderAll] = useState(false)

    const items = useMemo(
        () => data.filter(element => element.status === status),
        [data, status]
    )

    const total = items.length
    const showToggleButton = total > COLLAPSED_COUNT
    const needScroll = isExpanded && total > MAX_VISIBLE_COUNT

    const collapsedHeight = COLLAPSED_COUNT * ITEM_HEIGHT
    const expandedHeight = Math.min(total, MAX_VISIBLE_COUNT) * ITEM_HEIGHT
    const maxHeight = isExpanded ? expandedHeight : collapsedHeight

    const visibleItems = renderAll ? items : items.slice(0, COLLAPSED_COUNT)

    const handleToggle = () => {
        if (isExpanded) {
            setIsExpanded(false)
        } else {
            setRenderAll(true)
            setIsExpanded(true)
        }
    }

    const handleTransitionEnd = (e) => {
        if (e.propertyName === 'max-height' && !isExpanded) {
            setRenderAll(false)
        }
    }

    return (
        <div className={`columns`}>
            <h3>{title}</h3>

            <div
                className={`columns-container ${needScroll ? 'scrollable' : ''}`}
                style={{ maxHeight: `${maxHeight}px` }}
                onTransitionEnd={handleTransitionEnd}
            >
                {visibleItems.map(element => (
                    <Unit
                        key={element.id}
                        SERVER_URL={SERVER_URL}
                        deleteHistory={deleteHistory}
                        setData={setData}
                        deleteUnit={deleteUnit}
                        info={element}
                        selectUnit={selectUnit}
                        id={element.id}
                        name={element.name}
                        isSelected={element.isSelected}
                        popUpIsNeeded={true}
                    />
                ))}
            </div>

            {showToggleButton && (
                <button
                    style={{ width: '100%', height: 'auto', opacity: '0.6' }}
                    onClick={handleToggle}
                >
                    {isExpanded ? 'Свернуть' : 'Раскрыть'}
                </button>
            )}
        </div>
    )
}

export default Column