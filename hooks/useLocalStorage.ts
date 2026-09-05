"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    // State diinisialisasi dengan initialValue dulu (aman untuk SSR/hydration)
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Setelah komponen mount di browser, baca dari localStorage
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item) as T);
            }
        } catch (error) {
            console.warn(`Gagal membaca localStorage untuk key "${key}":`, error);
        }
    }, [key]);

    // Sinkronisasi antar-tab: dengarkan event "storage" dari tab lain
    useEffect(() => {
        const handleStorageEvent = (e: StorageEvent) => {
            if (e.key === key) {
                try {
                    const newValue =
                        e.newValue !== null
                            ? (JSON.parse(e.newValue) as T)
                            : initialValue;
                    setStoredValue(newValue);
                } catch {
                    // abaikan jika JSON tidak valid
                }
            }
        };
        window.addEventListener("storage", handleStorageEvent);
        return () => window.removeEventListener("storage", handleStorageEvent);
    }, [key, initialValue]);

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                // Gunakan functional update agar selalu dapat nilai terbaru
                setStoredValue((prev) => {
                    const nextValue =
                        value instanceof Function ? value(prev) : value;
                    // Simpan ke localStorage
                    window.localStorage.setItem(key, JSON.stringify(nextValue));
                    return nextValue;
                });
            } catch (error) {
                console.warn(
                    `Gagal menyimpan ke localStorage untuk key "${key}":`,
                    error
                );
            }
        },
        [key]
    );

    return [storedValue, setValue] as const;
}