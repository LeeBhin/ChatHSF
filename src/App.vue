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

import axios from 'axios';

const schinfo = localStorage.getItem('schinfo');
const stdnt = localStorage.getItem('stdnt');
const lastUpdated = localStorage.getItem('lastUpdated');
const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

if (!schinfo || !stdnt || !lastUpdated || new Date().getTime() - parseInt(lastUpdated) >= oneWeekInMilliseconds) {  //스토리지에 데이터가 없거나 마지막으로 저장한지 일주일이 지났다면
  axios.get('/.netlify/functions/api')
    .then(function (response) {
      const data = response.data;
      const schinfo = data[0].list;
      const stdnt = data[1].list;
      const currentTime = new Date().getTime();

      localStorage.setItem('schinfo', JSON.stringify(schinfo));
      localStorage.setItem('stdnt', JSON.stringify(stdnt));
      localStorage.setItem('lastUpdated', currentTime.toString());
      window.location.reload();
    })
    .catch(function (error) {
      alert('오류가 발생했습니다. 새로고침해주세요.\n' + error)
    });
}

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
  height: 100dvh;
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

/* 반응형 */
@media (max-width: 800px) {

  header {
    height: 8vh;
  }

  /* 봇이름 */
  #BotName {
    font-weight: bold;
    font-size: 20px;
    color: #0091ff;
  }

  /* 학교 이름 */
  #SchName {
    font-size: 10px;
    color: rgba(0, 145, 255, 0.6);
  }

  #Search {
    width: 90%;
    font-size: 15px;
  }

  #SearchBar {
    padding: 10px 20px 10px 20px;
  }

  #SendImg {
    width: 15px;
  }

  #Icon {
    width: 23px;
    height: 23px;
    min-width: 23px;
    min-height: 23px;
  }

  #Balloon {
    font-size: 13px;
    padding: 8px 13px 8px 13px;
  }

  .BotChat>#Balloon {
    margin-left: 10px;
  }

  .MyChat>#Balloon {
    margin-right: 10px;
  }

  .BotChat {
    width: 80%;
  }

  .MyChat {
    width: 80%;
  }
}
</style>
