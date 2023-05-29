import { BotChat } from "./Chat_Functions"
import { not_Exist } from "./Bot_Comment/List_Comment"
import { SchInfo, detail_InfoC, info_PrintC } from "./Sch_Info"
import { SchList } from "./Sch_List"
import { List_Comment } from "./Bot_Comment/List_Comment"
import { printDuplicates } from "./Sch_Info"
import { info_Print, detail_Info } from "./Sch_Info"
import { All_Info } from "@/assets/data"

var DoubleSch = false
function Decision(vm, Question) {
    if (!DoubleSch) {
        try {
            var CrrSchool = SchInfo(Question);
            document.getElementById('SchName').innerText = CrrSchool

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
                    DoubleSch = true
                } else {
                    var S = info_Print(CrrSchool).length
                    BotChat(vm, info_Print(CrrSchool))
                    setTimeout(() => {
                        BotChat(vm, detail_Info(CrrSchool))
                    }, S * 2);
                }
            } else if (SchList(Question).List != '') {
                BotChat(vm, List_Comment(SchList(Question)))
                BotChat(vm, SchList(Question).List)
            } else {
                BotChat(vm, not_Exist())
            }
        } catch (error) {
            if (SchList(Question).List != '') {
                BotChat(vm, List_Comment(SchList(Question)))
                BotChat(vm, SchList(Question).List)
            } else {
                BotChat(vm, not_Exist())
            }
        }
    } else {
        //마지막 요소 선택
        var elements = document.querySelectorAll(".BotChat");
        var lastElement = elements[elements.length - 1];
        var arr = lastElement.innerText.split('\n')

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].includes(Question.toString())) {
                var jsonArr = All_Info
                var sch = arr[i].replace(/[0-9.]/g, "").trim();

                var schulCode = null; // SCHUL_CODE 값을 저장할 변수

                for (var j = 0; j < jsonArr.length; j++) {
                    if (jsonArr[j].SCHUL_RDNDA === sch) {
                        schulCode = jsonArr[j].SCHUL_CODE;
                        break;
                    }
                }
                var S2 = info_PrintC(schulCode).length
                BotChat(vm, info_PrintC(schulCode))
                setTimeout(() => {
                    BotChat(vm, detail_InfoC(schulCode))
                }, S2 * 2);

                DoubleSch = false
            }
        }
    }
}

export { Decision }