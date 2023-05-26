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

    const filteredData = jsonData.filter(data =>
        (addressClean.length === 0 || addressClean.every(address => //주소 필터
            data.SCHUL_RDNMA.includes(address) || data.ADRES_BRKDN.includes(address)
        )) &&
        (typeArray.length === 0 || typeArray.every(type => //주소 필터
            data.HS_KND_SC_NM.includes(type)
        )) &&
        (gender_Clean.length === 0 || gender_Clean.includes(data.COEDU_SC_CODE))    //성별 필터
    ).map(data => data.SCHUL_NM);

    const printData = filteredData.map(data => '⦁ ' + data.toString()).join('\n');

    return printData
}

function stringFilter(str) {    //예외 처리
    str = str.replace(/일반고|일반학교|일반고등학교/g, "Common");
    str = str.replace(/특성화고|특성화학교|특성화고등학교/g, "Special");
    str = str.replace(/특목고|특수목적고|특수목적고등학교|특수목적학교|특목학교/g, "Purpose");
    str = str.replace(/자율고|자율고등학교|자율학교/g, "Free");
    str = str.replace(/여고|여자고|여자학교|여학교|여자고등학교/g, "Female");
    str = str.replace(/남고|남자고|남자학교|남학교|남자고등학교/g, "Male");
    str = str.replace(/공학|공학학교/g, "Mixed");
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

function address_Only(input, jsonData) {
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

    var result = [];
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