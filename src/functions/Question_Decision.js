import { BotChat } from "./Chat_Functions"
import { not_Exist } from "./Bot_Comment/List_Comment"

// import { SchInfo } from "./Sch_Info"

import { SchList } from "./Sch_List"

import { List_Comment } from "./Bot_Comment/List_Comment"

function Decision(vm, Question) {

    var Question_split = Question.split(' ')

    var array = Question_split.filter(Boolean); //공백 제거

    var String = (SchList(array).List)
    if (String == '') {
        BotChat(vm, not_Exist())
    } else {
        BotChat(vm, List_Comment(SchList(array)))
        BotChat(vm, String)
    }
}

export { Decision }