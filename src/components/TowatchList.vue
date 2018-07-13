<template>
  <div>
    <input type="text" class="towatch-input" placeholder="Movies to watch" v-model="newTowatch" @keyup.enter="addTowatch">
    <!-- v-model directive to create two-way data bindings on form input and textarea elements.
    It automatically picks the correct way to update the element based on the input type.  -->
    <div v-for="(todo, index) in towatchFiltered" :key="todo.id" class="towatch-item">
      <!-- v-for directive is used to render a list of items based on an array. -->
      <div class="towatch-item-left">
        <input type="checkbox" v-model="todo.completed">
        <div v-if="!todo.editing" @dblclick="editTowatch(todo)" class="towatch-item-label" :class="{ completed : todo.completed}">{{ todo.title }}</div>
        <!-- :class="{ completed : todo.completed} - conditional VUE class that adds class completed if the todo is completed. -->
        <!-- v-if only shows if we're NOT editing the input, v-else shows only if we ARE editing. The if/else toggles between the two states -->
        <input v-else class="towatch-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
        <!-- blur event is fired when an element has lost focus. -->
        <!-- v-model sets the title of an input or textarea -->
      </div>
      <div class="remove-item" @click="removeTowatch(index)">
        &times;
      </div>
    </div>
    <div class="extra-container">
      <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Check All</label></div>
      <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter == 'active' }" @click="filter = 'active'">To watch</button>
        <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed Movies</button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'towatch-list',
  data () {
    return {
      newTowatch: '',
      idForToWatch: 3,
      beforeEditCache: '',
      filter: 'all',
      todos: [
        {
          'id': 1,
          'title': 'Incredibles 2',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Jurassic World',
          'completed': false,
          'editing': false,
        },
      ]
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  // computer properties return data, they do not accept parameters
  computed: {
    remaining(){
      return this.todos.filter(todo => !todo.completed).length
      // filter property - filter our todos by ones that are not completed and grab their length.
    },
    anyRemaining(){
      return this.remaining != 0
    },
    towatchFiltered(){
      if(this.filter === 'all'){
        return this.todos
      } else if (this.filter === 'active'){
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === 'completed'){
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos
      }
    },
    //if there is 1 or more completed tasks, show the clear completed button
    showClearCompletedButton(){
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods: {
    addTowatch(todo) {
      if(this.newTowatch.trim().length == 0){
        return
      }

      this.todos.push({
        id: this.idForToWatch,
        title: this.newTowatch,
        completed: false,
      })

      this.newTowatch = ''
      this.idForToWatch++
    },
    editTowatch(todo) {
      this.beforeEditCache = todo.title
      todo.editing = true
    },
    doneEdit(todo) {
      if(todo.title.trim() == ''){
        todo.title = this.beforeEditCache
      }
      todo.editing = false
    },
    cancelEdit(todo){
      todo.title = this.beforeEditCache
      todo.editing = false
    },
    removeTowatch(index) {
      this.todos.splice(index, 1)
      //(index, 1) --> This gets the index of the item and removes it (1 item)
    },
    checkAllTodos(){
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
    clearCompleted(){
      // this.todos = this.todos.filter(todo = !todo.completed)
      this.todos = this.todos.filter(function (todo) {
        return !todo.completed;
      });
    }
  }
}
</script>

<style lang="scss">
  .towatch-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .towatch-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  .towatch-item-left {
    display: flex;
    align-items: center;
  }
  .towatch-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
      &:focus {
        outline: 0;
      }
    }
  .towatch-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 2px solid #6921bc;

    &:focus {
      outline: 0;
    }
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    border: none;
    padding: 3px 6px;
    cursor: pointer;

    &:hover {
      background: #ffffff;
      border: 2px solid #6921bc;
      color: #000000;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: #ffffff;
    border: 2px solid #6921bc;
    color: #000000;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
