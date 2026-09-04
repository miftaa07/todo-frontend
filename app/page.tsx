import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStateOnlyApp from './components/TodoStateOnlyApp';
import { getTodos } from '@/lib/todos';

export default async function TodoPage() {
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen p-6 bg-gray-200">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <header className="mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Daftar Tugas (Todo List)
            </h1>
          </header>
          {/* halaman beranda : menggunakan state murni (in-memory) */}
          <TodoStateOnlyApp initialTodos={initialTodos} />
        </div>
      </div>
    </main>
  );
}
