import React, { useState, useEffect } from "react";
import { db } from "./db";
import { useLiveQuery } from 'dexie-react-hooks';


export default function App() {
  //ตัวแปรเก็บชื่อ
  const [name, setName] = useState('');
  //ตัวแปรเก็บจำนวน
  const [quantity, setQuantity] = useState(0);
  //บอกระบบว่าจะใช้ตัวนี้ในการเก็บข้อมูลนะ
  const items = useLiveQuery(() => db.items.toArray());

  //คำสั่งในการเพิ่มสินค้า
  const addItem = async (e) => {
    e.preventDefault();
    await db.items.add({ name, quantity: Number(quantity) });
    setName('');
    setQuantity(0);
  };
  //คำสั่งในการลบสินค้า
  const deleteItem = async (id) => {
    await db.items.delete(id);
  };
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );
    setTasks(newTasks);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
      <header className="bg-white border-b border-gray-200 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
            68112839 นายธิติวุฒิ คัชมา
          </h1>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-500 transition">Home</a>
            <a href="#" className="hover:text-indigo-500 transition">Features</a>
            <a href="#" className="hover:text-indigo-500 transition">About</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            สิ่งที่ต้องทำวันนี้
          </h1>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="ระบุเรื่องที่จะทำ..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
              onClick={addTask}
            >
              เพิ่ม
            </button>
          </div>

          <ul className="space-y-2">
            {tasks.map((t, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-xl shadow-sm"
              >
                <span
                  onClick={() => toggleTask(index)}
                  className={`cursor-pointer flex-1 ${
                    t.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.text}
                </span>
                <button
                  onClick={() => toggleTask(index)}
                  className={`px-3 py-1 text-sm rounded-xl ${
                    t.done ? "bg-green-400 text-white" : "bg-gray-200"
                  }`}
                >
                  {t.done ? "Done" : "Mark"}
                </button>
              </li>
            ))}
          </ul>
        </div>

<div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Inventory (IndexedDB)</h1>

      <form onSubmit={addItem} className="space-y-3 mb-8 bg-gray-50 p-4 rounded-lg shadow">
        <input
          type="text" placeholder="ชื่อสินค้า"
          className="w-full p-2 border rounded"
          value={name} onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number" placeholder="จำนวน"
          className="w-full p-2 border rounded"
          value={quantity} onChange={(e) => setQuantity(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          บันทึกลง Browser
        </button>
      </form>

      <ul className="space-y-2">
        {items?.map(item => (
          <li key={item.id} className="flex justify-between items-center bg-white border p-3 rounded shadow-sm">
            <span>{item.name} ({item.quantity})</span>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>

      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 uppercase tracking-widest">
            Copyright 2026 DPU
          </p>
        </div>
      </footer>
    </div>
  );
}