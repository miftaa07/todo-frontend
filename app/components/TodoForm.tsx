'use client'

import React, { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

type TodoFormProps = {
  onAddTodo: (title: string) => void; 
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  // local state untuk controlled input form 
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // validasi sederhana : jangan izinkan input kosong atau hanya spasi 
    if (!title.trim()) return

    // kirim data ke komponen induk
    onAddTodo(title.trim())
    // reset input form 
    setTitle('')
  }

  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="flex-1 text-gray-800 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          variantSize="md"
        />
        <Button
          type="submit"
          disabled={!title.trim()}
          variant="default"
          size="md"
        >
          Tambah
        </Button>
      </form>
    </div>
  );
}
