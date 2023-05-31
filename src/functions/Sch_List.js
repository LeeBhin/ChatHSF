const allinfo = localStorage.getItem('schinfo');
const All_Info = JSON.parse(allinfo)
/**
 * 
 * @param {All_Info} jsonData 
 * @param {Address} addressClean 
 * @param {Type} typeArray 
 * @param {Gender} gender_Clean 
 * @returns 
 */
function ListFunction(jsonData, addressClean, typeArray, gender_Clean) {    //주소,종류,성별 필터
    if (!addressClean) {
        addressClean = [];
    }

    if (!typeArray) {
        typeArray = [];
    }

    if (!gender_Clean) {
        gender_Clean = [];
    }
    if (Sp) {
        const filteredData = jsonData.filter(data =>
            (addressClean.length === 0 || addressClean.some(address => //주소 필터
                data.SCHUL_RDNMA.includes(address) || data.ADRES_BRKDN.includes(address)
            )) &&
            (typeArray.length === 0 || typeArray.some(type => //종류 필터
                data.HS_KND_SC_NM.includes(type)
            )) &&
            (gender_Clean.length === 0 || gender_Clean.includes(data.COEDU_SC_CODE))    //성별 필터
        ).map(data => data.SCHUL_NM);

        const printData = filteredData.map(data => '⦁ ' + data.toString()).join('\n');
        return printData

    } else {
        const filteredData = jsonData.filter(data =>
            (addressClean.length === 0 || addressClean.every(address => //주소 필터
                data.SCHUL_RDNMA.includes(address) || data.ADRES_BRKDN.includes(address)
            )) &&
            (typeArray.length === 0 || typeArray.some(type => //종류 필터
                data.HS_KND_SC_NM.includes(type)
            )) &&
            (gender_Clean.length === 0 || gender_Clean.includes(data.COEDU_SC_CODE))    //성별 필터
        ).map(data => data.SCHUL_NM);

        const printData = filteredData.map(data => '⦁ ' + data.toString()).join('\n');
        return printData
    }
}

function stringFilter(str) {    //예외 처리
    str = str.replace(/일반고등학교|일반고|일반학교/g, "Common");
    str = str.replace(/특성화고등학교|특성화고|특성화학교/g, "Special");
    str = str.replace(/특수목적고등학교|특목고|특수목적고|특수목적학교|특목학교/g, "Purpose");
    str = str.replace(/자율고등학교|자율고|자율학교/g, "Free");
    str = str.replace(/여자고등학교|여고|여자고|여자학교|여학교/g, "Female");
    str = str.replace(/남자고등학교|남고|남자고|남자학교|남학교/g, "Male");
    str = str.replace(/고등학교/g, " ");
    str = str.replace(/공학|공학학교/g, "Mixed");
    str = str.replace(/서울/g, "서울특별시");
    console.log(str)
    return str
}

function filtered_to_Keyword(str) {
    const typeKeywords = ['Common', 'Special', 'Purpose', 'Free'];
    const genderKeywords = ['Female', 'Male', 'Mixed'];

    const result = {};

    // Type 키워드 찾기
    const foundTypes = typeKeywords.filter(keyword => str.includes(keyword));
    if (foundTypes.length > 0) {
        result.Type = foundTypes;
    }

    // Gender 키워드 찾기
    const foundGenders = genderKeywords.filter(keyword => str.includes(keyword));
    if (foundGenders.length > 0) {
        result.Gender = foundGenders;
    }

    const replacements = {
        "Common": "일반고등학교",
        "Special": "특성화고등학교",
        "Purpose": "특수목적고등학교",
        "Free": "자율고등학교",
        "Female": "녀",
        "Male": "남",
        "Mixed": "남녀공학"
    };

    for (const key in result) {
        const values = result[key];
        for (let i = 0; i < values.length; i++) {
            values[i] = replacements[values[i]] || values[i];
        }
    }
    console.log(result)
    return result;
}

function SchList(string) {
    var Filtered = stringFilter(string) //예외 처리된 문자열
    var Keyword = filtered_to_Keyword(Filtered) //종류,성별
    var adr = address_Only(Filtered, All_Info)  //주소 리스트
    var Types = Keyword.Type
    var Genders = Keyword.Gender
    const Address = Array.from(new Set(adr.filter(Boolean)));

    var result = {
        "List": ListFunction(All_Info, Address, Types, Genders),
        "address_Return": Address,
        "types_Return": Types,
        "genders_Return": Genders
    };
    console.log(result)
    return result;
}

var Sp = false
function address_Only(input, jsonDataArray) {
    input = input.replace(/ /g, "");
    const result = [];

    const regions = ['경상도', '전라도', '충청도', '경상', '전라', '충청', '경남', '경북', '전남', '전북', '충남', '충북'];
    regions.forEach(region => {
        if (input.includes(region)) {
            if (region == '경상도' || region == '경상') {
                Sp = true;
                result.push('경상남도')
                result.push('경상북도')
                input = input.replace(region, '');
            } else if (region == '전라도' || region == '전라') {
                Sp = true;
                result.push('전라남도')
                result.push('전라북도')
                input = input.replace(region, '');
            } else if (region == '충청도' || region == '충청') {
                Sp = true;
                result.push('충청남도')
                result.push('충청북도')
                input = input.replace(region, '');
            } else if (region == '경남') {
                result.push('경상남도')
                input = input.replace(region, '');
            } else if (region == '경북') {
                result.push('경상북도')
                input = input.replace(region, '');
            } else if (region == '전남') {
                result.push('전라남도')
                input = input.replace(region, '');
            } else if (region == '전북') {
                result.push('전라북도')
                input = input.replace(region, '');
            } else if (region == '충남') {
                result.push('충청남도')
                input = input.replace(region, '');
            } else if (region == '충북') {
                result.push('충청북도')
                input = input.replace(region, '');
            }
            else {
                result.push(region)
                input = input.replace(region, '');
            }

        }

    });
    const checkArray = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (input.includes(arr[i]) || isSubstringInOrder(input, arr[i])) {
                result.push(arr[i]);
                input = input.replace(arr[i], ''); // input에서 해당 문자열 제거
            }
        }
    };

    const isSubstringInOrder = (str, substring) => {
        let strIndex = 0;
        let subIndex = 0;
        let matchCount = 0;

        while (strIndex < str.length && subIndex < substring.length) {
            if (str[strIndex] === substring[subIndex]) {
                subIndex++;
                matchCount++;
            }
            strIndex++;
        }

        return matchCount >= 3;
    };

    for (let i = 0; i < jsonDataArray.length; i++) {
        const jsonData = jsonDataArray[i];
        if (jsonData.ADRES_BRKDN) {
            checkArray(jsonData.ADRES_BRKDN.split(' '), 'ADRES_BRKDN');
        }

        if (result.length === 0 && jsonData.SCHUL_RDNMA) {
            checkArray(jsonData.SCHUL_RDNMA.split(' '), 'SCHUL_RDNMA');
        }
    }
    return result;
}

export { SchList }