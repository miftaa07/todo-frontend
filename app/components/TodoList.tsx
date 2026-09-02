'use client'

import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/types/todo';

type todoListProps = {
    todo: Todo[];
    onToggleTodo: (id: number) => void;
    onDeleteTodo: (id: number) => void;
}

export default function TodoList({ todo,onToggleTodo,onDeleteTodo }: todoListProps) {
    if (todo.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500 border-2 border-dashed
                border-gray-200 rounded-md">
                <p>Belum ada tugas. Yay!</p>
            </div>
        );
    }

   return (
    <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-80">Daftar Tugas</h2>
        <span className="text-xs bg-gray-70 text-gray-600 px-2.5 py-1 rounded-full font-medium">
            {todo.length} item
        </span>
        </div>

        <ul className="space-y-3">
        {todo.map((todo) => (
            <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            />
        ))}
        </ul>
    </div>
    );
}
