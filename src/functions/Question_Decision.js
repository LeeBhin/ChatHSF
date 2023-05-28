import { BotChat } from "./Chat_Functions"
import { not_Exist } from "./Bot_Comment/List_Comment"

import { SchInfo } from "./Sch_Info"

import { SchList } from "./Sch_List"

import { List_Comment } from "./Bot_Comment/List_Comment"

import { printDuplicates } from "./Sch_Info"
import { info_Print } from "./Sch_Info"

function Decision(vm, Question) {
    var CrrSchool = SchInfo(Question)

    var extractedSCHULNMs = printDuplicates(CrrSchool).map(({ SCHUL_NM }) => SCHUL_NM);
    var extractedRDNDAs = printDuplicates(CrrSchool).map(({ SCHUL_RDNDA }) => SCHUL_RDNDA);

    if (CrrSchool != null && Question.split(' ').length == 1) {
        if (extractedSCHULNMs.length > 1) {
            BotChat(vm, SchInfo(Question) + '는 전국에 ' + extractedSCHULNMs.length + '개가 있습니다. 아래에서 번호를 골라주세요.')

            var Slct = ''
            for (let i = 0; i < extractedRDNDAs.length; i++) {
                Slct += (`${i + 1}. ${extractedRDNDAs[i]}\n`);
            }

            BotChat(vm, Slct)
        } else {
            BotChat(vm, info_Print(CrrSchool))
        }
    }

    else if (SchList(Question).List != '') {
        BotChat(vm, List_Comment(SchList(Question)))
    } else {

        BotChat(vm, not_Exist())
    }
}

export { Decision }