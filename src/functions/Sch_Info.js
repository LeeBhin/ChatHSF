import { All_Info, Student_number } from "@/assets/data";

function SchNm() {
    var jsonArray = All_Info
    const schulNmArray = jsonArray.map(item => item.SCHUL_NM);
    return schulNmArray
}

function Stdnt(School) {
    var jsonArray = Student_number;
    const extractedArray = jsonArray.filter(item => item.SCHUL_NM === School)
        .map(item => {
            return {
                COL_MSUM: item.COL_MSUM,
                COL_WSUM: item.COL_WSUM,
                SchNm: item.SCHUL_NM
            };
        });
    return extractedArray;
}

function StdntC(School) {
    var jsonArray = Student_number;
    const extractedArray = jsonArray.filter(item => item.SCHUL_CODE === School)
        .map(item => {
            return {
                COL_MSUM: item.COL_MSUM,
                COL_WSUM: item.COL_WSUM,
                SchNm: item.SCHUL_NM
            };
        });
    return extractedArray;
}

function SchInfo(inputString, stringList) {

    if (inputString.length < 3) {
        return null;
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

function printDuplicates(Sch) { //이름 중복 학교들 모음
    const targetSchulNM = Sch

    const extractedData = All_Info
        .filter(item => item.SCHUL_NM === targetSchulNM)
        .map(({ SCHUL_NM, SCHUL_RDNDA, SCHUL_CODE }) => ({ SCHUL_NM, SCHUL_RDNDA, SCHUL_CODE }));

    return extractedData
}

function info_Print(School) {
    var data = All_Info
    let 시도교육청, 시도교육청코드, 지역교육청, 지역교육청코드, 지역, 지역코드, 소재지구분코드;
    let 정보공시학교코드, 학교명, 학교급코드, 설립구분, 학교특성, 분교여부, 설립유형, 주야구분;
    let 개교기념일, 설립일, 법정동코드, 주소내역, 상세주소내역, 우편번호, 학교도로명우편번호;
    let 학교도로명주소, 학교도로명상세주소, 위도, 경도, 전화번호, 전화번호_교무실, 전화번호_행정실;
    let 팩스번호, 홈페이지주소, 남녀공학구분;

    // 데이터 배열을 순회하며 SCHUL_NM이 School과 일치하는 요소를 찾음
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.SCHUL_NM === School) {
            // SCHUL_NM이 일치하는 요소의 값들을 각각의 변수에 저장
            시도교육청 = item.ATPT_OFCDC_ORG_NM;//eslint-disable-line no-unused-vars
            시도교육청코드 = item.ATPT_OFCDC_ORG_CODE;//eslint-disable-line no-unused-vars
            지역교육청 = item.JU_ORG_NM;//eslint-disable-line no-unused-vars
            지역교육청코드 = item.JU_ORG_CODE;//eslint-disable-line no-unused-vars
            지역 = item.ADRCD_NM;//eslint-disable-line no-unused-vars
            지역코드 = item.ADRCD_CD;//eslint-disable-line no-unused-vars
            소재지구분코드 = item.LCTN_SC_CODE;//eslint-disable-line no-unused-vars
            정보공시학교코드 = item.SCHUL_CODE;//eslint-disable-line no-unused-vars
            학교명 = item.SCHUL_NM;//eslint-disable-line no-unused-vars
            학교급코드 = item.SCHUL_KND_SC_CODE;//eslint-disable-line no-unused-vars
            설립구분 = item.FOND_SC_CODE;//eslint-disable-line no-unused-vars
            학교특성 = item.HS_KND_SC_NM;//eslint-disable-line no-unused-vars
            분교여부 = item.BNHH_YN;//eslint-disable-line no-unused-vars
            설립유형 = item.SCHUL_FOND_TYP_CODE;//eslint-disable-line no-unused-vars
            주야구분 = item.DGHT_SC_CODE;//eslint-disable-line no-unused-vars
            개교기념일 = item.FOAS_MEMRD;//eslint-disable-line no-unused-vars
            설립일 = item.FOND_YMD;//eslint-disable-line no-unused-vars
            법정동코드 = item.ADRCD_ID;//eslint-disable-line no-unused-vars
            주소내역 = item.ADRES_BRKDN;//eslint-disable-line no-unused-vars
            상세주소내역 = item.DTLAD_BRKDN;//eslint-disable-line no-unused-vars
            우편번호 = item.ZIP_CODE;//eslint-disable-line no-unused-vars
            학교도로명우편번호 = item.SCHUL_RDNZC;//eslint-disable-line no-unused-vars
            학교도로명주소 = item.SCHUL_RDNMA;//eslint-disable-line no-unused-vars
            학교도로명상세주소 = item.SCHUL_RDNDA;//eslint-disable-line no-unused-vars
            위도 = item.LTTUD;//eslint-disable-line no-unused-vars
            경도 = item.LGTUD;//eslint-disable-line no-unused-vars
            전화번호 = item.USER_TELNO;//eslint-disable-line no-unused-vars
            전화번호_교무실 = item.USER_TELNO_SW;//eslint-disable-line no-unused-vars
            전화번호_행정실 = item.USER_TELNO_GA;//eslint-disable-line no-unused-vars
            팩스번호 = item.PERC_FAXNO;//eslint-disable-line no-unused-vars
            홈페이지주소 = item.HMPG_ADRES;//eslint-disable-line no-unused-vars
            남녀공학구분 = item.COEDU_SC_CODE;//eslint-disable-line no-unused-vars

            // 일치하는 요소를 찾았으므로 루프 중단
            break;
        }
    }
    var gdM = ''
    if (남녀공학구분 == '남') {
        gdM = '남자고등학교'
    } else if (남녀공학구분 == '녀') {
        gdM = '여자고등학교'
    } else {
        gdM = '남녀공학'
    }
    var Birth = 설립일.substring(0, 4) + '년'

    return `*${학교명}^는 *${Birth}^에 설립된 *${설립구분}^ *${학교특성}^입니다.\n *${지역}^에 위치해 있으며 *${gdM}^입니다. \n홈페이지 주소로 이동하려면 ㈜${홈페이지주소}㈜을 클릭해주세요.`;
}

function detail_Info(School) {
    var data = All_Info
    let 시도교육청, 시도교육청코드, 지역교육청, 지역교육청코드, 지역, 지역코드, 소재지구분코드;
    let 정보공시학교코드, 학교명, 학교급코드, 설립구분, 학교특성, 분교여부, 설립유형, 주야구분;
    let 개교기념일, 설립일, 법정동코드, 주소내역, 상세주소내역, 우편번호, 학교도로명우편번호;
    let 학교도로명주소, 학교도로명상세주소, 위도, 경도, 전화번호, 전화번호_교무실, 전화번호_행정실;
    let 팩스번호, 홈페이지주소, 남녀공학구분;

    // 데이터 배열을 순회하며 SCHUL_NM이 School과 일치하는 요소를 찾음
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.SCHUL_NM === School) {
            // SCHUL_NM이 일치하는 요소의 값들을 각각의 변수에 저장
            시도교육청 = item.ATPT_OFCDC_ORG_NM;//eslint-disable-line no-unused-vars
            시도교육청코드 = item.ATPT_OFCDC_ORG_CODE;//eslint-disable-line no-unused-vars
            지역교육청 = item.JU_ORG_NM;//eslint-disable-line no-unused-vars
            지역교육청코드 = item.JU_ORG_CODE;//eslint-disable-line no-unused-vars
            지역 = item.ADRCD_NM;//eslint-disable-line no-unused-vars
            지역코드 = item.ADRCD_CD;//eslint-disable-line no-unused-vars
            소재지구분코드 = item.LCTN_SC_CODE;//eslint-disable-line no-unused-vars
            정보공시학교코드 = item.SCHUL_CODE;//eslint-disable-line no-unused-vars
            학교명 = item.SCHUL_NM;//eslint-disable-line no-unused-vars
            학교급코드 = item.SCHUL_KND_SC_CODE;//eslint-disable-line no-unused-vars
            설립구분 = item.FOND_SC_CODE;//eslint-disable-line no-unused-vars
            학교특성 = item.HS_KND_SC_NM;//eslint-disable-line no-unused-vars
            분교여부 = item.BNHH_YN;//eslint-disable-line no-unused-vars
            설립유형 = item.SCHUL_FOND_TYP_CODE;//eslint-disable-line no-unused-vars
            주야구분 = item.DGHT_SC_CODE;//eslint-disable-line no-unused-vars
            개교기념일 = item.FOAS_MEMRD;//eslint-disable-line no-unused-vars
            설립일 = item.FOND_YMD;//eslint-disable-line no-unused-vars
            법정동코드 = item.ADRCD_ID;//eslint-disable-line no-unused-vars
            주소내역 = item.ADRES_BRKDN;//eslint-disable-line no-unused-vars
            상세주소내역 = item.DTLAD_BRKDN;//eslint-disable-line no-unused-vars
            우편번호 = item.ZIP_CODE;//eslint-disable-line no-unused-vars
            학교도로명우편번호 = item.SCHUL_RDNZC;//eslint-disable-line no-unused-vars
            학교도로명주소 = item.SCHUL_RDNMA;//eslint-disable-line no-unused-vars
            학교도로명상세주소 = item.SCHUL_RDNDA;//eslint-disable-line no-unused-vars
            위도 = item.LTTUD;//eslint-disable-line no-unused-vars
            경도 = item.LGTUD;//eslint-disable-line no-unused-vars
            전화번호 = item.USER_TELNO;//eslint-disable-line no-unused-vars
            전화번호_교무실 = item.USER_TELNO_SW;//eslint-disable-line no-unused-vars
            전화번호_행정실 = item.USER_TELNO_GA;//eslint-disable-line no-unused-vars
            팩스번호 = item.PERC_FAXNO;//eslint-disable-line no-unused-vars
            홈페이지주소 = item.HMPG_ADRES;//eslint-disable-line no-unused-vars
            남녀공학구분 = item.COEDU_SC_CODE;//eslint-disable-line no-unused-vars

            // 일치하는 요소를 찾았으므로 루프 중단
            break;
        }
    }
    var gdM = ''
    if (남녀공학구분 == '남') {
        gdM = '남자고등학교'
    } else if (남녀공학구분 == '녀') {
        gdM = '여자고등학교'
    } else {
        gdM = '남녀공학'
    }

    var MS = Stdnt(School)[0].COL_MSUM + '명'
    var WS = Stdnt(School)[0].COL_WSUM + '명'

    var Birth = 설립일.substring(0, 4) + '년 ' + 설립일.substring(4, 6) + '월 ' + 설립일.substring(6) + '일'
    var Cbt = 개교기념일.substring(0, 4) + '년 ' + 개교기념일.substring(4, 6) + '월 ' + 개교기념일.substring(6) + '일'

    return `학교명 : ${학교명}\n종류 : ${학교특성}\n성별 : ${gdM}\n남학생수 : ${MS}\n여학생수 : ${WS}\n 설립구분 : ${설립구분}\n설립유형 : ${설립유형}\n설립일 : ${Birth}\n개교기념일 : ${Cbt}\n도로명주소 : ${학교도로명주소}\n주소 : ${주소내역}\n우편번호 : ${우편번호}\n전화번호 : ${전화번호}\n팩스번호 : ${팩스번호}\n홈페이지 : ㉾${홈페이지주소}㉾\n시도교육청 : ${시도교육청}\n주야구분 : ${주야구분}\n`;
}

function info_PrintC(School) {
    var data = All_Info
    let 시도교육청, 시도교육청코드, 지역교육청, 지역교육청코드, 지역, 지역코드, 소재지구분코드;
    let 정보공시학교코드, 학교명, 학교급코드, 설립구분, 학교특성, 분교여부, 설립유형, 주야구분;
    let 개교기념일, 설립일, 법정동코드, 주소내역, 상세주소내역, 우편번호, 학교도로명우편번호;
    let 학교도로명주소, 학교도로명상세주소, 위도, 경도, 전화번호, 전화번호_교무실, 전화번호_행정실;
    let 팩스번호, 홈페이지주소, 남녀공학구분;

    // 데이터 배열을 순회하며 SCHUL_NM이 School과 일치하는 요소를 찾음
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.SCHUL_CODE === School) {
            // SCHUL_NM이 일치하는 요소의 값들을 각각의 변수에 저장
            시도교육청 = item.ATPT_OFCDC_ORG_NM;//eslint-disable-line no-unused-vars
            시도교육청코드 = item.ATPT_OFCDC_ORG_CODE;//eslint-disable-line no-unused-vars
            지역교육청 = item.JU_ORG_NM;//eslint-disable-line no-unused-vars
            지역교육청코드 = item.JU_ORG_CODE;//eslint-disable-line no-unused-vars
            지역 = item.ADRCD_NM;//eslint-disable-line no-unused-vars
            지역코드 = item.ADRCD_CD;//eslint-disable-line no-unused-vars
            소재지구분코드 = item.LCTN_SC_CODE;//eslint-disable-line no-unused-vars
            정보공시학교코드 = item.SCHUL_CODE;//eslint-disable-line no-unused-vars
            학교명 = item.SCHUL_NM;//eslint-disable-line no-unused-vars
            학교급코드 = item.SCHUL_KND_SC_CODE;//eslint-disable-line no-unused-vars
            설립구분 = item.FOND_SC_CODE;//eslint-disable-line no-unused-vars
            학교특성 = item.HS_KND_SC_NM;//eslint-disable-line no-unused-vars
            분교여부 = item.BNHH_YN;//eslint-disable-line no-unused-vars
            설립유형 = item.SCHUL_FOND_TYP_CODE;//eslint-disable-line no-unused-vars
            주야구분 = item.DGHT_SC_CODE;//eslint-disable-line no-unused-vars
            개교기념일 = item.FOAS_MEMRD;//eslint-disable-line no-unused-vars
            설립일 = item.FOND_YMD;//eslint-disable-line no-unused-vars
            법정동코드 = item.ADRCD_ID;//eslint-disable-line no-unused-vars
            주소내역 = item.ADRES_BRKDN;//eslint-disable-line no-unused-vars
            상세주소내역 = item.DTLAD_BRKDN;//eslint-disable-line no-unused-vars
            우편번호 = item.ZIP_CODE;//eslint-disable-line no-unused-vars
            학교도로명우편번호 = item.SCHUL_RDNZC;//eslint-disable-line no-unused-vars
            학교도로명주소 = item.SCHUL_RDNMA;//eslint-disable-line no-unused-vars
            학교도로명상세주소 = item.SCHUL_RDNDA;//eslint-disable-line no-unused-vars
            위도 = item.LTTUD;//eslint-disable-line no-unused-vars
            경도 = item.LGTUD;//eslint-disable-line no-unused-vars
            전화번호 = item.USER_TELNO;//eslint-disable-line no-unused-vars
            전화번호_교무실 = item.USER_TELNO_SW;//eslint-disable-line no-unused-vars
            전화번호_행정실 = item.USER_TELNO_GA;//eslint-disable-line no-unused-vars
            팩스번호 = item.PERC_FAXNO;//eslint-disable-line no-unused-vars
            홈페이지주소 = item.HMPG_ADRES;//eslint-disable-line no-unused-vars
            남녀공학구분 = item.COEDU_SC_CODE;//eslint-disable-line no-unused-vars

            // 일치하는 요소를 찾았으므로 루프 중단
            break;
        }
    }
    var gdM = ''
    if (남녀공학구분 == '남') {
        gdM = '남자고등학교'
    } else if (남녀공학구분 == '녀') {
        gdM = '여자고등학교'
    } else {
        gdM = '남녀공학'
    }
    var Birth = 설립일.substring(0, 4) + '년'

    return `*${학교명}^는 *${Birth}^에 설립된 *${설립구분}^ *${학교특성}^입니다.\n *${지역}^에 위치해 있으며 *${gdM}^입니다. \n홈페이지 주소로 이동하려면 ㈜${홈페이지주소}㈜을 클릭해주세요.`;
}

function detail_InfoC(School) {
    var data = All_Info
    let 시도교육청, 시도교육청코드, 지역교육청, 지역교육청코드, 지역, 지역코드, 소재지구분코드;
    let 정보공시학교코드, 학교명, 학교급코드, 설립구분, 학교특성, 분교여부, 설립유형, 주야구분;
    let 개교기념일, 설립일, 법정동코드, 주소내역, 상세주소내역, 우편번호, 학교도로명우편번호;
    let 학교도로명주소, 학교도로명상세주소, 위도, 경도, 전화번호, 전화번호_교무실, 전화번호_행정실;
    let 팩스번호, 홈페이지주소, 남녀공학구분;

    // 데이터 배열을 순회하며 SCHUL_NM이 School과 일치하는 요소를 찾음
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.SCHUL_CODE === School) {
            // SCHUL_NM이 일치하는 요소의 값들을 각각의 변수에 저장
            시도교육청 = item.ATPT_OFCDC_ORG_NM;//eslint-disable-line no-unused-vars
            시도교육청코드 = item.ATPT_OFCDC_ORG_CODE;//eslint-disable-line no-unused-vars
            지역교육청 = item.JU_ORG_NM;//eslint-disable-line no-unused-vars
            지역교육청코드 = item.JU_ORG_CODE;//eslint-disable-line no-unused-vars
            지역 = item.ADRCD_NM;//eslint-disable-line no-unused-vars
            지역코드 = item.ADRCD_CD;//eslint-disable-line no-unused-vars
            소재지구분코드 = item.LCTN_SC_CODE;//eslint-disable-line no-unused-vars
            정보공시학교코드 = item.SCHUL_CODE;//eslint-disable-line no-unused-vars
            학교명 = item.SCHUL_NM;//eslint-disable-line no-unused-vars
            학교급코드 = item.SCHUL_KND_SC_CODE;//eslint-disable-line no-unused-vars
            설립구분 = item.FOND_SC_CODE;//eslint-disable-line no-unused-vars
            학교특성 = item.HS_KND_SC_NM;//eslint-disable-line no-unused-vars
            분교여부 = item.BNHH_YN;//eslint-disable-line no-unused-vars
            설립유형 = item.SCHUL_FOND_TYP_CODE;//eslint-disable-line no-unused-vars
            주야구분 = item.DGHT_SC_CODE;//eslint-disable-line no-unused-vars
            개교기념일 = item.FOAS_MEMRD;//eslint-disable-line no-unused-vars
            설립일 = item.FOND_YMD;//eslint-disable-line no-unused-vars
            법정동코드 = item.ADRCD_ID;//eslint-disable-line no-unused-vars
            주소내역 = item.ADRES_BRKDN;//eslint-disable-line no-unused-vars
            상세주소내역 = item.DTLAD_BRKDN;//eslint-disable-line no-unused-vars
            우편번호 = item.ZIP_CODE;//eslint-disable-line no-unused-vars
            학교도로명우편번호 = item.SCHUL_RDNZC;//eslint-disable-line no-unused-vars
            학교도로명주소 = item.SCHUL_RDNMA;//eslint-disable-line no-unused-vars
            학교도로명상세주소 = item.SCHUL_RDNDA;//eslint-disable-line no-unused-vars
            위도 = item.LTTUD;//eslint-disable-line no-unused-vars
            경도 = item.LGTUD;//eslint-disable-line no-unused-vars
            전화번호 = item.USER_TELNO;//eslint-disable-line no-unused-vars
            전화번호_교무실 = item.USER_TELNO_SW;//eslint-disable-line no-unused-vars
            전화번호_행정실 = item.USER_TELNO_GA;//eslint-disable-line no-unused-vars
            팩스번호 = item.PERC_FAXNO;//eslint-disable-line no-unused-vars
            홈페이지주소 = item.HMPG_ADRES;//eslint-disable-line no-unused-vars
            남녀공학구분 = item.COEDU_SC_CODE;//eslint-disable-line no-unused-vars

            // 일치하는 요소를 찾았으므로 루프 중단
            break;
        }
    }
    var gdM = ''
    if (남녀공학구분 == '남') {
        gdM = '남자고등학교'
    } else if (남녀공학구분 == '녀') {
        gdM = '여자고등학교'
    } else {
        gdM = '남녀공학'
    }

    var MS = StdntC(School)[0].COL_MSUM + '명'
    var WS = StdntC(School)[0].COL_WSUM + '명'

    var Birth = 설립일.substring(0, 4) + '년 ' + 설립일.substring(4, 6) + '월 ' + 설립일.substring(6) + '일'
    var Cbt = 개교기념일.substring(0, 4) + '년 ' + 개교기념일.substring(4, 6) + '월 ' + 개교기념일.substring(6) + '일'

    return `학교명 : ${학교명}\n종류 : ${학교특성}\n성별 : ${gdM}\n남학생수 : ${MS}\n여학생수 : ${WS}\n 설립구분 : ${설립구분}\n설립유형 : ${설립유형}\n설립일 : ${Birth}\n개교기념일 : ${Cbt}\n도로명주소 : ${학교도로명주소}\n주소 : ${주소내역}\n우편번호 : ${우편번호}\n전화번호 : ${전화번호}\n팩스번호 : ${팩스번호}\n홈페이지 : ㉾${홈페이지주소}㉾\n시도교육청 : ${시도교육청}\n주야구분 : ${주야구분}\n`;
}

export { SchInfo, printDuplicates, info_Print, detail_Info, info_PrintC, detail_InfoC }