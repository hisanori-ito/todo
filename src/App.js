import './App.css';

function App() {
  return (
    <div className="App">
      <h1>TODO APP</h1>
      <ul>
        <li>
          <span>title</span>
          <button>edit</button>
          <button>delete</button>
        </li>
        <li>
          <span>title2</span>
          <button>edit</button>
          <button>delete</button>
        </li>
      </ul>
      {/* 追加フォーム */}
      <input type="text" label="title" placeholder="add TODO"/>
      <button>add</button>
      <button>cancel</button>
      {/* 編集フォーム */}
      <input type="text" label="edit" placeholder="edit TODO"/>
      <button>edit</button>
      <button>cancel</button>
      {/* 表示切り替えプルダウン */}
      <label>Which one ?</label>
      <select name="TODO">
        <option value="all">すべて</option>
        <option value="notStarted">未着手</option>
        <option value="inProgress">作業中</option>
        <option value="done">完了</option>
      </select>
    </div>
  );
}

export default App;
