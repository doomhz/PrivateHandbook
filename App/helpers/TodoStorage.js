import {AsyncStorage} from 'react-native';
import {differenceBy} from 'lodash';
import {
  TYPE_DO, TYPE_DECIDE, TYPE_DELEGATE,
  TYPE_DELETE, STORAGE_KEY_NAME,
  APP
} from './Constants.js'

const db = APP.database();

const getTodos = ()=> {
  return AsyncStorage.getItem(STORAGE_KEY_NAME)
  .then((todos)=> {
    try {
      todos = JSON.parse(todos)
    } catch (e) {
      todos = []
    }
    if (!todos) todos = []
    return todos
  })
}

const compareTodos = (a, b)=> {
  if (a.status !== "active" && b.status === "active") return 1
  if (a.status === "active" && b.status !== "active") return -1
  return 0
}

const getTodosByType = (type)=> {
  return getTodos().then((todos)=> {
    if (!type) return todos.filter((t)=> t.status !== "deleted")
    return todos.filter((t)=> t.type === type && t.status !== "deleted").sort(compareTodos)
  })
}

const getTodosByStatus = (status)=> {
  return getTodos().then((todos)=> {
    return todos.filter((t)=> t.status === status).sort(compareTodos)
  })
}

const setTodos = (todos)=> {
  return AsyncStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(todos))
}

const updateTodo = (todo = {})=> {
  return getTodos().then((todos)=> {
    todos.map((item)=> {
      if (item.status !== "deleted" && item.title === todo.title) {
        todo.last_updated = Date.now()
        item = Object.assign(item, todo)
      }
    })
    return setTodos(todos)
  })
}

const addTodo = (todo = {})=> {
  if (!todo.status) todo.status = "active"
  todo.last_updated = Date.now()
  return getTodos()
  .then((todos)=> {
    todos.push(todo)
    return setTodos(todos)
  })
}

const deleteTodo = (todo)=> {
  todo.status = "deleted"
  return updateTodo(todo)
}

// TODO: Unit test this
const mergeTodos = (todos1 = [], todos2 = [])=> {
  let mergedTodos = []
  todos1.forEach((t1)=> {
    let sameTitleTodos = todos2.filter((t)=> {
      return t.title === t1.title
    })
    if (!sameTitleTodos || !sameTitleTodos.length) return mergedTodos.push(Object.assign({}, t1))
    sameTitleTodos.push(Object.assign({}, t1))
    sameTitleTodos.sort((a, b)=> {
      if (a.last_updated < b.last_updated) return 1
      if (a.last_updated > b.last_updated) return -1
      return 0
    })
    mergedTodos.push(Object.assign({}, sameTitleTodos[0]))
  })
  mergedTodos = mergedTodos.concat(differenceBy(todos2, todos1, 'title'))
  return mergedTodos
}

const syncUserTodos = (uid)=> {
  return getTodos().then((todos)=> {
    let dataPath = `/user-todos/${uid}`
    return db.ref(dataPath).once('value')
    .then((snapshot)=> {
      let dbData = snapshot.val() || {}
      todos = mergeTodos(dbData.todos, todos)
      let data = {}
      data[dataPath] = {
        uid: uid,
        todos: todos
      }
      return db.ref().update(data)
      .then(()=> {
        return setTodos(todos)
      })
    })
  })
}


module.exports = {
  
  getTodosByType: getTodosByType,

  getTodosByStatus: getTodosByStatus,

  updateTodo: updateTodo,

  addTodo: addTodo,

  deleteTodo: deleteTodo,

  syncUserTodos: syncUserTodos
};