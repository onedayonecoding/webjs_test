# backend_test
설치되야 될 사항
1. npm install express-generator -g
2. npm install nodemon -g
3. npm install -g eslint
4. postgres 설치후 DB 생성 아래 참조
  서버이름 : postgres,
  서버 password : postgress,
  port:5432, 
  DB이름:metacamp_dev, 
5. npm install sequelize --save


# 0125 변경 사항
1. 부서DB table DAO 생성
2. 부서DB에 insert 확인

# 0126 변경 사항
1. 부서DB CRUD 추가
2. 사용자DB 추가 및 CRUD 추가
3. password 암호화 (sha256)

# 0126 변경사항
1. 토큰 생성
2. 장비관리 생성
3. 모든 관리사항 토큰 검증(로그인 확인)추가