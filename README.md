# loopback4-example-todo-jwt-authorize

**Learning in progress. So the application is still working in progress**

LoopBack 4 Todo application with JWT authentication and authorization.

Built on top of [todo-jwt](https://github.com/strongloop/loopback-next/tree/master/examples/todo-jwt) LoopBack 4 application. Therefore, if you're not familiar with that application, it's better to go there first.

# Before we begin

There are a few slight modification on the application/scenario from the todo-jwt application.

1. Since there is authorization involved, we'd like to introduce roles in our User profile.
2. There will be an `owner` property in the Todo model, so that we can set the corresponding rights to Todo items created by the users.

## Part 1 - Customize the User model

We'd like to introduce 3 roles:

- user: can read/update/delete todo items created by them
- support: can update/delete todo items created by them, but can read everyone's todo items
- admin: can read/update/delete todo items created by anyone

Let's follow the instruction on how to customize the User model: https://github.com/strongloop/loopback-next/tree/master/extensions/authentication-jwt#customizing-user

## Part 2 - Modify the Todo Application first

Modify the todo application so that the Todo model includes the owner of the todo.

### Step 1: Modify the Todo model

In the [User model](src/models/todo.model.ts), add an additional property `owner`.

```ts
  @property({
    type: 'string',
  })
  owner?: string;
```

### Step 2: Modify the Todo Controller

In [`src/controllers/todo.controller.ts`](src/controllers/todo.controller.ts), when someone create a todo, the `owner` property is set to the current user.

1. Add the following import statement and inject the current user:

```ts
import {SecurityBindings, UserProfile} from '@loopback/security';
//...
constructor(
    @repository(TodoRepository) protected todoRepository: TodoRepository,
    @inject(SecurityBindings.USER) public currentUserProfile: UserProfile,
) {}
```

2. In the `createTodo` function,

```ts
todo.owner = this.currentUserProfile[securityId]; // ADD THIS LINE
return this.todoRepository.create(todo);
```

### Step 3: Test it out

Let's test it out what's changed.

1. Start the application using `npm start`. Go to http://localhost:3000/explorer.
2. Log in through `POST /users/login`.
3. After logging in, copy the token and set it in the Authorize dialog (click the Authorize button at the top of the page).
4. After setting the JWT, let's create a todo item. e.g.

   ```json
   {
     "title": "buy apples",
     "desc": "buy 10 apples",
     "isComplete": false
   }
   ```

5. Go to [data/db.json](data/db.json) and you'll see there's an additional `owner` property appear which is the user that's logged in while creating that todo item.

## Reference

- Authorization documentation page, https://loopback.io/doc/en/lb4/Loopback-component-authorization.html
- LoopBack shopping example, https://github.com/strongloop/loopback4-example-shopping
- Another authorization related example, https://github.com/strongloop/loopback-next/tree/master/examples/access-control-migration
