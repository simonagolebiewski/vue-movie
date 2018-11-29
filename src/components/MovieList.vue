<template>
  <body>
    <div class="movie-list-container">
      <a class="logout-button" v-on:click="logout" v-if="user">Logout</a>
      <div class="movie-list-container__user">Hello, {{email}}!</div>
      <form id="lead-form" @submit.prevent="processForm" v-on:submit: @submit>
              <h1>Find a movie</h1>
              <div>
                <div>
                  <input type="text" class="form-control search-input" placeholder="Enter a movie title &amp; press enter" v-model="findMovie">
                  <!-- <div class="submit-button">
                    <button id="submit-form"><font-awesome-icon icon="search" /></button>
                  </div> -->
                  <div class="movie-info">
                    <span class="movie-info__title">{{movieInfoResults.Title}} </span>
                    <span class="movie-info__year">{{movieInfoResults.Year}}</span>
                    <span v-if="movieInfoResults.Genre" class="movie-info__genre">
                      <h1>Genre:</h1>
                      {{movieInfoResults.Genre}}
                    </span>
                    <span v-if="movieInfoResults.imdbRating" class="movie-info__rating">
                      <h1>Rating:</h1>
                      {{movieInfoResults.imdbRating}}
                    </span>
                    <span v-if="movieInfoResults.Plot" class="movie-info__plot">
                      <h1>Description:</h1>
                      {{movieInfoResults.Plot}}
                    </span>
                    <span v-if="movieInfoResults.Production" class="movie-info__production">
                      <h1>Producer:</h1>
                      {{movieInfoResults.Production}}
                    </span>
                  </div>
                </div>
              </div>
              <!-- <div>
                <div>
                  <button id="submit-form">Submit</button>
                </div>
              </div> -->
              <button v-if="showAddToMovieListButton" @click="addToMovieList" id="addMovieToList">Add to List</button>
      </form>
      <towatch-list :movieListTitle="movieListTitle"></towatch-list>
    </div>
  </body>
</template>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="crossorigin="anonymous"></script>
<script type="text/javascript">
import TowatchList from './TowatchList';
import axios from 'axios';
import firebase from 'firebase';
import $ from 'jquery';

export default {
      components: {
        TowatchList
      },
      name: 'movie-list',
      data () {
        return {
          // info: '',
          findMovie: '',
          movieInfoResults: '',
          userId: '',
          name: '',
          email: '',
          user: {},
          movieListTitle: ''
        }
      },
      watch: {
       findMovie: function() {
         this.movieInfoResults = ''
         if (this.findMovie.length >= 0) {
           this.lookupfindMovie()
         }
       },
     },
     created() {
        this.user = firebase.auth().currentUser;
        if(this.user) {
          this.name = this.user.displayName;
          this.email = this.user.email;
          this.photo = this.user.photoURL;
          this.userId = this.user.uid;
        }
      },
       computed: {
         showAddToMovieListButton(){
           if (this.findMovie.length > 0){
             return this.movieInfoResults;
           }
         },
         user () {
           return this.$store.getters.getUser;
         }
       },
       methods: {
        lookupfindMovie: function() {
          app.movieInfoResults = "Searching..."
        },
        processForm: function() {
          var app = this
          axios.get('http://www.omdbapi.com/?t=' + app.findMovie + '&r=json&tomatoes=true' + '&apikey=991cf08e')
                .then(function (response) {
                  // app.movieInfoResults = response.data.Title + ' , ' + response.data.Year + '. ' + response.data.Plot + ' Genre: ' + response.data.Genre + ' IMDB rating: ' + response.data.imdbRating + ' Production: ' + response.data.Production
                    // app.movieInfoResults.Title = response.data.Title;
                    app.movieInfoResults = response.data;
                })
                .catch(function (error) {
                  app.movieInfoResults = "Not a movie";
                })
        },
        addToMovieList: function(todo) {
          this.movieListTitle = this.movieInfoResults.Title;
        },
        logout: function() {
          firebase.auth().signOut().then(() => {
            this.$router.replace('login');
          })
        }
      },
    }


</script>
<style lang="scss">
  .movie-list-container {
    margin: 0 auto;
    background: #2E2E2E;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
    width: 100%;

    &__user {
      color: #ffffff;
      margin-top: 20px;
      padding-left: 40px;
    }
  }
  #lead-form {
    width: 60%;
    display: inline-block;
    background: #2E2E2E;
    padding: 40px 40px 0 40px;
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: #e0e0e0;
    }
    ::-moz-placeholder { /* Firefox 19+ */
      color: #e0e0e0;
    }
    :-ms-input-placeholder { /* IE 10+ */
      color: #e0e0e0;
    }
    :-moz-placeholder { /* Firefox 18- */
      color: #e0e0e0;
    }

    @media only screen and (max-width: 768px) {
      display: block;
      width: 100%;
      height: 60%;
      position: absolute;
      top: 0;
      bottom: 40%;
    }

    h1 {
      color: #4D6AEB;
    }
  }
  .movie-info {
    color: #FFFFFF;
  }
  .search-input {
    color: #FFFFFF;
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    background: transparent;
    border: 2px solid #4D6AEB;
    background: url(../assets/search-icon.svg) no-repeat transparent scroll 10px 10px;
    padding: 10px 10px 10px 40px;

    &:focus {
      outline: 0;
    }
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    border: none;
    padding: 3px 6px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
  .submit-button {
    display: inline-block;
    vertical-align: middle;
    button {
      margin-left: 15px;
    }
  }
  #submit-form {
    position: relative;
    bottom: 3px;
    height: 46px;
    right: 5px;
    color: #ffffff;
    background: transparent;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;

    &:hover {
      color: #4D6AEB;
      transition: color .3s;
    }
  }
  .movie-info {

    h1 {
      display: inline-block;
      color: white;
      font-size: 16px !important;
      letter-spacing: 1.5px;
      margin: 5px 0;
    }

    &__title {
      font-size: 22px;
      margin: 5px 0;
      @media only screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
    &__year {
      font-size: 22px;
      margin: 5px 0;
      @media only screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
    &__genre {
      display: block;
      font-size: 16px;
      margin: 5px 0;
      @media only screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
    &__rating {
      display: block;
      font-size: 16px;
      margin: 5px 0;
      @media only screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
    &__plot {
      display: block;
      font-size: 16px;
      margin: 5px 0;
      @media only screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
    &__production {
      display: block;
      font-size: 16px;
      margin: 5px 0;
      @media only screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
  }
  #addMovieToList{
    margin-top: 10px;
    float: right;
    color: white;
    border: 1px solid white;
    padding: 10px;
    @media only screen and (max-width: 768px) {
      padding: 8px;
      font-size: 12px;
    }
    &:hover {
      color: #4D6AEB;
      border: 1px solid #4D6AEB;
      transition: color .3s;
    }

  }
  .logout-button {
    cursor: pointer;
    padding: 5px;
    position: absolute;
    right: 20px;
    color: black;
    z-index: 1;
    font-size: 14px;
    margin-top: 10px;
    &:hover {
      color: #4D6AEB;
    }

    @media only screen and (max-width: 768px) {
      color: #FFFFFF;
    }
  }
</style>
