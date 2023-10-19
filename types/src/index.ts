import {
    blob,
    bool,
    Canister,
    empty,
    float32,
    float64,
    Func,
    int,
    int64,
    nat,
    nat64,
    Null,
    Principal,
    query,
    text,
    update,
    Void,
} from 'azle';

// This is a global variable that is stored on the heap
let message = '';

const myCanisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
const BasicFunc = Func([text], text, 'query');

export default Canister({
    // 기본 제공되는 query, update 예시 메서드
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),
    // Update calls take a few seconds to complete
    // This is because they persist state changes and go through consensus
    setMessage: update([text], Void, (newMessage) => {
        message = newMessage; // This change will be persisted
    }),

    // Blob : 변경할 수 없는 바이트 배열(시퀀스 데이터 타입) 및
    // 멀티미디어 데이터를 다룰 때 주로 사용한다.
    getBlob: query([], blob, () => {
        return Uint8Array.from([68, 73, 68, 76, 0, 0]);
    }),

    // Bool : Bool 타입 지원
    getBool: query([], bool, () => {
        return true;
    }),

    // Empty : 객체가 비어있음을 표현한다. 사용은 거의 안 한다고 함.
    // 메서드 호출 시 실행 안됨(Failed query call.)
    getEmpty: query([], empty, () => {
        console.log('Empty');
        throw 'Anything you want';
    }),

    // Float : float32, float64 두 가지의 실수형 데이터 타입이다.
    getFloat32: query([], float32, () => {
        return Math.PI; // 원주율
    }),
    getFloat64: query([], float64, () => {
        return Math.E; // 자연 상수
    }),

    // Func : azle의 콜백 함수를 처리하며, 함수의 포인터를 반환한다. (중요)
    // 기본 구조는 캐니스터의 getBasicFunc 키에 query 함수를 호출하여 값을 집어 넣는다.
    // query의 인자는 1. 파람스, 2. 리턴타입, 3. 콜백함수 이다.
    getBasicFunc: query([], BasicFunc, () => {
        // Principal.fromText() 메서드는 텍스트 형태의 캐니스터 식별자를 Principal 객체로 변환한다.
        // 아이디를 통하여 캐니스터를 고유하게 식별할 수 있는 객체를 생성하는 것이다.
        // Principal 객체는 DFINITY의 식별 시스템에서 사용되며, 캐니스터 ID 또는 사용자 ID와 같은
        // 엔터티를 대표하는 데 사용된다. 이것은 캐니스터와 상호작용하는 데 필수적인 기능 중 하나이다.
        const canisterIdObject = Principal.fromText(myCanisterId);
        return [canisterIdObject, 'getBasicFunc'];
    }),

    // int : 정수형 데이터 타입으로, int(bigint), int8, int16, int32, int64가 있다.
    getInt: query([], int, () => {
        // 숫자 뒤에 n을 붙이면, 명시적으로 bigint 타입을 사용하겠다고 지정하는 것이다.
        const underscoreNumberBigint = 170_141_183_460_469_231_731_687_303_715_884_105_727n; // bigint

        // 숫자를 밑줄로 구분하는 것은 숫자의 가독성을 높이기 위해서이다.
        const number = 170141183460469231731687303715884105727; // number
        const underscoreNumber = 170_141_183_460_469_231_731_687_303_715_884_105_727; // number
        console.log(underscoreNumberBigint == BigInt(number)); // false, bigint & number
        console.log(number == underscoreNumber); // true, number & number

        return underscoreNumberBigint;
    }),
    getInt64: query([], int64, () => {
        const underscoreNumberBigint = 9_223_372_036_854_775_807n;
        const underscoreNumber = 9_223_372_036_854_775_807;
        // console.log(underscoreNumberBigint == underscoreNumber); // error
        return underscoreNumberBigint;
    }),

    // nat : nat는 바이트형 정수이다. nat, nat8, nat16, nat32, nat64가 있다.
    getNat: query([], nat, () => {
        return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
    }),
    getNat64: query([], nat64, () => {
        return 18_446_744_073_709_551_615n;
    }),

    // 그 외에도 null, opt, text, vec, record, variant, principal, reserved 등등이 있다. (중요)
    // 참고 자료 : https://jtiger.notion.site/ICP-f8fe33e01d07450a83b2c8d584e5c1fa#f6d788906dc947d7871c9d4d25b73448
    // 위 자료에서 중요해 보이는 것을 중심적으로 공부해 보자~ 일단 배포 및 메서드 실행 해보기.
    // 특히, 맨 아래 쪽 배포 부분을 제대로 보면 될 것 같음!

    // Null : 캐니스터에서 null을 표현하는 타입이다.
    getNull: query([], Null, () => {
        return null;
    }),

    // text : 문자열 데이터 타입이다.
    getString: query([], text, () => {
        return 'Hello world!';
    }),
});
