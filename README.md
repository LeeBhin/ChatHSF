# ChatHSF

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Prototype Link
https://chat-hsf.netlify.app/

### Functions
1. 이름으로 학교 검색(줄임말 가능)
ex) 세명컴고, 디미고, 선린고...
※ 학교 이름 외에 다른 문자 입력 X

2. 위치로 학교 검색
ex) 서울특별시 은평구에 위치한 고등학교를 찾아줘
※ 행정 구역 단위 붙여야함(은평X,은평구O)

3. 고등학교 종류로 검색(줄임말,중복 가능)
ex) (지역)에 위치한특목고/특성화고/일반고/자율고 찾아줘

4. 남녀공학 구분으로 검색(줄임말,중복 가능)
ex) (지역)에 위치한 (종류)중 남고/여고/(남녀)공학/을 찾아줘

5. 전국 고등학교 리스트
ex) 전국의 고등학교를 모두 알려줘

6. 학교 정보 api 자동 업데이트(최초 1회, 1주일마다)
