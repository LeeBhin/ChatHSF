import { BotChat } from "./Chat_Functions"

import { SchInfo } from "./Sch_Info"
import { SchList } from "./Sch_List"

function Decision(vm, Question) {

    var Question_split = Question.split(' ')
    console.log(Question_split)

    if (Question_split.includes('비교') || Question_split.includes('차이')) {
        // 학교 비교()
    }

    var Question_length = Question_split.length

    if (Question_length == 1) {
        // BotChat(vm, SchInfo(Question_split))
        console.log(SchInfo(Question_split))

    } else if (Question_length >= 2) {
        BotChat(vm, RandomComment() + '\n' + RandomComment2() + Question_split.slice(0, Question_split.length - 1).join(" ") + RandomComment3() + Question_split.slice(-1) + RandomComment4() + '\n' + SchList(Question_split))
    }
}

function RandomComment() {
    var comments = ['좋습니다!', '좋아요!', '알겠어요!', '알겠습니다!', '알았어요!', '넵!']
    var random = Math.floor(Math.random() * comments.length)
    return comments[random]
}

function RandomComment2() {
    var comments2 = ['다음은 ', '아래는 ']
    var random2 = Math.floor(Math.random() * comments2.length)
    return comments2[random2]
}

function RandomComment3() {
    var comments3 = ['에 있는 ', '의 ', '에 위치한 ', ' 지역에 있는 ', ' 지역에 위치한 ', ' 지역의 ']
    var random3 = Math.floor(Math.random() * comments3.length)
    return comments3[random3]
}

function RandomComment4() {
    var comments4 = ['입니다.', ' 목록입니다.', ' 리스트입니다.', '에요.', ' 목록이에요.', ' 리스트에요.']
    var random4 = Math.floor(Math.random() * comments4.length)
    return comments4[random4]
}

export { Decision }