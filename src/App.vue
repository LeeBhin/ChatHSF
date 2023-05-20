<template>
  <div id="Wrap">
    <Chat_Header />

    <!-- 채팅 말풍선 추가 -->
    <div id="ChatPage" ref="ScrollPage">
      <Chat_Add v-for="(chat, index) in chats" :key="chat.id" :type="chat.type" :message="chat.message" :index="index" />
    </div>

    <Chat_Footer :inputValue="inputValue" @enter="handleEnter" />

  </div>
</template>

<script>
// ---- 컴포넌트 ----
import Chat_Header from './components/Header.vue';
import Chat_Add from './components/Chat.vue';
import Chat_Footer from './components/Footer.vue';

// ---- 함수 ----
import { EnterEvent, scrollBottom } from './functions/Chat_Functions';
export default {
  name: 'App',

  data() {
    return {
      chats: [],
      inputValue: '',
      isChat: false
    }
  },

  watch: {
    chats: {
      handler() {
        this.$nextTick(() => {
          scrollBottom(this);
        });
      },
      deep: true
    }
  },

  components: {
    Chat_Add,
    Chat_Header,
    Chat_Footer
  },

  methods: {
    handleEnter(value) {
      EnterEvent(this, value);
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#Wrap {
  background: rgba(245, 250, 255, 0.4);
  width: 100vw;
  height: 100vh;
}

/* 봇이름 */
#BotName {
  font-weight: bold;
  font-size: 25px;
  color: #0091ff;
}

/* 학교 이름 */
#SchName {
  font-size: 15px;
  color: rgba(0, 145, 255, 0.6);
}

#ChatPage {
  height: 80%;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* 스크롤바 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(245, 250, 255, 0.4);
}

::-webkit-scrollbar-thumb {
  background-color: #0091ff;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #0075ce;
}
</style>
