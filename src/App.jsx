import { useState, useEffect } from 'react'
import { stringify, v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import './App.css'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [temtodos, settemtodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  // const [time, setTime] = useState(new Date());

  useEffect(() => {
    let todos = localStorage.getItem("todos")
    if (todos) {
      todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleSave = (e, temtodos) => {
    console.log(temtodos.length === 0)
    if (temtodos.length === 0) {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      console.log(todos)
      settodo("")
    } else {
      let index = temtodos[0].index
      temtodos[0].newtodos[index].todo = todo
      settodos(temtodos[0].newtodos);
      settemtodos([])
      settodo("")
    }
    // console.log(todos)
    savetoLS()
  }

  const handleEdit = (e, id) => {
    let newtodos = [...todos]
    let index = todos.findIndex(item => {
      return item.id === id
    })
    settodo(newtodos[index].todo)
    settemtodos([...temtodos, { newtodos, index: index }])
  }

  const handleDelete = (e, id) => {
    console.log(id)
    const newtodos = todos.filter(item => {
      return item.id !== id
    })

    settodos(newtodos)
    savetoLS()
  }

  const handleCheckbox = (e, id) => {
    let newtodos = [...todos]
    let index = todos.findIndex(item => {
      return item.id === id
    })
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    savetoLS()
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      
      <div className="md:container md:w-[35%] md:mx-auto h-[80vh] my-6 p-3 mx-5 bg-gray-100 shadow-md rounded-xl">
        <h1 className='text-2xl text-center'>Write Here Your Todos</h1>
        <div className='flex justify-center items-center'>
          <input className='px-2 p-3  w-[80%] my-2 rounded-xl' type="text" onChange={handleChange} value={todo} />
          <button disabled={todo.length <= 3} className=" disabled:bg-violet-600 mx-5  my-2 p-1 px-3 bg-violet-900 text-white rounded-2xl" onClick={(e) => { handleSave(e, temtodos) }} >Save</button>
        </div>
        <input type="checkbox" id='show' onChange={toggleFinished} checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className="divider h-[1px] bg-gray-500"></div>
        <div >
          <div className="todos h-[55vh] overflow-auto">
            {todos.length === 0 && <p>No todo is here</p>}
            {todos.map(item => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between items-center">
                <div className='content flex gap-2'>
                  <input className='self-start mt-1' id='item.id' checked={item.isCompleted} onChange={(e) => { handleCheckbox(e, item.id) }} type="checkbox" />
                  <div className={item.isCompleted ? "line-through " : ""}>{item.todo}</div>
                </div>
                <div className='buttons flex gap-2'>
                  <button className="edit float-end mx-2  my-2 p-1 px-3 bg-violet-900 text-white rounded-2xl" onClick={(e) => { handleEdit(e, item.id) }} ><CiEdit /></button>
                  <button className="delete mx-2  my-2 p-1 px-3 bg-violet-900 text-white  rounded-2xl" onClick={(e) => { handleDelete(e, item.id) }} ><MdDelete /></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
