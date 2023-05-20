import { All_Info } from "@/assets/data"

function SchList(School) {
    let Maching_Sch = findMatchingItems(Need_Info(), School)
    console.log(Maching_Sch)

    const Only_Nm = [];
    for (const item of Maching_Sch) {
        const schul_nm = item.SCHUL_NM;
        Only_Nm.push(schul_nm);
    }
    return Only_Nm.join(', ')
}

function Need_Info() {
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

function findMatchingItems(jsonArray, searchString) {
    let matchingItems = [];
    let searchWords = searchString;

    for (let i = 0; i < jsonArray.length; i++) {
        let json = jsonArray[i];
        let schulRdnma = json['SCHUL_RDNMA'] || '';
        let hsKndScNm = json['HS_KND_SC_NM'] || '';

        // 단어의 수에 따라 조건 판단
        if (searchWords.length === 2) {
            // 단어가 2개인 경우 SCHUL_RDNMA에서 첫 번째 단어와 2글자 이상 일치하고,
            // HS_KND_SC_NM에서 마지막 단어와 3글자 이상 일치하는지 확인
            let firstWord = searchWords[0];
            let lastWord = searchWords[1];

            if (
                (schulRdnma.includes(firstWord) || (firstWord === '경북' && schulRdnma.includes('경상북도')) || (firstWord === '경남' && schulRdnma.includes('경상남도')) || (firstWord === '충북' && schulRdnma.includes('충청북도')) || (firstWord === '충남' && schulRdnma.includes('충청남도')) || (firstWord === '전북' && schulRdnma.includes('전라북도')) || (firstWord === '전남' && schulRdnma.includes('전라남도'))) &&
                (hsKndScNm.includes(lastWord) || (lastWord === '특목고' && hsKndScNm === '특수목적고등학교'))
            ) {
                matchingItems.push(json);
            }
        } else if (searchWords.length >= 3) {
            // 단어가 3개 이상인 경우 SCHUL_RDNMA에서 첫 번째 단어부터 뒤에서 두 번째 단어까지 일치하는 글자 수 확인
            // 그리고 HS_KND_SC_NM에서 마지막 단어와 3글자 이상 일치하는지 확인
            let lastWord = searchWords[searchWords.length - 1];
            let matchCountRdnma = 0;

            // SCHUL_RDNMA에서 첫 번째 단어부터 뒤에서 두 번째 단어까지 일치하는 글자 수 확인
            for (let j = 0; j < searchWords.length - 1; j++) {
                let currentWord = searchWords[j];
                let currentMatchCount = 0;

                if (schulRdnma.includes(currentWord) || (currentWord === '경북' && schulRdnma.includes('경상북도')) || (currentWord === '경남' && schulRdnma.includes('경상남도')) || (currentWord === '충북' && schulRdnma.includes('충청북도')) || (currentWord === '충남' && schulRdnma.includes('충청남도')) || (currentWord === '전북' && schulRdnma.includes('전라북도')) || (currentWord === '전남' && schulRdnma.includes('전라남도'))) {
                    currentMatchCount = currentWord.length;
                }

                matchCountRdnma += currentMatchCount;
            }

            // HS_KND_SC_NM에서 마지막 단어와 3글자 이상 일치하는지 확인
            if ((hsKndScNm.includes(lastWord) || (lastWord === '특목고' && hsKndScNm === '특수목적고등학교')) && lastWord.length >= 3) {
                if (matchCountRdnma >= 2 * (searchWords.length - 1)) {
                    matchingItems.push(json);
                }
            }
        }
    }

    return matchingItems;
}

export { SchList }