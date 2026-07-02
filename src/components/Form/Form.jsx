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

        function changeHistory(newInv) {
       
            let result = props.data.map(element => {
                if (element.inv === newInv) return {...element, 
                    history: [...element.history, `Дата передачи на ремонт: ${element.date1}\nДата получения с ремонта: ${element.date2}\nНеисправность: ${element.defect}`], 
                    defect: event.target.defect.value,
                    date1: null,
                    date2: null,
                    comment: event.target.comment.value,
                    status: 'waiting',
                    place: null,
                }
                else return {...element}
            })
            
            props.setData(result)
        }

        let counter = false;
        props.data.forEach(element => {
            if (element.inv === event.target.inv.value) {counter=true}
        });

        if (counter === false) {

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
            place: null,
            history: [],
        }]
        
        props.setData(newData)
        
        }

        else {
            let userResponse;
            userResponse = confirm(`В списке уже числится оборудование с указанным инвентарным номером. Введенные значения будут учтены, старые данные перейдут в историю.\nПродолжить?`)
            userResponse ? 
            props.data.forEach(element => {
                 if (element.inv === event.target.inv.value) {
                    changeHistory(event.target.inv.value)
                 }
            })
            : null
        }

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