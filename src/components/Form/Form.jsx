import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import './Form.css'



function Form(props) {
    const [name, setName] = useState('')
    const [inv, setInv] = useState('')
    const [defect, setDefect] = useState('')
    const [comment, setComment] = useState('')

    function submitForm(event) {
        
        event.preventDefault()

        const newData = 
        [...props.data, {
            id: uuidv4(),
            name: event.target.name.value,
            inv: event.target.inv.value,
            defect: event.target.defect.value,
            date1: null,
            date2: null,
            comment: event.target.comment.value,
            status: 'waiting',
            isSelected: false,
        }]
        
        props.setData(newData)

        setName('')
        setInv('')
        setDefect('')
        setComment('')
    }
    
    return (
        <div className='repair__form'>
            <h2>Добавить оборудование</h2>
            <form onSubmit={submitForm}>
                <label>Наименование
                    <input type="text" value={name} name="name" onChange={(event) => {setName(event.target.value)}}/>
                </label>
                <label>Инвентарный номер
                    <input type="text" value={inv} name="inv" onChange={(event) => {setInv(event.target.value)}}/>
                </label>
                <label>Неисправность
                    <input type="text" value={defect} name="defect" onChange={(event) => {setDefect(event.target.value)}}/>
                </label>
                <label>Комментарий
                    <input type="text" value={comment} name="comment" onChange={(event) => {setComment(event.target.value)}}/>
                </label>
                <button type="submit">Добавить</button>
            </form>
        </div>
        

    )
}

export default Form