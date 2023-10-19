import { Canister, Null, Opt, Principal, Record, Some, Vec, bool, int32, query, text } from 'azle';

// Record : key-value 형식의 객체를 나타낸다.
const User = Record({
    id: Principal, // Principal : 고유 식별자를 가진 객체로, 고유한 ID를 나타낸다.
    username: text,
});

export default Canister({
    // Opt : null을 허용하는 타입이다.
    getOptSome: query([], Opt(bool), () => {
        //  Some(true) : { Some: true } 와 같다.
        return Some(true);
    }),

    // Vec : 캐니스터에서 배열을 뜻하는 타입이다.
    // 어떠한 타입의 배열값이 들어갈지 인자로 넣어 준다.
    getNumbers: query([], Vec(int32), () => {
        return [0, 1, 2, 3];
    }),

    // Record : key-value 형식의 객체 타입이다.
    getUser: query([], User, () => {
        const user = {
            id: Principal.fromUint8Array(Uint8Array.from([0])),
            username: 'lastmjs',
        };
        return user;
    }),
});
