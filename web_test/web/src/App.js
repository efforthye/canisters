import { Principal } from '@dfinity/principal';
import { HttpAgent } from '@dfinity/agent';
// http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
const canisterId = Principal.fromText('bd3sg-teaaa-aaaaa-qaaba-cai');
const canisterId2 = Principal.fromText('bkyz2-fmaaa-aaaaa-qaaaq-cai');
const agent = new HttpAgent();

function App() {
    console.log('시작');
    console.log({ canisterId });
    console.log({ canisterId2 });
    console.log({ agent });
    console.log('끝');
    // const result1 = await agent.query(canisterId, {
    //     methodName: 'your_method_name',
    //     arg: 'your_argument',
    //   });
    //   // canisterId2를 사용하여 다른 캐니스터 메서드를 호출
    //   const result2 = await agent.query(canisterId2, {
    //     methodName: 'another_method_name',
    //     arg: 'another_argument',
    //   });

    return (
        <>
            <div className="App">
                <span>ㅎㅎ</span>
                {/* <span>{canisterId}</span>
                <span>{canisterId2}</span> */}
            </div>
        </>
    );
}

export default App;
