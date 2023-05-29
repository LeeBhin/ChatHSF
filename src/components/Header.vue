<template>
    <header>
        <!-- 뒤로가기 버튼 자리 -->

        <div id="Header-Mid">
            <div id="BotName">봇이름</div>
            <div id="SchName">학교명</div>
        </div>

        <!-- 봇 프로필 자리 -->
    </header>
</template>

<script>
export default {
    name: 'Chat_Header'
}
</script>

<style>
header {
    height: 10vh;
    align-items: center;
    display: flex;
    box-shadow: 0 0 30px -20px rgba(0, 145, 255);
    background-color: white;
}

/* 봇 이름, 학교 이름 wrap */
#Header-Mid {
    margin: 0 auto;
    text-align: center;
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
</style>