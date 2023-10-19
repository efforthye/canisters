import React from 'react';
import { Principal } from '@dfinity/principal';
import { Actor, HttpAgent } from '@dfinity/agent';
import fetch from 'isomorphic-fetch';
const host = 'http://localhost:4943';
// http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
const canisterId = Principal.fromText('bd3sg-teaaa-aaaaa-qaaba-cai');
const canisterId2 = Principal.fromText('bkyz2-fmaaa-aaaaa-qaaaq-cai');

const fetchOptions = {
    headers: {
        'X-Custom-Header': 'value',
    },
};
const agent = new HttpAgent({ fetch, host, fetchOptions });

// const arg = {
//   // 여기에 요청에 필요한 데이터를 설정합니다.
//   // 예를 들면:
//   key: 'value',
// };
// const request = {
//     method: 'http_request',
//     args: [Buffer.from('안뇽하세요~')], // 요청 데이터를 여기에 입력하세요.
// };
const requestParams = {
    url: 'https://example.com',
    method: 'GET',
    body: new Uint8Array([
        /* body data as bytes */
    ]),
    headers: [],
    certificate_version: null, // 선택적으로 설정
};

const hi = async () => {
    const result = await agent.query(canisterId, {
        // package.json 에 있는 스크립트명인가.. ㄴㄴ
        // http_request 타입으로 선언된 메서드명임
        methodName: 'http_request',
        arg: new ArrayBuffer(0),
    });
    console.log({ result });
    if (result.status === 'rejected') {
        console.error('HTTP 요청 실패:', result);
    } else {
        // const response = result.response;
        // const responseData = await response.arrayBuffer();
        console.log('HTTP 응답:', result);
    }
    // const hi = await agent.getPrincipal();
    // console.log(hi);

    // const djfk = await agent.call(canisterId, {
    //     methodName: 'hihi',
    //     arg,
    // });
    // console.log(djfk);
    // return getExam;
    // // canisterId2를 사용하여 다른 캐니스터 메서드를 호출
    // const setExam = await agent.query(canisterId2, {
    //     methodName: 'setMessage',
    //     arg,
    // });
    // console.log({ setExam });
    // const getExam2 = await agent.query(canisterId, {
    //     methodName: 'getMessage',
    //     arg,
    // });
    // console.log({ getExam2 });
};

function App() {
    console.log('시작');
    console.log({ canisterId });
    console.log({ agent });
    const hh = hi();
    console.log('끝');

    return (
        <>
            <div>
                <span>하이</span>
            </div>
        </>
    );
}

export default App;
