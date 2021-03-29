<template>
  <div class="wrapper">
    <header>
      <h1>Ms23</h1>
      <button @click="logout">Logout!</button>
    </header>

    <section>
      <main>
        <div v-for="(msg, index) in messages" v-bind:key="'index-'+index"
             :class="['message', sentOrReceived(msg.userUID)]">
          <img :src="msg.photoURL" :alt="msg.displayName">
          <p>{{ msg.text }}</p>
        </div>

        <div ref="scrollable"></div>
      </main>

      <form v-on:submit.prevent="sendMessage">
        <input v-model="message" type="text" placeholder="Enter your message!">
        <button :disabled="!message" type="submit"> send </button>
      </form>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  mounted() {
    this.db.collection('messages').orderBy('createdAt')
        .onSnapshot(querySnap => {
          this.messages = querySnap.docs.map(doc => doc.data())
        })
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
      message: '',
      messages: [],
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
    },
    sentOrReceived(userUID) {
      return userUID === this.user.uid ? 'sent' : 'received'
    },
    async sendMessage() {

      const messageInfo = {
        'userUID': this.user.uid,
        'displayName': this.user.displayName,
        'photoURL': this.user.photoURL,
        'text': this.message,
        'createdAt': Date.now(),
      }

      await this.db.collection('messages').add(messageInfo)

      this.message = ''
      this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
    background-color: rgb(255, 255, 255);
  }

  .wrapper {
    text-align: center;
    max-width: 728px;
    margin: 0 auto;

    header {
      background-color: #292929;
      height: 10vh;
      min-height: 50px;
      color: rgb(255, 255, 255);
      position: fixed;
      width: 100%;
      max-width: 728px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 99;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 10px;
    }

    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 100vh;
      background-color: rgb(12, 12, 12);

      main {
        padding: 10px;
        height: 75vh;
        margin: 10vh 0 10vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;

        &::-webkit-scrollbar {
          width: 0.25rem;
        }

        &::-webkit-scrollbar-track {
          background: #000000;
        }

        &::-webkit-scrollbar-thumb {
          background: #838188;
        }
      }

      form {
        height: 10vh;
        position: fixed;
        bottom: 0;
        background-color: rgb(14, 13, 13);
        width: 100%;
        max-width: 728px;
        display: flex;
        font-size: 1.5rem;

        button {
          width: 20%;
          background-color: rgb(27, 27, 185);
        }

        input {
          line-height: 1.5;
          width: 100%;
          font-size: 1.5rem;
          background: rgb(8, 8, 8);
          color: white;
          outline: none;
          border: 5px;
          border-color: #838188;
          border-radius: 10px;
          padding: 0 10px;
        }
      }
    }

    button {
      background-color: #0b93f6; /* Green */
      border: 5px;
      border-radius: 10px;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
      font-size: 1.25rem;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    button, input {
      color: #fff;
      border: none;
    }

    p {
      max-width: 500px;
      margin-bottom: 12px;
      line-height: 24px;
      padding: 10px 20px;
      border-radius: 25px;
      position: relative;
      color: white;
      text-align: center;
    }

    .message {
      display: flex;
      align-items: center;

      &.received {
        p {
          background: #464646;
          color: rgb(255, 255, 255);
        }
      }

      &.sent {
        flex-direction: row-reverse;

        p {
          color: #fff;
          background: #0b93f6;
          align-self: flex-end;
        }
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 2px 5px;
      }

      p {
        max-width: 500px;
        margin-bottom: 12px;
        line-height: 24px;
        padding: 10px 20px;
        border-radius: 25px;
        position: relative;
        color: #fff;
        text-align: center;
      }


    }
  }

</style>