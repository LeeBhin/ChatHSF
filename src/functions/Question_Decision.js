import { BotChat } from "./Chat_Functions"

import { SchInfo } from "./Sch_Info"

import { SchList } from "./Sch_List"

function Decision(vm, Question) {

    var Question_split = Question.split(' ')

    var array = Question_split.filter(Boolean); //공백 제거

    if (Question_split.length == 1) {
        SchInfo(array[0])
    }
    else if (Question_split.length > 1) {
        BotChat(vm, SchList(array))
    }

}

export { Decision }