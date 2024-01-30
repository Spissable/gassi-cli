# gassi-cli

Run SYNC, QUERY, EXECUTE and DISCONNECT requests easily

![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![oclif](https://img.shields.io/static/v1?style=for-the-badge&message=oclif&color=000000&logo=oclif&logoColor=FFFFFF&label=)
![Biome](https://img.shields.io/static/v1?style=for-the-badge&message=Biome&color=60A5FA&logo=Biome&logoColor=FFFFFF&label=)
![Jest](https://img.shields.io/static/v1?style=for-the-badge&message=Jest&color=C21325&logo=Jest&logoColor=FFFFFF&label=)

<!-- toc -->
* [gassi-cli](#gassi-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g gassi-cli
$ gassi COMMAND
running command...
$ gassi (-v|--version|version)
gassi-cli/0.2.1 darwin-arm64 node-v20.9.0
$ gassi --help [COMMAND]
USAGE
  $ gassi COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`gassi disconnect`](#gassi-disconnect)
* [`gassi execute [PARAMNAME] [PARAMVALUE]`](#gassi-execute-paramname-paramvalue)
* [`gassi help [COMMAND]`](#gassi-help-command)
* [`gassi query`](#gassi-query)
* [`gassi sync`](#gassi-sync)

## `gassi disconnect`

Sends a DISCONNECT request intent

```
USAGE
  $ gassi disconnect

OPTIONS
  -h, --help         show CLI help
  -t, --token=token  (required) oauth access token
  -u, --uri=uri      (required) uri of the service
```

_See code: [src/commands/disconnect.ts](https://github.com/Spissable/gassi-cli/blob/v0.2.1/src/commands/disconnect.ts)_

## `gassi execute [PARAMNAME] [PARAMVALUE]`

Sends an EXECUTE request intent

```
USAGE
  $ gassi execute [PARAMNAME] [PARAMVALUE]

OPTIONS
  -c, --command=command  command to execute
  -h, --help             show CLI help
  -i, --id=id            id to query
  -t, --token=token      (required) oauth access token
  -u, --uri=uri          (required) uri of the service
```

_See code: [src/commands/execute.ts](https://github.com/Spissable/gassi-cli/blob/v0.2.1/src/commands/execute.ts)_

## `gassi help [COMMAND]`

display help for gassi

```
USAGE
  $ gassi help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.18/src/commands/help.ts)_

## `gassi query`

Sends a QUERY request intent

```
USAGE
  $ gassi query

OPTIONS
  -h, --help         show CLI help
  -i, --id=id        id to query
  -t, --token=token  (required) oauth access token
  -u, --uri=uri      (required) uri of the service
```

_See code: [src/commands/query.ts](https://github.com/Spissable/gassi-cli/blob/v0.2.1/src/commands/query.ts)_

## `gassi sync`

Sends a SYNC request intent

```
USAGE
  $ gassi sync

OPTIONS
  -h, --help         show CLI help
  -t, --token=token  (required) oauth access token
  -u, --uri=uri      (required) uri of the service
```

_See code: [src/commands/sync.ts](https://github.com/Spissable/gassi-cli/blob/v0.2.1/src/commands/sync.ts)_
<!-- commandsstop -->
