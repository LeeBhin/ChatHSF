import { BotChat } from "./Chat_Functions"

import { SchInfo } from "./Sch_Info"
import { SchList } from "./Sch_List"

function Decision(vm, Question) {

    var Question_split = Question.split(' ')

    if (Question_split.includes('비교') || Question_split.includes('차이')) {
        // 학교 비교()
    }

    var Question_length = Question_split.length

    if (Question_length == 1) {
        // BotChat(vm, SchInfo(Question_split))
        console.log(SchInfo(Question_split))

    } else if (Question_length >= 2) {
        var Answer = [0, 1]
        var AnswerIndex = Math.floor(Math.random() * Answer.length)
        if (Answer[AnswerIndex] == 0) {
            BotChat(vm, RandomComment() + '\n' + RandomComment2() + Question_split.slice(0, Question_split.length - 1).join(" ") + RandomComment3() + Question_split.slice(-1) + RandomComment4() + '\n\n' + SchList(Question_split))
        } else {
            BotChat(vm, RandomComment() + '\n' + Question_split.slice(0, Question_split.length - 1).join(" ") + RandomComment3() + Question_split.slice(-1) + RandomComment0() + '\n\n' + SchList(Question_split))
        }
    }
}

function RandomComment0() {
    var comments = ['를 알려드릴게요.', '를 알려드리겠습니다.','는 다음과 같습니다.']
    
    var random = Math.floor(Math.random() * comments.length)
    return comments[random]
}

function RandomComment() {
    var comments = ['좋습니다!', '좋아요!', '알겠어요!', '알겠습니다!', '알았어요!', '넵!']
    var random = Math.floor(Math.random() * comments.length)
    return comments[random]
}

function RandomComment2() {
    var comments = ['다음은 ', '아래는 ']
    var random = Math.floor(Math.random() * comments.length)
    return comments[random]
}

function RandomComment3() {
    var comments = ['에 있는 ', '의 ', '에 위치한 ', ' 지역에 있는 ', ' 지역에 위치한 ', ' 지역의 ', '에 위치해 있는 ']
    var random = Math.floor(Math.random() * comments.length)
    return comments[random]
}

function RandomComment4() {
    var comments = ['입니다.', ' 목록입니다.', ' 리스트입니다.', '에요.', ' 목록이에요.', ' 리스트에요.']
    var random = Math.floor(Math.random() * comments.length)
    return comments[random]
}

export { Decision }