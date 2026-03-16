import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { CheckCircle } from "lucide-react";

function App() {
  const iconSize = 16;
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });

  const [taskList, setTaskList] = useState([]);

  function handleChange(event) {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function add(task) {
    const trimmedTitle = task.title.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: trimmedTitle,
      desc: task.desc.trim(),
      isComplete: false,
    };

    setTaskList((previous) => [...previous, newTask]);
    setFormData({ title: "", desc: "" });
  }

  function deleteTask(id) {
    setTaskList((previous) => previous.filter((t) => t.id !== id));
  }

  function complete(id) {
    setTaskList((previous) =>
      previous.map((t) =>
        t.id === id ? { ...t, isComplete: !t.isComplete } : t
      )
    );
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
          {taskList
            .filter((task) => !task.isComplete)
            .map((task) => (
              <li key={task.id}>
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
            .map((task) => (
              <li key={task.id}>
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
