import { TodoItem } from "./model/TodoItem";
import {
  uid,
  executeDelete,
  executeUpsert,
  CloudDBZoneQuery,
  cloudDBZone,
} from "./useAgc";
import { uuid } from "vue-uuid";

// 添加todo
async function addTodo(todo) {
  todo.id = uuid.v1();
  todo.uid = uid;
  todo.completed = false;

  console.log(todo);

  executeUpsert(todo)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}

// 修改todo
async function updateTodo(todo) {
  console.log(todo);

  executeUpsert(todo)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}

// 查询所有todo
async function getTodos() {
  try {
    const query = CloudDBZoneQuery.where(TodoItem);
    const snapshot = await cloudDBZone.executeQuery(query);
    const resultArray = snapshot.getSnapshotObjects();
    // console.log(resultArray);
    return resultArray;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// 查询标识位为true/false的todo
async function getTodosWithFlag(flag) {
  try {
    const query = CloudDBZoneQuery.where(TodoItem);
    query.equalTo("completed", flag);
    const snapshot = await cloudDBZone.executeQuery(query);
    const resultArray = snapshot.getSnapshotObjects();
    // console.log(resultArray);
    return resultArray;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// 删除todo
async function deleteTodo(todo) {
  try {
    const num = await executeDelete(todo);
    console.log(num);
    return num == 1 ? true : false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { addTodo, updateTodo, getTodos, getTodosWithFlag, deleteTodo };
