import { BotChat } from "./Chat_Functions"
import { not_Exist } from "./Bot_Comment/List_Comment"
import { SchInfo, detail_InfoC, info_PrintC } from "./Sch_Info"
import { SchList } from "./Sch_List"
import { List_Comment } from "./Bot_Comment/List_Comment"
import { printDuplicates } from "./Sch_Info"
import { info_Print, detail_Info } from "./Sch_Info"
const allinfo = localStorage.getItem('schinfo');
const All_Info = JSON.parse(allinfo)

var DoubleSch = false
function Decision(vm, Question) {

    if (Question == '!업데이트') {
        localStorage.removeItem('schinfo');
        localStorage.removeItem('stdnt');
        localStorage.removeItem('lastUpdated');
        window.location.reload();
    }

    const schinfo = localStorage.getItem('schinfo');

    if (!schinfo) {
        BotChat(vm, '데이터 로딩중입니다... 잠시만 기다려주세요!\n(데이터 갱신은 일주일에 한 번 한답니다)')
    }

    else if (!DoubleSch) {
        var CrrSchool = SchInfo(Question);
        document.getElementById('SchName').innerText = CrrSchool

        var extractedSCHULNMs = printDuplicates(CrrSchool).map(({ SCHUL_NM }) => SCHUL_NM);
        var extractedRDNDAs = printDuplicates(CrrSchool).map(({ SCHUL_RDNDA }) => SCHUL_RDNDA);

        if (CrrSchool != null && Question.split(' ').filter(Boolean).length == 1) {
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
        } else if (schinfo(Question) == 1) {
            BotChat(vm, not_Exist())
        } else {
            //마지막 요소 선택(중복)
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