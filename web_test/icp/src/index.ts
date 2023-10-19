// Dashboard: http://localhost:42615/_/dashboard
// http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
// https://internetcomputer.org/docs/current/developer-docs/frontend/custom-frontend
import {
    blob,
    bool,
    Canister,
    Func,
    ic,
    nat16,
    None,
    Opt,
    Principal,
    query,
    Record,
    Some,
    text,
    Tuple,
    update,
    Variant,
    Vec,
    Void,
} from 'azle';
import { HttpTransformArgs, managementCanister } from 'azle/canisters/management';

// This is a global variable that is stored on the heap
let message = '';

const Token = Record({
    // add whatever fields you'd like
    arbitrary_data: text,
});

const StreamingCallbackHttpResponse = Record({
    body: blob,
    token: Opt(Token),
});

export const Callback = Func([text], StreamingCallbackHttpResponse, 'query');

type HeaderField = [text, text];
const HeaderField = Tuple(text, text);

const CallbackStrategy = Record({
    callback: Callback,
    token: Token,
});

const StreamingStrategy = Variant({
    Callback: CallbackStrategy,
});

const HttpResponse = Record({
    status_code: nat16,
    headers: Vec(HeaderField),
    body: blob,
    streaming_strategy: Opt(StreamingStrategy),
    upgrade: Opt(bool),
});

const HttpRequest = Record({
    method: text,
    url: text,
    headers: Vec(HeaderField),
    body: blob,
    certificate_version: Opt(nat16),
});

export default Canister({
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),
    // Update calls take a few seconds to complete
    // This is because they persist state changes and go through consensus
    setMessage: update([text], Void, (newMessage) => {
        message = newMessage; // This change will be persisted
    }),

    // xkcd: update([], HttpResponse, async () => {
    //     return await ic.call(managementCanister.http_request, {
    //         args: [
    //             {
    //                 url: `https://xkcd.com/642/info.0.json`,
    //                 max_response_bytes: Some(2_000n),
    //                 method: {
    //                     get: null,
    //                 },
    //                 headers: [],
    //                 body: None,
    //                 transform: Some({
    //                     function: [ic.id(), 'xkcdTransform'] as [Principal, string],
    //                     context: Uint8Array.from([]),
    //                 }),
    //             },
    //         ],
    //         cycles: 50_000_000n,
    //     });
    // }),
    // xkcdTransform: query([HttpTransformArgs], HttpResponse, (args) => {
    //     return {
    //         ...args.response,
    //         headers: [],
    //         args,
    //         text: '하이',
    //     };
    // }),

    // hihi: query([HttpTransformArgs], HttpResponse, (args) => {
    //     return {
    //         text: '하이',
    //         ...args.response,
    //     };
    // }),

    http_request: query([HttpRequest], HttpResponse, (req) => {
        return {
            status_code: 200,
            headers: [],
            body: Buffer.from('hello'),
            streaming_strategy: None,
            upgrade: None,
        };
    }),
    http_request_update: update([HttpRequest], HttpResponse, (req) => {
        return {
            status_code: 200,
            headers: [],
            body: Buffer.from('hello'),
            streaming_strategy: None,
            upgrade: None,
        };
    }),
});
