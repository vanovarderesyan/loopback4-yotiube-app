import { Filter } from '@loopback/repository';
import { Todo } from '../models';
import { TodoRepository } from '../repositories';
import { Geocoder } from '../services';
import { UserProfile } from '@loopback/security';
export declare class TodoController {
    protected todoRepository: TodoRepository;
    protected geoService: Geocoder;
    currentUserProfile: UserProfile;
    constructor(todoRepository: TodoRepository, geoService: Geocoder, currentUserProfile: UserProfile);
    createTodo(todo: Omit<Todo, 'id'>): Promise<Todo>;
    findTodoById(id: number, items?: boolean): Promise<Todo>;
    findTodos(filter?: Filter<Todo>): Promise<Todo[]>;
    replaceTodo(id: number, todo: Todo): Promise<void>;
    updateTodo(id: number, todo: Partial<Todo>): Promise<void>;
    deleteTodo(id: number): Promise<void>;
}
