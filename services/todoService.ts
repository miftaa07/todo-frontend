import { apiClient } from './api';
import {
    ApiTodo,
    TodosApiResponse as DummyJsonTodosResponse
} from '@/types/api-todo';

export interface BackendTodo {
    id: number;
    todo: string;
    completed: boolean;
    userId?: number;
}

interface TodoApiRecord {
    id: number;
    task?: string;
    todo?: string;
    is_completed?: boolean | number;
    completed?: boolean;
    user_id?: number;
    userId?: number;
}

export interface TodosResponse {
    success: boolean;
    message: string;
    data: TodoApiRecord[];
}

export interface SingleTodoResponse {
    success: boolean;
    message: string;
    data: TodoApiRecord;
}

export interface FetchTodosParams {
    limit?: number;
    skip?: number;
}

export interface CreateTodoInput {
    todo: string;
    completed?: boolean;
    userId?: number;
}

function normalizeTodo(todo: TodoApiRecord): BackendTodo {
    const title = todo.task ?? todo.todo;

    if (typeof title !== 'string') {
        throw new Error('Respons backend tidak berisi judul todo yang valid.');
    }

    return {
        id: todo.id,
        todo: title,
        completed: Boolean(todo.is_completed ?? todo.completed),
        userId: todo.user_id ?? todo.userId,
    };
}

export const todoService = {
    async getTodos(): Promise<BackendTodo[]> {
        const res = await apiClient<TodosResponse>(
            '/todos?perPage=50'
        );

        return res.data.map(normalizeTodo);
    },

    async getTodoById(
        id: number | string
    ): Promise<BackendTodo> {
        const res = await apiClient<SingleTodoResponse>(
            `/todos/${id}`
        );

        return normalizeTodo(res.data);
    },

    async createTodo(
        payload: string | CreateTodoInput
    ): Promise<BackendTodo> {
        const task =
            typeof payload === 'string'
                ? payload
                : payload.todo;

        const res = await apiClient<SingleTodoResponse>(
            '/todos',
            {
                method: 'POST',
                body: JSON.stringify({ task }),
            }
        );

        return normalizeTodo(res.data);
    },

    async updateTodo(
        id: number | string,
        payload: {
            task?: string;
            is_completed?: boolean;
        }
    ): Promise<void> {
        await apiClient(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        });
    },

    async deleteTodo(
        id: number | string
    ): Promise<void> {
        await apiClient(`/todos/${id}`, {
            method: 'DELETE',
        });
    },

    async fetchTodos(
        params: FetchTodosParams = {
            limit: 15,
            skip: 0,
        }
    ): Promise<DummyJsonTodosResponse> {
        try {
            const todos = await this.getTodos();

            const mapped: ApiTodo[] = todos.map((t) => ({
                id: t.id,
                todo: t.todo,
                completed: t.completed,
                userId: 1,
            }));

            return {
                todos: mapped,
                total: mapped.length,
                skip: params.skip || 0,
                limit: params.limit || 15,
            };
        } catch {
            return {
                todos: [],
                total: 0,
                skip: 0,
                limit: 15,
            };
        }
    },

    async fetchTodoById(
        id: number | string
    ): Promise<ApiTodo> {
        const todo = await this.getTodoById(id);

        return {
            id: todo.id,
            todo: todo.todo,
            completed: todo.completed,
            userId: 1,
        };
    },

    async updateTodoStatus(
        id: number | string,
        completed: boolean
    ): Promise<BackendTodo> {
        await this.updateTodo(id, {
            is_completed: completed,
        });

        return {
            id: Number(id),
            todo: '',
            completed,
        };
    },
};