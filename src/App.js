import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://task-tracker-backend-49tz.onrender.com"; 
// 👆 replace with your real backend URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(API + "/tasks").then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!title) return;
    const res = await axios.post(API + "/tasks", { title });
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const deleteTask = async (id) => {
    await axios.delete(API + "/tasks/" + id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Task Tracker pro</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deleteTask(t.id)} style={{ marginLeft: 10 }}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
