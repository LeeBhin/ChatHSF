import { All_Info } from "@/assets/data"

function SchList(School) {
    var Maching_Sch = findMatchingItems(Need_Info(), School)

    const Only_Nm = [];
    for (const item of Maching_Sch) {
        const schul_nm = item.SCHUL_NM;
        Only_Nm.push(schul_nm);
    }
    return Only_Nm.join(', ')
}

function Need_Info() {  //필요한 정보만
    var result = [];
    for (const item of All_Info) {
        const schul_code = item.SCHUL_CODE;
        const schul_nm = item.SCHUL_NM;
        const schul_rdnma = item.SCHUL_RDNMA;
        const hs_knd_sc_nm = item.HS_KND_SC_NM;
        result.push({
            "SCHUL_CODE": schul_code,       //학교코드
            "SCHUL_NM": schul_nm,           //학교명
            "SCHUL_RDNMA": schul_rdnma,     //주소
            "HS_KND_SC_NM": hs_knd_sc_nm    //종류
        });
    }

    return result;
}

function findMatchingItems(jsonData, keywords) {
    var count = (keywords.length - 1) * 2;
    const lastWord = keywords[keywords.length - 1];
    const keywordsToCheck = keywords.slice(0, -1);

    const matchedData = [];

    for (const data of jsonData) {
        const rdnma = data.SCHUL_RDNMA;
        let matchCount = 0;

        //예외 처리
        if (keywordsToCheck.includes('경남') && rdnma.includes('경상남도')) {
            matchCount += 2;
        }
        if (keywordsToCheck.includes('경북') && rdnma.includes('경상북도')) {
            matchCount += 2;
        }
        if (keywordsToCheck.includes('전남') && rdnma.includes('전라남도')) {
            matchCount += 2;
        }
        if (keywordsToCheck.includes('전북') && rdnma.includes('전라북도')) {
            matchCount += 2;
        }
        if (keywordsToCheck.includes('충남') && rdnma.includes('충청남도')) {
            matchCount += 2;
        }
        if (keywordsToCheck.includes('충북') && rdnma.includes('충청북도')) {
            matchCount += 2;
        }

        for (const keyword of keywordsToCheck) {
            let prevChar = ''; // 이전 글자
            for (const char of keyword) {
                if (prevChar && rdnma.includes(prevChar + char)) {
                    // 이전 글자와 현재 글자를 합친 문자열이 주소에 포함되어 있는 경우
                    matchCount += 2;
                }
                prevChar = char; // 현재 글자를 이전 글자로 저장
            }
        }

        if (matchCount >= count) {  //이전 조건이 충족하는경우
            let lastWordMatchCount = 0;
            for (const char of lastWord) {
                if (data.HS_KND_SC_NM.includes(char)) { //한글자씩 검사
                    lastWordMatchCount++;
                }
            }

            if (lastWordMatchCount >= 3) {  //3글자 이상일떄
                matchedData.push(data);
            }
        }
    }

    const filteredData = [];

    for (const data of matchedData) {
        const firstTwoChars = keywordsToCheck[0].substring(0, 2); // 문자열 리스트의 첫 번째 요소의 첫 두글자

        if (data.SCHUL_RDNMA.includes(firstTwoChars)) {
            filteredData.push(data);
        }
    }

    return filteredData;
}

export { SchList }