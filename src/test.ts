export default function() {
  

  const initState = {
    count: 0,
    todoList: []
  }


  function counterReducer(state, action) {
    if (action.type === 'ADD') {
      return state + 1
    } else {
      return state
    }
  }

  function todoReducer(state, action) {
    switch(action.type) {
      case 'ADD':
        return state
    }
  }

  function reducer(state, action) {
    return {
      todoState: todoReducer(state, action),
      counterState: counterReducer(state, action),
    }
  }

  function combineReducers(reducersMap) {
    return function combinationReducer(state, action) {
      const nextState = {}
      Object.entries(reducersMap).forEach(([key, reducer]) => {
        nextState[key] = reducer(state[key], action)
      })
      return nextState
    }
  }


}