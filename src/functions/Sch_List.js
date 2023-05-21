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
    console.log('needinfo:', result)
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

        for (let i = 0; i < keywordsToCheck.length; i++) {
            const keyword = keywordsToCheck[i];

            if (i === 0) {  //첫번째는 단어로
                if (rdnma.includes(keyword)) {
                    matchCount += 2;

                }

            } else {    //나머지는 글자로
                for (const char of keyword) {
                    if (rdnma.includes(char)) {
                        matchCount++;
                    }
                }
            }
        }
        if (matchCount >= count) {
            let lastWordMatchCount = 0;
            for (const char of lastWord) {
                if (data.HS_KND_SC_NM.includes(char)) {
                    lastWordMatchCount++;
                }
            }

            if (lastWordMatchCount >= 3) {
                matchedData.push(data);
            }
        }
    }

    return matchedData;
}


export { SchList }