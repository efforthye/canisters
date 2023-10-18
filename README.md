# Canisters

## 캐니스터와 레플리카

-   캐니스터 : 캐니스터는 ICP 네트워크의 중요한 요소 중 하나로, 스마트 계약을 실행하는 가상 컨테이너를 나타낸다. 캐니스터는 분산 애플리케이션의 일부로서 스마트 계약 코드와 상태를 보유하며, 사용자와 상호 작용하여 다양한 작업을 수행할 수 있다.
    -   ex) 스마트 계약을 배포하고 실행하거나 데이터를 저장 및 검색하는 데 사용
    -   특징 : `WASM 모듈, 4G 힙 메모리, 64G 로컬 저장 메모리, HTTP 호출, 쿼리 / 업데이트`
        -   캐니스터는 ICP 어플리케이션으로, 기존의 스마트 컨트랙트 역할을 함.
        -   WASM 모듈 : 캐니스터는 기본적으로 웹 어셈블리 형식으로 작성된 스마트 계약 코드를 실행하는데, WASM 모듈은 컴파일된 스마트 계약 코드를 나타내며 이 코드는 블록체인에서 실행된다. WASM은 효율적이고 보안성이 높으며, 다양한 프로그래밍 언어로 작성된 스마트 계약 코드를 실행하는 데 사용된다.
        -   4G 힙 메모리 : 캐니스터는 스마트 계약 실행을 위해 힙 메모리를 가진다. 이 힙 메모리는 스마트 계약의 실행 중에 임시적으로 데이터를 저장하고 처리하는 데 사용된다. 최대 4GB 의 힙 메모리를 사용할 수 있다.
        -   64G 로컬 저장 메모리 : 캐니스터가 데이터를 영구적으로 저장하고 검색하는 데 사용할 수 있는 저장 공간의 크기는 최대 64GB이고, 로컬 저장 메모리에 저장된다.
        -   `HTTP 호출` : 캐니스터는 HTTP 프로토콜을 사용하여 외부 웹 서비스와 통신할 수 있다. 이것은 다른 웹 서비스와 상호 작용하고 데이터를 가져오거나 보내는 데 사용될 수 있고, HTTP 호출을 통해 캐니스터는 외부 리소스에 액세스할 수 있다.
        -   쿼리 / 업데이트 : 캐니스터는 상태를 읽는 쿼리 작업과 상태를 변경하거나 업데이트하는 업데이트 작업을 수행할 수 있다. 쿼리 작업은 상태를 읽기만 하고 변경하지 않으며, 업데이트 작업은 상태를 수정하거나 새로운 데이터를 추가할 수 있다. 이를 통해 ICP를 통한 스마트 계약은 정보를 검색하고 변경할 수 있다.
-   레플리카 : 레플리카는 ICP 네트워크에서 캐니스터를 실행하고 관리하는 역할을 하는 서버 노드이다. 레플리카는 캐니스터의 인스턴스를 호스팅하고, 스마트 계약 코드를 실행하며, 캐니스터의 상태를 관리한다. 레플리카는 네트워크의 일부로 작동하며 분산 시스템의 안정성과 가용성을 제공하는 데 중요한 역할을 한다.
    -   간단히 말하면, 레플리카는 캐니스터의 '집'이라고 보면 된다. 캐니스터는 애플리케이션 레벨에서 실행되는 스마트 계약을 나타내고, 레플리카는 이러한 스마트 계약을 실행하고 관리하는 네트워크 레벨의 노드이다. ICP는 분산된 컴퓨팅 환경에서 스마트 계약과 애플리케이션을 실행하기 위한 플랫폼으로 사용된다.

## 쿼리와 업데이트

-   쿼리 : 캐니스터의 기능을 공개적으로 노출하는 읽기 전용 메서드이다.

    ```
    import { $query } from 'azle';

    $query;
    export function getString(): string {
        return 'This is a query method!';
    }
    ```

    -   특징
        -   쿼리 메서드는 `$query;` 키워드를 사용하며, 읽기 전용이다. 이는 캐니스터의 상태를 변경하지 않음을 나타낸다.
        -   쿼리 메서드는 합의 과정을 거치지 않고 단일노드에서 실행된다.
        -   쿼리가 빠르게 실행되어야 하므로, 100ms 지연시간 제한이 있다.
        -   쿼리 메서드는 최대 4G의 힙 메모리 제한이 있다.
        -   쿼리 메서드는 초당 최대 32,000 번까지 호출될 수 있다.

-   업데이트 : 캐니스터의 상태 변경을 위한 메서드이다. 이는 캐니스터의 상태를 변경하기 위한 핵심 메커니즘으로, 캐니스터의 데이터를 업데이트하고 변경 사항을 영구적으로 저장한다.

    ```
    import { nat64, $update } from 'azle';

    let counter = 0n;

    $update;
    export function increment(): nat64 {
        return counter++;
    }
    ```

    -   특징
        -   업데이트 메서드는 `$update;` 키워드를 사용하며, 상태 변경을 허용한다.
        -   업데이트 메서드는 합의 과정을 거치며 여러 노드에서 실행된다. 캐니스터의 상태 변경을 위해 네트워크의 노드 간 합의가 이루어지는 것을 의미한다.
        -   상대적으로 긴 2~5 초의 실행 시간을 가질 수 있다.
        -   업데이트 메서드는 캐니스터의 상태를 읽거나 쓰기 위한 목적으로 사용된다.
        -   4G의 힙메모리 제한 및 48G의 메모리 제한이 있다.
        -   업데이트 메서드는 초당 최대 900번까지 호출될 수 있다.

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
    -   이후 이와같은 레플리카 대시보드가 생성된다. : Dashboard: http://localhost:43225/\_/dashboard -> 해당 url로 이동하면 ICP 레플리카 대시보드를 확인할 수 있다.
        -   대시보드의 서브넷 설정 정보, 파라미터 정보, ICP 레플리카 버전, 캐니스터 관련 정보 등을 포함하고 있다.
-   레플리카 노드 실행 종료
    `npm run replica_stop`
    -   실제 명령 : `dfx stop`
-   캐니스터 배포 (레플리카 노드 실행 중이어야 한다.)
    `npm run canister_deploy_local`
    -   실제 명령 : `dfx deploy types`
    -   캐니스터 빌드 및 배포가 완료되면 이와같은 url이 출력된다. : http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai -> 해당 url로 이동하면 Candid UI라는 간단한 메서드 호출 UI 화면이 출력된다.
        -   이는 빌드한 캐니스터의 정보와 그 캐니스터의 Candid 인터페이스를 나타낸다. Candid는 ICP 의 스마트 계약 및 캐니스터와 상호 작용하기 위한 언어와 인터페이스를 제공한다.
-   배포한 캐니스터 메서드 호출
    `npm run 매핑된명령어`
    -   `npm run canister_call_set_message` : 기본적으로 세팅 되어 있는 메시지 set 명령어
    -   `npm run canister_call_get_message` : 기본적으로 세팅 되어 있는 메시지 get 명령어

## GitHub commit 방법

-   프로젝트를 세이프 디렉토리로 설정 : `git config --global --add safe.directory '%(prefix)///wsl.localhost/Ubuntu/home/efforthye/icp/programs/canisters'`
-   만약 user email과 name이 설정되어 있지 않으면 설정하여 준다.
    -   `git config --global user.email efforthye@gmail.com`
    -   `git config --global user.name efforthye`
-   git push 할 때, user name과 password를 입력하여 준다.
    -   user name : efforthye 입력
    -   password : developer settings 에서 발급한 classic assess token 입력

## VSCode 에서 wsl 사용 방법

-   wsl 터미널을 추가하면 간단하게 사용 가능하다. 필요하다면 `source ~/.bashrc` 도 실행하여 준다.

## VSCode Insiders 설치

-   이미 VSCode가 설치되어 있다면 딱히 새로 설치할 필요는 없다.
