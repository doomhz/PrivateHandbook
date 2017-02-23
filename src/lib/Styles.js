import { StyleSheet } from 'react-native'

export const toDoListStyles = StyleSheet.create({
  todoList: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10
  },
  todoItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10
  },
  todoItemText: {
    paddingLeft: 10,
    paddingTop: 2,
    fontSize: 15,
    flex: 1
  },
  todoItemTextCompleted: {
    textDecorationLine: 'line-through',
    paddingLeft: 10,
    paddingTop: 2,
    fontSize: 15,
    flex: 1,
    color: '#DDD'
  },
  addTodoBox: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  allDoneText: {
    paddingTop: 20,
    paddingBottom: 15,
    textAlign: 'center',
    fontSize: 15
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowFront: {
    backgroundColor: '#FFF'
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5
  },
  deleteButtonText: {
    color: '#FFF'
  },
  content: {
    backgroundColor: '#fff'
  },
  infoButton: {
    fontSize: 19,
    color: '#1981fb'
  },
  addButton: {
    color:'#384850'
  }
})

export const infoStyles = StyleSheet.create({
  infoContainer: {
    padding: 5
  }
})

export const loginStyles = StyleSheet.create({
  errorCard: {
    margin: 10,
    marginTop: 20,
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1'
  },
  errorText: {
    color: '#a94442',
    fontWeight: 'bold'
  },
  list: {
    paddingRight: 15
  },
  authButton: {
    margin: 10,
    marginBottom: 0
  }
})

export const mainStyles = StyleSheet.create({
  cardLeftTop: {
    borderRadius: 0,
    borderRightWidth: 0
  },
  cardRightTop: {
    borderRadius: 0,
    borderLeftWidth: 0
  },
  cardLeftBottom: {
    borderRadius: 0,
    borderRightWidth: 0
  },
  cardRightBottom: {
    borderRadius: 0,
    borderLeftWidth: 0
  },
  cardItem: {
    flex: 1,
    flexDirection: 'column'
  },
  todoTextOverview: {
    // flex: 1,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  todoTextOverviewText: {
    fontSize: 15,
    color: '#000',
    paddingLeft: 5
  },
  row: {
    paddingTop: 0
  },
  colLeft: {
    paddingLeft: 5,
    paddingRight: 0
  },
  colRight: {
    paddingLeft: 0,
    paddingRight: 5
  },
  quickAddModalContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  quickAddForm: {
    backgroundColor: '#fff',
    borderRadius: 5
  },
  quickAddButton: {
    marginTop: 5
  }
})

export const sidebarStyles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: '#fff'
  }
})