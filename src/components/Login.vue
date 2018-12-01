<template lang="html">
  <div class="background-container">
    <div class="login box box-shadow-effect">
      <h3 class="login__header">Sign In</h3>
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <button v-on:click="signIn">Login</button>
      <p>Create an account <router-link to="/sign-up" class="link">here</router-link></p>
    </div>
  </div>

</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    // login: function() {
    //   this.$router.replace('/')
    // }
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home');
        },
        (err) => {
          alert('Oops. ' + err.message);
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">

  .background-container {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    height: 230px;
    background: #2E2E2E;
  }
  .login {
    margin: 40px auto;
    text-align: center;
    padding: 60px 0;
    width: 600px;
    background: #FFFFFF;
    @media only screen and (max-width: 768px) {
      width: 80%;
    }
    &__header {
      font-size: 24px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #636363;
      @media only screen and (max-width: 425px) {
        font-size: 20px;
      }
    }
  }
  input {
    width: 300px;
    padding: 10px 18px;
    font-size: 18px;
    margin: 15px 0 0 0;
    background: #ffffff;
    border: 2px solid #C3C3C3;
    border-radius: 3px;
    border-style:solid;
    @media only screen and (max-width: 768px) {
      width: 50%;
    }
    @media only screen and (max-width: 425px) {
      width: 80%;
    }

    &:focus {
      outline: 0;
    }
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
  button {
    margin-top: 20px;
    // width: 10%;
    cursor: pointer;
    color: #ffffff;
    background: #C3C3C3;
    border: none;
    outline: none;
    padding: 7px 5px;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 3px;
    font-size: 12px;

    &:hover {
      border: none;
      background: #4D6AEB;
      color: #ffffff;
    }
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
  .link {
    text-decoration: none;
    color: #636363;
    font-weight: bold;
    &:hover {
      color: #9BADFC;
      font-weight: bold;
    }
  }
  .box-shadow-effect
  {
      position:relative;
      -webkit-box-shadow:0 0px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.05) inset;
         -moz-box-shadow:0 0px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.05) inset;
              box-shadow:0 0px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.05) inset;
  }
  .box-shadow-effect:before, .box-shadow-effect:after
  {
      content:"";
      position:absolute;
      z-index:-1;
      -webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);
      -moz-box-shadow:0 0 20px rgba(0,0,0,0.8);
      box-shadow:0 0 20px rgba(0,0,0,0.8);
      top:0;
      bottom:0;
      left:10px;
      right:10px;
      -moz-border-radius:100px / 10px;
      border-radius:100px / 10px;
  }
  .box-shadow-effect:after
  {
      right:10px;
      left:auto;
      -webkit-transform:skew(8deg) rotate(3deg);
         -moz-transform:skew(8deg) rotate(3deg);
          -ms-transform:skew(8deg) rotate(3deg);
           -o-transform:skew(8deg) rotate(3deg);
              transform:skew(8deg) rotate(3deg);
  }
  input[type="password"] {
    color: #4D6AEB;
  }
</style>
