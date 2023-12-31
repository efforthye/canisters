import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getMessage' : ActorMethod<[], string>,
  'http_request' : ActorMethod<
    [
      {
        'url' : string,
        'method' : string,
        'body' : Uint8Array | number[],
        'headers' : Array<[string, string]>,
        'certificate_version' : [] | [number],
      },
    ],
    {
      'body' : Uint8Array | number[],
      'headers' : Array<[string, string]>,
      'upgrade' : [] | [boolean],
      'streaming_strategy' : [] | [
        {
            'Callback' : {
              'token' : { 'arbitrary_data' : string },
              'callback' : [Principal, string],
            }
          }
      ],
      'status_code' : number,
    }
  >,
  'http_request_update' : ActorMethod<
    [
      {
        'url' : string,
        'method' : string,
        'body' : Uint8Array | number[],
        'headers' : Array<[string, string]>,
        'certificate_version' : [] | [number],
      },
    ],
    {
      'body' : Uint8Array | number[],
      'headers' : Array<[string, string]>,
      'upgrade' : [] | [boolean],
      'streaming_strategy' : [] | [
        {
            'Callback' : {
              'token' : { 'arbitrary_data' : string },
              'callback' : [Principal, string],
            }
          }
      ],
      'status_code' : number,
    }
  >,
  'setMessage' : ActorMethod<[string], undefined>,
}
