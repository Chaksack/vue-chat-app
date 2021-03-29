import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false


// NOTE: PASTE YOUR OWN CONFIG HERE!

const firebaseConfig = {
  apiKey: "AIzaSyBWZnT-NEosqS4L6KZboBB82dO6cIE6AzQ",
  authDomain: "ms23-chatapp.firebaseapp.com",
  projectId: "ms23-chatapp",
  storageBucket: "ms23-chatapp.appspot.com",
  messagingSenderId: "157492556276",
  appId: "1:157492556276:web:4a8bac702c57ab442f49a1",
  measurementId: "G-7MXVR74YLL"
};

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => new Vue({
  render: h => h(App),
}).$mount('#app'))


