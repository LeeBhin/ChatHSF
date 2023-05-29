<template>
    <footer>
        <div id="SearchBar">
            <input type="text" id="Search" placeholder="채팅하여 질문하기" @keyup.enter="handleEnter" v-model="inputValue"
                autoComplete="off" />
            <div id="SendBtn">
                <!-- 전송 버튼 -->
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Chat_Footer',
    data() {
        return {
            inputValue: ''
        };
    },
    methods: {
        handleEnter() {
            this.$emit('enter', this.inputValue);
        }
    }
};
</script>

<style>
footer {
    background: rgba(245, 250, 255, 0.4);
    padding-top: 1vh;
}

#SearchBar {
    background: #ffffff;
    box-shadow: 0px 0px 8px 2px rgba(0, 145, 255, 0.3);
    border-radius: 100px;
    width: 67vw;
    margin: 0 auto;
    padding: 20px 30px 20px 30px;
}

/* input */
#Search {
    font-size: 20px;
    border: none;
    color: #0091ff;
    width: 95%;
}

#Search::placeholder {
    color: rgba(0, 145, 255, 0.59);
}

input:focus {
    outline: none;
}

input {
    touch-action: manipulation;
}
</style>