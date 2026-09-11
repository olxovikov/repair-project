function UnitContent({ 
    name, setName, 
    defect, setDefect, 
    comment, setComment, 
    place, setPlace, 
    historyIsOpen, setHistoryIsOpen, 
    deleteHistory, close, info,
    handlePlaceChange, handleCommentChange,
    handleDefectChange, handleNameChange
    }) {

    function getStatus(status) {
        if (status === 'waiting') {return 'Нужен ремонт'}
        if (status === 'repair') {return 'В ремонте'}
        if (status === 'complited') {return 'Отработано'}
        else {return}
      }

    return (
        <>
            <h3 style={{textAlign:'center', marginTop: '10px', marginBottom:'10px'}}>Основная информация</h3>
            <div className="popup-line">
                <label>Наименование</label>
                <input
                    placeholder='Укажите наименование...' 
                    type='text' 
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    onBlur={async ()=>handleNameChange(info.id, name)} 
                >
                </input>                            
            </div>
            <div className="popup-line">
                <label>Инвентарный номер</label>
                <label>{info.inv || '—'}</label>
            </div>
            
            <h3 style={{textAlign:'center', marginTop: '10px', marginBottom:'10px'}}>Проблема и даты</h3>
            <div className="popup-line">
                <label>Неисправность</label>
                <input
                    title={defect}
                    placeholder='Укажите неисправность...' 
                    type='text' 
                    value={defect}
                    onChange={(e)=>{setDefect(e.target.value)}}
                    onBlur={async ()=>handleDefectChange(info.id, defect)}
                >
                </input>
            </div>
            <div className="popup-line">
                <label>Дата передачи на ремонт</label>
                <label>{info.date1 || '—'}</label>
            </div>
            <div className="popup-line">
                <label>Дата получения с ремонта</label>
                <label>{info.date2 || '—'}</label>
            </div>
            <h3 style={{textAlign:'center', marginTop: '10px', marginBottom:'10px'}}>Статус и комментарий</h3>
            <div className="popup-line">
                <label>Комментарий</label>
                <input
                    title={comment}
                    placeholder='Добавьте комментарий...' 
                    type='text' 
                    value={comment}
                    onChange={(e)=>{setComment(e.target.value)}}
                    onBlur={async ()=>handleCommentChange(info.id, comment)}
                >
                </input>
            </div>
            <div className="popup-line">
                <label>Статус</label>
                <label>{getStatus(info.status) ?? '—'}</label>
            </div>
            <h3 style={{textAlign:'center', marginTop: '10px', marginBottom:'10px'}}>{info.history.length ? `Локация и история` : `Локация`}</h3>
            <div className='popup-line'>
                <label>Текущее местоположение</label>
                <input
                    placeholder='Укажите место...' 
                    type='text' 
                    value={place}
                    onChange={(e)=>{setPlace(e.target.value)}}
                    onBlur={async ()=>handlePlaceChange(info.id, place)}
                >
                </input>
            </div>
            {info.history.length ?
            <>
            <div className='popup-line'>
                <label>История</label>
                <a style={{cursor: 'pointer'}} onClick={()=>setHistoryIsOpen(!historyIsOpen)}>{historyIsOpen ? 'Скрыть историю' : 'Показать историю'}</a>
            </div>
            {historyIsOpen 
            ? <div style={{textAlign: 'center'}}>
            {info.history.map((element, index) => {
                return <div className='history-line' key={index}>
                    <label style={{display: 'block', whiteSpace: 'pre-line'}}>{element}</label>
                    <button title="Удалить" style={{cursor:'pointer', position: 'absolute', top: '0px', right: '0px', width: '30px', height: '30px', padding: 0}} onClick={()=>deleteHistory(info.id, index)}>
                        <img style={{width: '100%', height:'100%'}}src={close} />
                    </button>
                </div>
            })}
            </div> : null}
                
                </>
                : null}
        </>
    )
}

export default UnitContent