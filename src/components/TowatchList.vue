<template>
  <div class="watch-list-form">
    <h1>Create your list</h1>
    <input type="text" class="towatch-input" placeholder="Add a movie and press enter" v-model="newTowatch" @keyup.enter="addTowatch">
    <!-- v-model directive to create two-way data bindings on form input and textarea elements.
    It automatically picks the correct way to update the element based on the input type.  -->
    <div v-for="(todo, index) in towatchFiltered" :key="todo.id" :searchMovieTitle="searchMovieTitle" class="towatch-item">
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
      <div>{{ remaining }} movies</div>
    </div>

    <div class="extra-container extra-container--filters">
      <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Queue</button>
        <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
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
import firebase from 'firebase';
import $ from 'jquery';
// import { bus } from '../main';
export default {
  name: 'towatch-list',
  props: ['movieListTitle'],
  // created() {
  //   this.searchMovieTitle = this.movieListTitle;
  // },
  data () {
    return {
      newTowatch: '',
      idForToWatch: 1,
      // idForSearchMovieTitle: 1,
      beforeEditCache: '',
      filter: 'all',
      searchMovieTitle: this.movieListTitle,
      todos: [
        // {
        //   'id': 1,
        //   'title': 'Incredibles 2',
        //   'completed': false,
        //   'editing': false,
        // },
        // {
        //   'id': 2,
        //   'title': 'Jurassic World',
        //   'completed': false,
        //   'editing': false,
        // },
      ],
    }
  },
  watch: {
    movieListTitle: function () {
      this.searchMovieTitle = this.movieListTitle;

      this.todos.push({
        title: this.searchMovieTitle,
        completed: false,
        id: this.idForToWatch,
      })
      this.searchMovieTitle = ''
      this.idForToWatch++
    }
  },
  created() {
    if(this.searchMovieTitle.trim().length == 0){
      return
    }

    this.todos.push({
      title: this.searchMovieTitle,
      completed: false,
      id: this.idForToWatch,
    })
    this.searchMovieTitle = ''
    this.idForToWatch++
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
    },
  }
}
</script>

<style lang="scss">
  .watch-list-form {
    width: 40%;
    // min-width: 400px;
    display: inline-block;
    background: #F9F9F9;
    padding: 69px 40px 0;
    right: 0;
    position: absolute;
    bottom: 0;
    top: 0;


    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: #C3C3C3;
    }
    ::-moz-placeholder { /* Firefox 19+ */
      color: #C3C3C3;
    }
    :-ms-input-placeholder { /* IE 10+ */
      color: #C3C3C3;
    }
    :-moz-placeholder { /* Firefox 18- */
      color: #C3C3C3;
    }

    @media only screen and (max-width: 768px) {
      display: block;
      width: 100%;
      position: relative;
      bottom: 0;
      padding-top: 40px;
      background: #F9F9F9;
      padding: 69px 40px 0;
      height: 100%;
    }
    h1 {
      color: #262626;
    }
  }
  .towatch-input {
    color: #262626;
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    background: transparent;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid #4D6AEB;
    border-radius: 0;

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
    color: #C3C3C3;
    &:hover {
      color: #000000;
    }
  }
  .towatch-item-left {
    display: flex;
    align-items: center;
  }
  .towatch-item-label {
    padding: 10px;
    margin-left: 12px;
    color: #262626;
      &:focus {
        outline: 0;
      }
    }
  .towatch-item-edit {
    font-size: 14px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100;
    background: transparent;
    border-top: none;
    border-right: none;
    border-left: none;
    padding: 10px;

    &:focus {
      outline: 0;
    }
  }
  .completed {
    text-decoration: line-through;
    color: #4D6AEB;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid #4D6AEB;
    padding-top: 14px;
    margin-bottom: 14px;
    color: #4D6AEB;

    &--filters {
      button {
        color: #262626;
        &:hover {
          color: #000000;
        }
      }
    }
  }

  button {
    font-size: 14px;
    background-color: transparent;
    appearance: none;
    border: none;
    padding: 1px 0;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
      color: #c3c3c3;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    color: #262626 !important;
    border-bottom: 1px solid #262626;
  }

  // .fade-enter-active, .fade-leave-active {
  //   transition: opacity .2s;
  // }
  // .fade-enter, .fade-leave-to {
  //   opacity: 0;
  // }

</style>
