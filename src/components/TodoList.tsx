import { useRef, useState } from "react";

interface item {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<item[]>([]);
  const [input, setInput] = useState<string>("");

  function handleToggle(id: number) {
    setTodos(
      todos.map(todo => {
        if (todo.id == id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }

  function handleClick() {
    const newTodo: item = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold">Serene</h1>
      <ul className="list-disc">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`mt-[15px] ${todo.completed && "line-through"}`}
            onClick={() => handleToggle(todo.id)}>
            {todo.text}
          </li>
        ))}
      </ul>

      <input
        type="text"
        ref={inputRef}
        className="w-[165px] h-[35px] bg-white border rounded-[5px] mt-[40px] p-[10px] text-black"
        onChange={e => setInput(e.currentTarget.value)}
        placeholder="Add todo item"
      />
      <button
        className="h-[30px] w-[60px] bg-[#1b0fff] text-white mt-[10px] rounded-sm text-xs"
        onClick={handleClick}>
        Add
      </button>
    </div>
  );
}
