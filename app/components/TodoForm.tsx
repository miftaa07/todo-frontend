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
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="flex-1"
          inputClassName="rounded-full border-gray-300 focus-visible:ring-primary-70"
          variantSize="md"
        />
        <Button
          type="submit"
          disabled={!title.trim()}
          variant="default"
          size="md"
          className="rounded-full shrink-0"
        >
          Tambah
        </Button>
      </form>
    </div>
  );
}
