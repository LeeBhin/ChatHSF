import { All_Info } from "@/assets/data"
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
            (typeArray.length === 0 || typeArray.some(type => //주소 필터
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
            (typeArray.length === 0 || typeArray.some(type => //주소 필터
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
    str = str.replace(/공학|공학학교/g, "Mixed");
    str = str.replace(/경남/g, "경상남도");
    str = str.replace(/경북/g, "경상북도");
    str = str.replace(/전남/g, "전라남도");
    str = str.replace(/전북/g, "전라북도");
    str = str.replace(/충남/g, "충청남도");
    str = str.replace(/충북/g, "충청북도");

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

    return result;
}

function SchList(string) {
    var Filtered = stringFilter(string) //예외 처리된 문자열
    var Address = address_Only(Filtered, All_Info)  //주소 리스트
    var Keyword = filtered_to_Keyword(Filtered) //종류,성별
    var Types = Keyword.Type
    var Genders = Keyword.Gender

    var result = {
        "List": ListFunction(All_Info, Address, Types, Genders),
        "address_Return": Address,
        "types_Return": Types,
        "genders_Return": Genders
    };

    return result;
}
var Sp = false
function address_Only(input, jsonData) {
    var result = [];

    const regions = ['경상남도', '경상북도', '전라남도', '전라북도', '충청남도', '충청북도', '경상도', '전라도', '충청도', '경상', '전라', '충청'];

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
            }
            else {
                result.push(region)
                input = input.replace(region, '');
            }

        }

    });

    function splitString(str) {
        var result = [];
        for (var i = 0; i < str.length - 1; i++) {
            result.push(str.slice(i, i + 2));
        }
        return result;
    }

    var inputList = splitString(input);
    var jsonDataList = jsonData.map(item => ({
        ADRES_BRKDN: item.ADRES_BRKDN.split(' '),
        SCHUL_RDNMA: item.SCHUL_RDNMA.split(' ')
    }));

    for (var i = 0; i < inputList.length; i++) {
        var found = false;
        for (var j = 0; j < jsonDataList.length; j++) {
            for (var k = 0; k < jsonDataList[j].ADRES_BRKDN.length; k++) {
                if (inputList[i] === jsonDataList[j].ADRES_BRKDN[k].slice(0, 2)) {
                    result.push(jsonDataList[j].ADRES_BRKDN[k]);
                    found = true;
                    break;
                }
            }
            if (!found) {
                for (var l = 0; l < jsonDataList[j].SCHUL_RDNMA.length; l++) {
                    if (inputList[i] === jsonDataList[j].SCHUL_RDNMA[l].slice(0, 2)) {
                        result.push(jsonDataList[j].SCHUL_RDNMA[l]);
                        found = true;
                        break;
                    }
                }
            }
            if (found) break;
        }
    }

    return result;
}

export { SchList }