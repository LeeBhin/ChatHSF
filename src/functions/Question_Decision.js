import { BotChat } from "./Chat_Functions"
import { not_Exist } from "./Bot_Comment/List_Comment"

// import { SchInfo } from "./Sch_Info"

import { SchList } from "./Sch_List"

import { List_Comment } from "./Bot_Comment/List_Comment"

function Decision(vm, Question) {

    if (SchList(Question).List != '') {
        BotChat(vm, List_Comment(SchList(Question)))
        BotChat(vm, SchList(Question).List)
    } else {
        BotChat(vm, not_Exist())
    }
}

export { Decision }