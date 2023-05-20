<template>
  <div id="Chat" :class="type">
    <div id="Icon"></div>
    <div id="Balloon" :class="'B' + index">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Chat_Add",
  props: ['type', 'message', 'index']
}
</script>

<style>
/* 채팅 한 덩어리 */
#Chat {
  height: 50px;
  margin: 20px;
  display: flex;
  align-items: end;
  height: auto;
}

/* 채팅프로필 */
#Icon {
  width: 33px;
  height: 33px;
  border-radius: 100%;
  min-width: 33px;
}

/* 말풍선 */
#Balloon {
  float: left;
  padding: 10px 15px 10px 15px;
}

/* -----봇 말풍선----- */
.BotChat {
  float: left;
  width: 90%;
}

.BotChat>#Icon {
  background-color: #ffffff;
  border: 1px solid #0091ff;
}

.BotChat>#Balloon {
  margin-left: 15px;
  background: #ffffff;
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.15);
  border-radius: 20px 20px 20px 0;
  color: #0091ff;
}

/* -----내 말풍선----- */
.MyChat {
  justify-content: end;
  flex-direction: row-reverse;
  float: right;
  width: 90%;
}

.MyChat>#Balloon {
  margin-right: 15px;
  background: #0091ff;
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.15);
  border-radius: 20px 20px 0 20px;
  color: white;
}

.MyChat>#Icon {
  background-color: #0091ff;
  border: 1px solid #ffffff;
}
</style>
