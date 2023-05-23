function List_Comment(json) {

    var Result = ''

    var Ok_Messages = ['좋아요!', '좋습니다!', '알았어요!', '알겠어요!', '물론이죠!', '알겠습니다!', '문제 없어요!', '제게 맡기세요!', '저만 믿으세요!', '제게 맡겨요!']

    var Random = Ok_Messages[Math.floor(Math.random() * Ok_Messages.length)];
    Result += Random + '\n'

    Result += Cm1()

    if (json.Address.length !== 0) {
        Result += json.Address.join(" ") + Cm2()
    }

    if (json.typeReturn.length !== 0) {
        if (json.genderReturn.length !== 0) {
            Result += json.typeReturn + Cm3()
        } else {
            Result += json.typeReturn
        }
    }

    if (json.genderReturn.length !== 0) {
        Result += json.genderReturn
    }

    Result += Cm4()

    return Result
}

function Cm1() {
    var list = ['다음은 ', '아래는 ', '']
    var Random = list[Math.floor(Math.random() * list.length)];
    return Random
}

function Cm2() {
    var list = [' 지역의 ', '에 있는 ', '의 ', '에 위치한 ']
    var Random = list[Math.floor(Math.random() * list.length)];
    return Random
}

function Cm3() {
    var list = [' 중 ', ' 중에 ', ' 중에서 ']
    var Random = list[Math.floor(Math.random() * list.length)];
    return Random
}

function Cm4() {
    var list = [' 학교입니다. ', ' 학교 리스트입니다. ', ' 학교 목록입니다. ']
    var Random = list[Math.floor(Math.random() * list.length)];
    return Random
}

function not_Exist() {  //몇번 이상 반복하면 사용법 알려주기(예정)
    var list = [
        '죄송해요.\n학교를 찾을 수 없어요.',
        '음... 없는 것 같은데요?',
        '질문을 다시 한 번 확인해 주세요.',
        '해당 학교를 찾을 수 없어요.\n질문을 다시 한 번 확인해 주시겠어요?',
        '흠... 그런 학교는 없는 것 같은데요?',
        '그런 학교는 없는 것 같아요..',
        '해당 학교를 찾지 못했어요...',
        '죄송합니다.\n찾을 수가 없네요...'
    ]
    var Random = list[Math.floor(Math.random() * list.length)];
    return Random
}

export { List_Comment, not_Exist }