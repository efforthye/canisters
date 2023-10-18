# types

## 프로젝트 기본 세팅

-   azle 패키지 설치 : `npm install azle`
-   프로젝트 내 dfx 설치 : `npm run dfx_install`
-   기존 사용했던 dfx 초기화 및 새로운 dfx 시작 : `dfx start --clean`
    -   dfx is already running. : `suto pkill -9 dfx` -> `netstat -ltnp | grep :4943` or `sudo lsof -i -P -n | grep LISTEN` -> icx-proxy의 pid를 찾음 -> `sudo kill -9 pid` -> `dfx start --clean --background` -> ICP 대시보드 시작됨 : http://localhost:43729/\_/dashboard
-   dfx 실행 후 코드 작업이 끝날 때마다 캐니스터 배포 : `npm run canister_deploy_local`
    -   dfx는 ICP에서 캐니스터 개발 및 관리를 단순화하는 도구이다. 배포 스크립트를 작성하거나 실제 네트워크로 배포하는 등의 역할을 한다.
    -   배포가 완료되면 Candid UI 화면의 url이 출력된다. : http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
    -   대략적인 프로젝트 기본 세팅이 완료되었으므로, 이제 개발을 시작하면 된다. ^^

Welcome to your first Azle project! This example project will help you to deploy your first canister (application) to the Internet Computer (IC) decentralized cloud. It is a simple getter/setter canister. You can always refer to [The Azle Book](https://demergent-labs.github.io/azle/) for more in-depth documentation.

`dfx` is the tool you will use to interact with the IC locally and on mainnet. If you don't already have it installed:

```bash
npm run dfx_install
```

Next you will want to start a replica, which is a local instance of the IC that you can deploy your canisters to:

```bash
npm run replica_start
```

If you ever want to stop the replica:

```bash
npm run replica_stop
```

Now you can deploy your canister locally:

```bash
npm install
npm run canister_deploy_local
```

To call the methods on your canister:

```bash
npm run canister_call_get_message
npm run canister_call_set_message
```

If you run the above commands and then call `npm run canister_call_get_message` you should see:

```bash
("Hello world!")
```

Assuming you have [created a cycles wallet](https://internetcomputer.org/docs/current/developer-docs/quickstart/network-quickstart) and funded it with cycles, you can deploy to mainnet like this:

```bash
npm run canister_deploy_mainnet
```
