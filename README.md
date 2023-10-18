# Canisters

## 프로젝트 기본 생성 및 배포 방법

-   azle을 통하여 types 라는 이름의 캐니스터 프로젝트 생성
    `npx azle new types`
-   types 폴더 접근 및 패키지 설치
    `npm install`
-   dfx 설치 및 실행
    `npm run dfx_install`
    -   실제 명령 : `DFX_VERSION=0.14.2 sh -ci \"$(curl -fsSL https://sdk.dfinity.org/install.sh)\"`
-   레플리카 노드 실행
    `npm run replica_start`
    -   실제 명령 : `dfx start --background`
    -   dfx is already running : `netstat -ltnp | grep :4943` or `sudo lsof -i -P -n | grep LISTEN` -> icx-proxy의 pid를 찾음 -> `sudo kill -9 pid` -> `dfx start --clean --background`
    -   이후 이와같은 대시보드가 생성됩니다. : Dashboard: http://localhost:43225/\_/dashboard -> 해당 url로 이동하면 ICP 레플리카 대시보드를 확인할 수 있습니다.
-   레플리카 노드 실행 종료
    `npm run replica_stop`
    -   실제 명령 : `dfx stop`
-   캐니스터 배포 (레플리카 노드 실행 중이어야 합니다.)
    `npm run canister_deploy_local`
    -   실제 명령 : `dfx deploy types`
    -   캐니스터 빌드 및 배포가 완료되면 이와같은 url이 출력됩니다. : http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai -> 해당 url로 이동하면 Candid UI라는 간단한 메서드 호출 UI 화면이 출력됩니다.
-   배포한 캐니스터 메서드 호출
    `npm run 매핑된명령어`
    -   `npm run canister_call_set_message` : 기본적으로 세팅 되어 있는 메시지 set 명령어
    -   `npm run canister_call_get_meseage` : 기본적으로 세팅 되어 있는 메시지 get 명령어

## GitHub commit 방법

-   프로젝트를 세이프 디렉토리로 설정 : `git config --global --add safe.directory '%(prefix)///wsl.localhost/Ubuntu/home/efforthye/icp/programs/canisters'`

## VSCode Insiders 설치
