var todoList = [];

var todoTable = document.getElementById('todo-table');
var todoValue = false;
var remember;

function postTodo(event) {
    event.preventDefault();
    var todoText = document.getElementById('todo-text').value;
    if(todoValue) {
        if(todoText === '') return;
        todoList[remember].title = todoText;
        todoValue = false;
        console.log(todoList[remember].title,todoList);
        localStorage.setItem('todos',JSON.stringify(todoList));
        createTodo(todoList);
        document.getElementById('todo-text').value = '';
        return;
    }
    if(todoText === '') return;
    var todoObject = {
        check:false,
        title:todoText,
    };
    todoList.push(todoObject);
    localStorage.setItem('todos',JSON.stringify(todoList));
    createTodo(todoList);
    document.getElementById('todo-text').value = '';
}

function displayTodo() {
    var todos = localStorage.getItem('todos');
    if(todos) {
       todoList = JSON.parse(todos);
    }
    createTodo(todoList);
}

displayTodo();

function createTodo(todos) {
    if(todos.length === 0) document.getElementById('msg').style.display = 'block';
    else document.getElementById('msg').style.display = 'none';
    todoTable.innerHTML = '';
        for (let i = 0; i < todos.length; i++) {
            var todo = todos[i];
            var tr = document.createElement('tr');
            todoTable.appendChild(tr);
            var td = document.createElement('td');
            td.classList.add('d-flex', 'justify-content-between', 'align-items-center');
            tr.appendChild(td);
            var box1 = document.createElement('div');
            box1.classList.add('d-inline-block');
            td.appendChild(box1);
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'checked-name';
            input.checked = todo.check;
            input.addEventListener('click',changeValue);
            input.setAttribute('data-number',`${i}`);
            box1.appendChild(input);
            box1.style = 'width: 80%; word-break:break-word;';
            var label = document.createElement('label');
            label.setAttribute('for','checked-name');
            label.setAttribute('data-number',`${i}`);
            label.innerText = todo.title;
            if(todo.check) label.classList.toggle('text-decoration-line-through');
            label.classList.add('ms-1');
            box1.appendChild(label);
            var box2 = document.createElement('div');
            box2.classList.add('d-inline-block');
            td.appendChild(box2);
            var div1 = document.createElement('div');
            div1.classList.add('bg-success', 'd-inline-block', 'py-2', 'px-3', 'rounded');
            div1.style = 'cursor:pointer;';
            div1.addEventListener('click',editTodo);
            div1.setAttribute('data-number',`${i}`);
            box2.appendChild(div1);
            var icon1 = document.createElement('i');
            icon1.classList.add('bi', 'bi-pencil-square', 'text-light');
            icon1.setAttribute('data-number',`${i}`);
            div1.appendChild(icon1);
            var div2 = document.createElement('div');
            div2.classList.add('bg-danger', 'd-inline-block', 'py-2', 'px-3', 'rounded', 'ms-1');
            div2.style = 'cursor:pointer;';
            div2.addEventListener('click',deleteTodo);
            div2.setAttribute('data-number',`${i}`);
            box2.appendChild(div2);
            var icon2 = document.createElement('i');
            icon2.classList.add('bi', 'bi-trash3', 'text-light');
            icon2.setAttribute('data-number',`${i}`);
            div2.appendChild(icon2);
        }
    document.getElementById('todo-counter').innerText = todos.length;
}


function editTodo(event) {
    var index = event.target.getAttribute('data-number');
    var text = document.querySelectorAll('label');
    text = text[index].innerText;
    document.getElementById('todo-text').value = text;
    todoValue=true;
    remember = index;
}

function deleteTodo(event) {
    var yesNo = confirm('Are you sure you want to delete Todo?');
    var index = event.target.getAttribute('data-number');
    if(yesNo) todoList.splice(index,1);
    localStorage.setItem('todos',JSON.stringify(todoList));
    createTodo(todoList);
}

function changeValue(event) {
    var index = event.target.getAttribute('data-number');
    var check = event.target.checked;
    todoList[index].check = check;
    localStorage.setItem('todos',JSON.stringify(todoList));
    createTodo(todoList);
}