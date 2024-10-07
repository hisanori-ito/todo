import './App.css';
import React, {useEffect, useState} from 'react';

function App() {

  // stateの設定

  const [todos, setTodos] = 
    useState([
      {id: 1, title: 'todo 1', status: 'done'}, 
      {id: 2, title: 'todo 2', status: 'notStarted'}, 
      {id: 3, title: 'todo 3', status: 'notStarted'} 
    ])

  const [todoTitle, setTodoTitle] = useState('')
  const [todoId, setTodoId] = useState(todos.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState('')
  const [newTitle, setNewTitle] = useState('')

  const [filter, setFilter] = useState('notStarted')
  const [filteredTodos, setFilteredTodos] = useState([])

  const addTodoTitle = (e) => {
    setTodoTitle(e.target.value)
  }

  const addTodo = () => {
    setTodos([
      ...todos,{
        id: todoId,
        title: todoTitle,
        status: 'notStarted'
      }
    ])
    setTodoId(todoId + 1)
    setTodoTitle('')
  }

  const onEditForm = (todo) => {
    setIsEditable(true)
    setEditId(todo.id)
    setNewTitle(todo.title)
  }
  
  const offEditForm = () => {
    setIsEditable(false)
    setEditId('')
  }

  const changeEdit = (e) => {
    setNewTitle(e.target.value)
  }

  const saveEdit = () => {
    const newArray = todos.map((todo) => 
      todo.id === editId ? {...todo, title: newTitle} : todo
    )

    setTodos(newArray)

    // 初期化
    setNewTitle('')
    offEditForm()
  }

  const changeStatus = (targetTodo, e) => {
    const newArray = todos.map((todo)  => 
      todo.id === targetTodo.id ? 
        {...todo, status: e.target.value} : todo
    )

    setTodos(newArray)

  }

  const deleteTodo = (deleteTodo) => {
    setTodos(todos.filter(
      (todo) => todo !== deleteTodo
    ))
  }

  useEffect(() => {

    const filteredTodos = () => {
      switch(filter) {
        case 'notStarted':
          setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'))
          break
        case 'inProgress':
          setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'))
          break
        case 'done':
          setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
          break
        default:
          setFilteredTodos(todos)
      }
    }

    filteredTodos()
  }, [filter, todos])

  return (
    <div className="App">
      <h1>TODO APP</h1>

      {/* todo表示 */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => onEditForm(todo)}>edit</button>
            <button onClick={() => deleteTodo(todo)}>delete</button>
            <select name="TODO" value={todo.status} onChange={(e) => changeStatus(todo, e)}>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
          </li>
        ))}
      </ul>

      {isEditable ? 
        (
          // 編集フォーム
          <div>
            <input type="text" label="edit" placeholder="edit TODO" value={newTitle} onChange={changeEdit}/>
            <button onClick={saveEdit}>save</button>
            <button onClick={offEditForm}>cancel</button>
          </div>
        )
          : 
        (
          // 追加フォーム
          <div>
            <input type="text" label="title" placeholder="add TODO" value={todoTitle} onChange={addTodoTitle} />
            <button onClick={addTodo}>add</button>
            <button>cancel</button>
            
            {/* 表示切り替えプルダウン */}
            <label>Which one ?</label>
            <select name="TODO" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">すべて</option>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
          </div>
        )
      }

    </div>
  );
}

export default App;
