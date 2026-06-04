import Unit from './Unit'
import './List.css'
import arrow from '../../img/arrow.svg'
import { useState } from 'react';
import InfoPopUp from '../PopUp/InfoPopUp';

function List(props) {

    function isDisabled(status) {
        let selectedCounter;
        if (status) {
            selectedCounter = props.data.filter((element)=>(element.isSelected && element.status === status)).length
        }
        else {
            selectedCounter = props.data.filter((element)=>element.isSelected).length;
        }

        return (selectedCounter > 0)
    }

    const [popInfoIsOpen1, setPopInfoIsOpen1] = useState(false)
    const [popInfoIsOpen2, setPopInfoIsOpen2] = useState(false)

    const handleDateChange = (id, newDateValue, date) => {
        props.setData(prevData =>
          prevData.map(item =>
            { 
                if (item.id === id && date === 'date1') return { ...item, date1: newDateValue }
                if (item.id === id && date === 'date2') return {...item, date2: newDateValue }
                else return {...item}
            }
          )
        );
      };

    return (
        <>
            <h2>
                Список
            </h2>
            <div className="list">
                <div className='columns'>
                    <h3>Нужен ремонт</h3>
                {
                    props.data.map((element)=>{
                        if (element.status === 'waiting') {
                            return <Unit deleteUnit={props.deleteUnit} info={element} selectUnit={props.selectUnit} id={element.id} name={element.name} key={element.id} isSelected={element.isSelected}/>
                        }
                    })
                }
                </div>
                <div className='columns__buttons'>
                    <button onClick={()=>setPopInfoIsOpen1(true)} disabled={!isDisabled('waiting')}><img src={arrow}></img></button>
                    <InfoPopUp isOpen={popInfoIsOpen1} onClose={()=>{setPopInfoIsOpen1(false)}}>
                        <h3 style={{textAlign:'center', marginTop:'0'}}>Введите дату передачи на ремонт</h3>
                        {props.data.map((element)=>{
                            if (element.isSelected === true && element.status === 'waiting') {
                                return (
                                    <label key={element.id} >Для {element.name} (инвентарный {element.inv}):
                                        <input
                                            type='text' 
                                            placeholder='ДД.ММ.ГГГГ' 
                                            value={element.date1 ?? ''}
                                            onChange={(e)=>handleDateChange(element.id, e.target.value, 'date1')}
                                        />
                                    </label>
                                    )
                            }
                        })}
                        <button style={{marginTop:'15px', height: 'auto', width: 'auto',}} onClick={()=>{setPopInfoIsOpen1(false);props.changeStatus('waiting')}}>Сохранить</button>
                    </InfoPopUp>
                </div>

                <div className='columns'>
                    <h3>В ремонте</h3>
                {
                    props.data.map((element)=>{
                        if (element.status === 'repair') {
                            return <Unit deleteUnit={props.deleteUnit} info={element} selectUnit={props.selectUnit} id={element.id} name={element.name} key={element.id} isSelected={element.isSelected}/>
                        }
                    })
                }
                </div>
                
                <div className='columns__buttons'>
                    <button onClick={()=>setPopInfoIsOpen2(true)} disabled={!isDisabled('repair')}><img src={arrow}></img></button>
                    <InfoPopUp isOpen={popInfoIsOpen2} onClose={()=>{setPopInfoIsOpen2(false)}}>
                        <h3 style={{textAlign:'center', marginTop:'0'}}>Введите дату получения с ремонта</h3>
                        {props.data.map((element)=>{
                            if (element.isSelected === true && element.status === 'repair') {
                                return (
                                    <label key={element.id} >Для {element.name} (инвентарный {element.inv}):
                                        <input
                                            type='text' 
                                            placeholder='ДД.ММ.ГГГГ' 
                                            value={element.date2 ?? ''}
                                            onChange={(e)=>handleDateChange(element.id, e.target.value, 'date2')}
                                        />
                                    </label>
                                    )
                            }
                        })}
                        <button style={{marginTop:'15px', height: 'auto', width: 'auto',}} onClick={()=>{setPopInfoIsOpen2(false);props.changeStatus('repair')}}>Сохранить</button>
                    </InfoPopUp>
                </div> 
                <div className='columns'>
                    <h3>Отработано</h3>
                {
                    props.data.map((element)=>{
                        if (element.status === 'complited') {
                            return <Unit deleteUnit={props.deleteUnit} info={element} selectUnit={props.selectUnit} id={element.id} name={element.name} key={element.id} isSelected={element.isSelected}/>
                        }
                    })
                }
                </div>
            </div>
            <div className='actions'>
                <button onClick={()=>props.deleteSelected()} disabled={!isDisabled()}>
                    del
                </button>
                <button onClick={()=>props.changeStatus('back')} disabled={!isDisabled()}>
                    move back
                </button>
            </div>
            
        </>
    )
}

export default List