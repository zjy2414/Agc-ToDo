<template>
    <div>
        <h1>我的待办事项</h1>

        <div class="input-add">
            <input ref="todoInput" type="text" v-model="input" placeholder="to do..." />
            <button @click="add">
                <i class="plus">
                </i>
            </button>
        </div>

        <div class="filters">
            <span v-for="(f, index) in filters" :key="index" class="filter" :class="{ active: filterFlag == f.value }"
                @click="filter(f.value)">{{ f.name }}</span>
        </div>

        <div class="todo-list">
            <div class="todo-item" v-for="(todo, index) in todos" :key="index">
                <label>
                    <input class="check-box" type="checkbox" v-model="todo.completed" @change="toggle(index)" />
                    <span class="check-button"></span>
                </label>

                <div class="todo-item-text" @click="showEditModal(index)">
                    <div v-if="todo.completed" class="completed">{{ todo.content }}</div>
                    <div v-else>{{ todo.content }}</div>
                </div>
            </div>

            <el-empty v-if="todos.length == 0" description="还没有待办事项哦～" />
        </div>
    </div>
</template>

<script>
import { useAgcDB } from '@/components/useAgc';
import { TodoItem } from '@/components/model/TodoItem';
import { addTodo, updateTodo, getTodos, deleteTodo, getTodosWithFlag } from '@/components/useCURD';

async function getTodoList() {
    let todos = await getTodos();
    console.log(todos);
    this.todos = todos ? todos : [];
}

function add() {
    console.log(this.input)

    if (this.input.trim() === '') {
        this.$message.error('请输入内容哦～')
        return
    }

    console.log(addTodo);

    const todo = new TodoItem();
    todo.content = this.input;
    todo.completed = false;


    addTodo(todo);

    this.todos.push({
        content: this.input,
        completed: false,
    })
    this.input = ''
}

async function filter(type) {
    this.filterFlag = type;
    let todos = []
    console.log(type)
    switch (type) {
        case 'all':
            todos = await getTodos();
            break;
        case 'active':
            todos = await getTodosWithFlag(false);
            break;
        case 'completed':
            todos = await getTodosWithFlag(true);
            break;
    }
    this.todos = todos ? todos : [];
}

//切换完成状态
function toggle(index) {
    console.log(this.todos[index])
    var todo = new TodoItem();
    todo.id = this.todos[index].id;
    todo.uid = this.todos[index].uid;
    todo.content = this.todos[index].content;
    todo.completed = this.todos[index].completed;
    updateTodo(todo);
}

function remove(index) {
    var todo = new TodoItem();
    todo.id = this.todos[index].id;

    if (deleteTodo(todo)) {
        this.todos.splice(index, 1);
        this.$message({
            type: 'success',
            message: "删除成功～",
        })
    } else {
        this.$message({
            type: 'warning',
            message: "删除失败～",
        })
    }
}

function showEditModal(index) {
    this.$prompt('', '编辑内容', {
        confirmButtonText: '确定',
        cancelButtonText: '删除',
        distinguishCancelAndClose: true,
        inputValue: this.todos[index].content,
        inputPattern: /^.+$/,
        inputErrorMessage: '请输入内容',
    }).then(({ value }) => {
        this.todos[index].content = value;
    }).catch((action) => {
        if (action === 'cancel') {
            // 删除todo
            this.remove(index);
        }
    });
}


export default {
    name: 'Home',
    components: {

    },
    mounted() {
        
        useAgcDB();
        this.$nextTick(() => {
            this.$refs.todoInput.focus()
        })
        setTimeout(() => {
            this.getTodoList();
        }, 300);
    },
    data() {
        return {
            input: '',
            todos: [],
            filterFlag: 'all',
            filters: [
                {
                    name: '全部',
                    value: 'all',
                },
                {
                    name: '未完成',
                    value: 'active',
                },
                {
                    name: '已完成',
                    value: 'completed',
                },
            ]
        }
    },
    methods: {
        add,
        filter,
        toggle,
        remove,
        showEditModal,
        getTodoList,
    }
}
</script>

<style scoped>
h1 {
    font-size: 28px;
    color: #414873;
    margin-bottom: 10%;
}

.input-add {
    display: flex;
    position: relative;
    align-items: center;
}

.input-add input {
    padding: 16px 52px 16px 18px;
    border: none;
    border-radius: 30px;
    outline: none;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
    width: 100%;
    font-size: 16px;
    color: #626262;
}

.input-add button {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: linear-gradient(#c0a5f3, #7f95f7);
    border: none;
    outline: none;

    position: absolute;
    color: white;
    right: 0px;

    cursor: pointer;
}

.input-add .plus {
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff);
    background-size: 50% 2px, 2px 50%;
    background-position: center;
    background-repeat: no-repeat;
}

.filters {
    display: flex;
    margin: 24px 2px;
    color: #c0c2ce;
    font-size: 14px;
}

.filters .filter {
    margin-right: 14px;
    transition: 0.8s;
    cursor: pointer;
}

.filters .filter.active {
    color: #6b729c;
    transform: scale(1.2);
}

.todo-list {
    display: grid;
    row-gap: 14px;
}

.todo-item {
    background: white;
    padding: 16px;
    border-radius: 8px;
    color: #626262;
    position: relative;
    display: flex;
}

.todo-item label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.todo-item.done label {
    text-decoration: line-through;
    font-style: italic;
}

.todo-item label span.check-button {
    position: absolute;
    top: 0;
}

.todo-item label span.check-button::before,
.todo-item label span.check-button::after {
    content: "";
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
}

.todo-item label span.check-button::before {
    border: 1px solid #b382f9;
}

.todo-item label span.check-button::after {
    transition: 0.4s;
    background: #b382f9;
    transform: translate(0.9x, 0.9px) scale(0.5);
    opacity: 0;
}

.todo-item input {
    margin-right: 16px;
    opacity: 0;
}

.todo-item input:checked+span.check-button::after {
    opacity: 1;
}

.completed {
    text-decoration: line-through;
    font-style: italic;
}

.todo-item-text {
    min-width: 100%;
    height: 22px;
    min-height: 100%;
    text-align: left;
}
</style>
