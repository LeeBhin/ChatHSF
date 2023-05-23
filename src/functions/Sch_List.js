import { All_Info } from "@/assets/data"

function SchList(school_split) {

    var array = school_split    //원본 리스트

    var gender = ['여고', '여자고', '여자고등학교', '여자학교', '여학교', '남고', '남자고', '남자고등학교', '남자학교', '남학교', '공학', '남녀공학'];  //성별
    var type = ['일반고', '일반고등학교', '특성화고', '특성화고등학교', '특성화', '특목고', '특수목적고', '특수목적고등학교', '특수목적', '자율고', '자율고등학교'];  //학교 종류

    var remainArray = arrayFilter(array, gender).filtered   //성별 뺀 리스트
    var genderArray = arrayFilter(array, gender).filtering  //성별 리스트

    var addressArray = arrayFilter(remainArray, type).filtered  //주소만 남은 리스트
    var typeArray = arrayFilter(remainArray, type).filtering    //학교 종류 리스트

    const gender_Clean = genderArray.map(str => {
        if (str === '여고' || str === '여자고' || str === '여자고등학교' || str === '여자학교' || str === '여학교') {
            return '녀';
        } else if (str === '남고' || str === '남자고' || str === '남자고등학교' || str === '남자학교' || str === '남학교') {
            return '남';
        } else if (str === '공학' || str === '남녀공학') {
            return '남녀공학';
        }
        return str;
    });

    const addressClean = addressArray.map(str => {
        if (str === '경남') {
            return '경상남도';
        } else if (str === '경북') {
            return '경상북도';
        } else if (str === '전남') {
            return '전라남도';
        } else if (str === '전북') {
            return '전라북도';
        } else if (str === '충남') {
            return '충청남도';
        } else if (str === '충북') {
            return '충청북도';
        }
        return str;
    });

    // console.log('주소 :', addressClean, '\n', '종류 :', typeArray, '\n', '성별 :', gender_Clean)
    // var result2 = addressClean + ',' + typeArray + ',' + genderArray
    // return [ListFunction(All_Info, addressClean, typeArray, gender_Clean), result2]

    var result = {
        List: ListFunction(All_Info, addressClean, typeArray, gender_Clean),
        Address: addressClean,
        typeReturn: typeArray,
        genderReturn: genderArray
    }

    return result
}


function ListFunction(jsonData, addressClean, typeArray, gender_Clean) {    //주소,종류,성별 필터
    console.log(addressClean[0].slice(0, 2))

    const filteredData = jsonData.filter(data =>
        (addressClean.length === 0 || addressClean.every(address => //주소 필터
            data.SCHUL_RDNMA.includes(address) || data.SCHUL_RDNMA.includes(address.slice(0, 2))||
            data.ADRES_BRKDN.includes(address) || data.ADRES_BRKDN.includes(address.slice(0, 2))
        )) &&
        (typeArray.length === 0 || typeArray.some(type =>   //종류 필터
            [...type].filter(char => data.HS_KND_SC_NM.includes(char)).length >= 3
        )) &&
        (gender_Clean.length === 0 || gender_Clean.includes(data.COEDU_SC_CODE))    //성별 필터
    ).map(data => data.SCHUL_NM);

    const printData = filteredData.map(data => '⦁ ' + data.toString()).join('\n');
    return printData
}




function arrayFilter(Array, filterArray) {  //리스트에서 원하는 요소 빼기

    var targetArray = filterArray

    var filter = [];
    var filteredArray = Array.filter(function (element) {
        if (targetArray.includes(element)) {
            filter.push(element);
            return false;
        }
        return true;
    });

    return {
        filtered: filteredArray,
        filtering: filter
    }
}

export { SchList }