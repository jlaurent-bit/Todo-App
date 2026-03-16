import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { CheckCircle } from "lucide-react";

function App() {
  const iconSize =16
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    isComplete: false,
  });

  const [taskList, setTaskList] = useState([]);

  function handleChange(event) {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function add(task) {
    const newTask = { ...task, id: uuidv4() };
    setTaskList((previous) => [...previous, newTask]);
    setFormData({ title: "", desc: "" });
  }

  function deleteTask(id) {
    const newList = taskList.filter((t) => t.id !== id);
    setTaskList(newList);
  }

  function complete(id) {
        const task = taskList.find((t) => t.id === id);
    if (task) {
      const updatedTask = { ...task, isComplete: !task.isComplete };
      const newList = taskList.map((t) => (t.id === id ? updatedTask : t));
      setTaskList(newList);
    }
  }

  return (
    <>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Enter task"
          onChange={handleChange}
          value={formData.title}
        />
        <input
          type="text"
          name="desc"
          placeholder="Enter task description"
          onChange={handleChange}
          value={formData.desc}
        />
        <button type="button" onClick={() => add(formData)}>
          <Plus color="green" size={iconSize} /> Ajouter
        </button>
      </form>

      <div>
        <h2>To do</h2>
        <ul>
          {taskList.map((task, index) => (
            <li key={index}>
              <p>{task.title}</p>
              <p>{task.desc}</p>
              <button onClick={() => deleteTask(task.id)}>
                <Trash color="red" size={iconSize} />
                Delete
              </button>
              <button onClick={() => complete(task.id)}>
                <CheckCircle color="green" size={iconSize} />
                Complete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Completed</h2>
        <ul>
          {taskList
            .filter((task) => task.isComplete)
            .map((task, index) => (
              <li key={index}>
                <p>{task.title}</p>
                <p>{task.desc}</p>
                <button onClick={() => deleteTask(task.id)}>
                  <Trash color="red" size={iconSize} />
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );

}
export default App;
