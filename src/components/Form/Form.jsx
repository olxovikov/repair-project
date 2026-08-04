import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import './Form.css'
import axios from 'axios'



function Form(props) {
    const [name, setName] = useState('')
    const [inv, setInv] = useState('')
    const [defect, setDefect] = useState('')
    const [comment, setComment] = useState('')

    

const submitForm = async (event) => {
        
        event.preventDefault()

        // function changeHistory(newInv) {
       
        //     let result = props.data.map(element => {
        //         if (element.inv === newInv) return {...element, 
        //             history: [...element.history, `Дата передачи на ремонт: ${element.date1}\nДата получения с ремонта: ${element.date2}\nНеисправность: ${element.defect}`], 
        //             defect: event.target.defect.value,
        //             date1: null,
        //             date2: null,
        //             comment: event.target.comment.value,
        //             status: 'waiting',
        //             place: null,
        //         }
        //         else return {...element}
        //     })
            
        //     props.setData(result)
        // }

        const changeHistory = async (newInv) => {
            // Находим элемент, который будем обновлять
            const targetElement = props.data.find(el => el.inv === newInv);
            if (!targetElement) return;
          
            // Собираем обновления (как вы делали)
            const historyEntry = `Дата передачи на ремонт: ${targetElement.date1}\nДата получения с ремонта: ${targetElement.date2}\nНеисправность: ${targetElement.defect}`;
          
            const updatedFields = {
              history: [...targetElement.history, historyEntry],
              defect: event.target.defect.value,   // важно: event доступен из внешней функции
              date1: null,
              date2: null,
              comment: event.target.comment.value,
              status: 'waiting',
              place: null,
            };
          
            try {
              // Отправляем PATCH-запрос (можно использовать /bulk с одним элементом)
              const response = await axios.patch('http://localhost:4000/data/bulk', [
                { id: targetElement.id, ...updatedFields }
              ]);
              // Обновляем состояние из ответа сервера
              props.setData(response.data);
            } catch (error) {
              console.error('Ошибка при обновлении истории:', error);
              alert('Не удалось сохранить изменения. Попробуйте позже.');
            }
          };

        let counter = false;
        props.data.forEach(element => {
            if (element.inv === event.target.inv.value) {counter=true}
        });

        if (counter === false) {

        const newUnit = 
        {
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
        }
        
        try {
            const response = await axios.post('http://localhost:4000/data', newUnit)
            props.setData(response.data)
            setName('')
            setInv('')
            setDefect('')
            setComment('')
        } catch (error) {
            console.log('Ошибка при добавлении:', error)
        }

        
        
        }

        else {
            let userResponse;
            userResponse = confirm(`В списке уже числится оборудование с указанным инвентарным номером. Введенные значения будут учтены, старые данные перейдут в историю.\nПродолжить?`)
            userResponse ? 
            (()=>{
                props.data.forEach(element => {
                    if (element.inv === event.target.inv.value) {
                       changeHistory(event.target.inv.value)
                    }
               })
               setName('');
               setInv('');
               setDefect('');
               setComment('');
            })()
            : null
        }

        
    }
    
    return (
        <div className='repair__form'>
            <h2>Добавить оборудование</h2>
            <form onSubmit={submitForm}>
                <label><strong>Инвентарный номер</strong>
                    <input placeholder='...' type="text" value={inv} name="inv" onChange={(event) => {setInv(event.target.value)}}/>
                </label>
                <label><strong>Наименование</strong>
                    <input placeholder='...' type="text" value={name} name="name" onChange={(event) => {setName(event.target.value)}}/>
                </label>
                <label><strong>Неисправность</strong>
                    <input placeholder='...' type="text" value={defect} name="defect" onChange={(event) => {setDefect(event.target.value)}}/>
                </label>
                <label><strong>Комментарий</strong>
                    <input placeholder='...' type="text" value={comment} name="comment" onChange={(event) => {setComment(event.target.value)}}/>
                </label>
                <button type="submit"><strong>Добавить</strong></button>
            </form>
        </div>
        

    )
}

export default Form