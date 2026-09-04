"use client";

import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Todo } from "@/types/todo";

type TodoStateOnlyAppProps = {
  initialTodos: Todo[];
};

export default function TodoStateOnlyApp({ initialTodos }: TodoStateOnlyAppProps) {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);

    //handler tambah tugas baru
  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description: "Tugas baru yang ditambahkan ke state komponen.",
      completed: false,
      createdAt: new Date().toISOString().split("T")[0], // Format tanggal: YYYY-MM-DD
    };

    setTodos((prev) => [newTodo, ...prev]);
  }

  // handler checklist / toggle status completed 
  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed }: todo
      )
    );
  }

  // handler hapus tugas
  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
        {/* Form Input Tugas */}
      <TodoForm onAddTodo={handleAddTodo} />

        {/* Daftar Tugas */}
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}