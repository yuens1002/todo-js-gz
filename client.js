var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false //Boolean value
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    var deletedItem = this.todos[position].todoText;
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    this.todos[position].completed = !this.todos[position].completed;
  },
  toggleAll: function() { 
    var completedValue = [];
    
    this.todos.forEach(function(todo) {
      completedValue.push(todo.completed);
    });
    
    this.todos.forEach(function(todo) {
      if (completedValue.includes(false)) {
        todo.completed = true;
      } else {
        todo.completed = false;
      }
    });
  }
};

// group all user interactions together

var handlers = {
  addTodo: function() {
    var input = document.getElementById('addTodoTextInput');
    todoList.addTodo(input.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(posiiton, inputText) {
    todoList.changeTodo(posiiton, inputText);
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

// only concern about showing todo list

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoText = '';
      // todoLi.className = 'todoText';
      if (todo.completed === true) {
        todoText = '(x) ';
      } else {
        todoText = '( ) ';
      }
      
      todoLi.id = position;
      todoLi.textContent = todoText;
      todoLi.appendChild(this.createChangeTextInput(todo.todoText));
      todoLi.appendChild(this.createToggleBtn());
      todoLi.appendChild(this.createChangeTodoBtn());
      todoLi.appendChild(this.createDelBtn());
      todosUl.appendChild(todoLi);
      
      // this keyword here is referring to the 
      // view object which contains the callback 
      // funciton inside forEach
    }, this);
  },
  createDelBtn: function() {
    var delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delBtn';
    return delBtn;
  },
  createToggleBtn: function() {
    var toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Todo';
    toggleBtn.className = 'toggleBtn';
    return toggleBtn;
  },
  createChangeTodoBtn: function() {
    var changeTodoBtn = document.createElement('button');
    changeTodoBtn.textContent = 'Change Todo';
    changeTodoBtn.className = 'changeTodoBtn';
    return changeTodoBtn;
  },
  createChangeTextInput: function(inputText) {
    var changeTextInput = document.createElement('input');
    changeTextInput.value = inputText;
    changeTextInput.size = 32;
    changeTextInput.className = 'changeTextInput';
    return changeTextInput;
  },
  setupEventListeners: function() {
    var position = 0;
    var todoText = '';
    var todosUl = document.querySelector('ul');
      todosUl.addEventListener('click', function(event) {
      //get clicked element
      var elementClicked = event.target;
      if (elementClicked.className === 'delBtn') {
        position = parseInt(elementClicked.parentNode.id);
        handlers.deleteTodo(position);
      } 
      else if (elementClicked.className === 'toggleBtn') {
        position = parseInt(elementClicked.parentNode.id);
        handlers.toggleCompleted(position);
      }
      else if (elementClicked.className === 'changeTodoBtn') {
        position = parseInt(elementClicked.parentNode.id);
        todoText = elementClicked.parentNode.firstElementChild.value;
        handlers.changeTodo(position, todoText);
      }
    });
  }
};

view.setupEventListeners();

// when the text is clicked
// change todoLi.innerHTML = <input type="text">todoText;

