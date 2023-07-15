const allinfo = localStorage.getItem('schinfo');
const All_Info = JSON.parse(allinfo)

const stdnt = localStorage.getItem('stdnt');
const Student_number = JSON.parse(stdnt)

function SchNm() {
    return All_Info.map(item => item.SCHUL_NM);
}

function Stdnt(School) {
    return Student_number
        .filter(item => item.SCHUL_NM === School)
        .map(({ COL_MSUM, COL_WSUM, SCHUL_NM }) => ({ COL_MSUM, COL_WSUM, SchNm: SCHUL_NM }));
}

function StdntC(School) {
    return Student_number
        .filter(item => item.SCHUL_CODE === School)
        .map(({ COL_MSUM, COL_WSUM, SCHUL_NM }) => ({ COL_MSUM, COL_WSUM, SchNm: SCHUL_NM }));
}

function SchInfo(inputString, stringList) {

    if (inputString.length < 3) {
        return 1;
    }

    stringList = SchNm()
    let bestMatch = null;
    let bestMatchScore = 0;

    for (let i = 0; i < stringList.length; i++) {
        const currentString = stringList[i];
        let matchCount = 0;

        // 세 글자 이상 일치 여부 확인
        if (currentString.length < 3) {
            continue;
        }

        // 일치하는 글자 수 계산
        for (let j = 0; j < inputString.length; j++) {
            if (currentString.includes(inputString[j])) {
                matchCount++;
            }
        }

        // 가장 비슷한 요소인지 확인
        if (matchCount > bestMatchScore) {
            bestMatch = currentString;
            bestMatchScore = matchCount;
        } else if (matchCount === bestMatchScore) {
            // 글자 순서 비교하여 더 비슷한 요소 선택
            let bestMatchChars = bestMatch.split('');
            let currentChars = currentString.split('');
            let inputChars = inputString.split('');

            let bestMatchDiff = 0;
            let currentDiff = 0;

            for (let k = 0; k < inputChars.length; k++) {
                if (bestMatchChars[k] !== inputChars[k]) {
                    bestMatchDiff++;
                }

                if (currentChars[k] !== inputChars[k]) {
                    currentDiff++;
                }
            }

            if (currentDiff <= bestMatchDiff) {
                bestMatch = currentString;
                bestMatchScore = matchCount;
            }
        }
    }

    return bestMatch;
}

function printDuplicates(Sch) {
    return All_Info
        .filter(item => item.SCHUL_NM === Sch)
        .map(({ SCHUL_NM, SCHUL_RDNDA, SCHUL_CODE }) => ({ SCHUL_NM, SCHUL_RDNDA, SCHUL_CODE }));
}

function info_Print(School) {
    const schoolData = All_Info.find(item => item.SCHUL_NM === School);
    const gdM = schoolData.COEDU_SC_CODE === '남' ? '남자고등학교' : schoolData.COEDU_SC_CODE === '녀' ? '여자고등학교' : '남녀공학';
    const birth = schoolData.FOND_YMD.substring(0, 4) + '년';

    return `*${schoolData.SCHUL_NM}^는 *${birth}^에 설립된 *${schoolData.FOND_SC_CODE}^ *${schoolData.HS_KND_SC_NM}^입니다.\n*${schoolData.ADRCD_NM}^에 위치해 있으며 *${gdM}^입니다.\n홈페이지 주소로 이동하려면 ㈜${schoolData.HMPG_ADRES}㈜을 클릭해주세요.`;
}

function detail_Info(School) {
    const schoolData = All_Info.find(item => item.SCHUL_NM === School);
    const MS = Stdnt(School)[0].COL_MSUM + '명'
    const WS = Stdnt(School)[0].COL_WSUM + '명'

    const Birth = date(schoolData.FOND_YMD)
    const Open = date(schoolData.FOAS_MEMRD)

    return `학교명: ${schoolData.SCHUL_NM}\n종류: ${schoolData.HS_KND_SC_NM}\n남녀 구분: ${schoolData.COEDU_SC_CODE}\n남학생 수: ${MS}\n여학생 수: ${WS}\n설립구분: ${schoolData.FOND_SC_CODE}\n설립유형: ${schoolData.SCHUL_FOND_TYP_CODE}\n설립일: ${Birth}\n개교기념일: ${Open}\n주소: ${schoolData.ADRES_BRKDN}\n도로명 주소: ${schoolData.SCHUL_RDNMA}\n우편번호: ${schoolData.ZIP_CODE}\n전화번호: ${schoolData.USER_TELNO}\n팩스번호: ${schoolData.PERC_FAXNO}\n홈페이지: ㉾${schoolData.HMPG_ADRES}㉾\n시도교육청: ${schoolData.ATPT_OFCDC_ORG_NM}\n주야구분: ${schoolData.DGHT_SC_CODE}\n`;
}

function info_PrintC(School) {
    const schoolData = All_Info.find(item => item.SCHUL_CODE === School);
    const gdM = schoolData.COEDU_SC_CODE === '남' ? '남자고등학교' : schoolData.COEDU_SC_CODE === '녀' ? '여자고등학교' : '남녀공학';
    const birth = schoolData.FOND_YMD.substring(0, 4) + '년';

    return `*${schoolData.SCHUL_NM}^는 *${birth}^에 설립된 *${schoolData.FOND_SC_CODE}^ *${schoolData.HS_KND_SC_NM}^입니다.\n*${schoolData.ADRCD_NM}^에 위치해 있으며 *${gdM}^입니다.\n홈페이지 주소로 이동하려면 ㈜${schoolData.HMPG_ADRES}㈜을 클릭해주세요.`;
}

function detail_InfoC(School) {
    const schoolData = All_Info.find(item => item.SCHUL_CODE === School);
    const MS = StdntC(School)[0].COL_MSUM + '명'
    const WS = StdntC(School)[0].COL_WSUM + '명'

    const Birth = date(schoolData.FOND_YMD)
    const Open = date(schoolData.FOAS_MEMRD)

    return `학교명: ${schoolData.SCHUL_NM}\n종류: ${schoolData.HS_KND_SC_NM}\n남녀 구분: ${schoolData.COEDU_SC_CODE}\n남학생 수: ${MS}\n여학생 수: ${WS}\n설립구분: ${schoolData.FOND_SC_CODE}\n설립유형: ${schoolData.SCHUL_FOND_TYP_CODE}\n설립일: ${Birth}\n개교기념일: ${Open}\n주소: ${schoolData.ADRES_BRKDN}\n도로명 주소: ${schoolData.SCHUL_RDNMA}\n우편번호: ${schoolData.ZIP_CODE}\n전화번호: ${schoolData.USER_TELNO}\n팩스번호: ${schoolData.PERC_FAXNO}\n홈페이지: ㉾${schoolData.HMPG_ADRES}㉾\n시도교육청: ${schoolData.ATPT_OFCDC_ORG_NM}\n주야구분: ${schoolData.DGHT_SC_CODE}\n`;
}

function date(date) {
    return date.substring(0, 4) + '년 ' + date.substring(4, 6) + '월 ' + date.substring(6) + '일'
}

export { SchInfo, printDuplicates, info_Print, detail_Info, info_PrintC, detail_InfoC }