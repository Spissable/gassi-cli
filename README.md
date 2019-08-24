# gassi-cli

Run SYNC, QUERY, EXECUTE and DISCONNECT requests easily

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gassi-cli.svg)](https://npmjs.org/package/gassi-cli)
[![Downloads/week](https://img.shields.io/npm/dw/gassi-cli.svg)](https://npmjs.org/package/gassi-cli)
[![License](https://img.shields.io/npm/l/gassi-cli.svg)](https://github.com/Spissable/gassi-cli/blob/master/package.json)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

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
gassi-cli/0.1.0 linux-x64 node-v10.16.0
$ gassi --help [COMMAND]
USAGE
  $ gassi COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`gassi disconnect`](#gassi-disconnect)
* [`gassi execute PARAMNAME PARAMVALUE`](#gassi-execute-paramname-paramvalue)
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

_See code: [src/commands/disconnect.ts](https://github.com/Spissable/gassi-cli/blob/v0.1.0/src/commands/disconnect.ts)_

## `gassi execute PARAMNAME PARAMVALUE`

Sends a QUERY request intent

```
USAGE
  $ gassi execute PARAMNAME PARAMVALUE

OPTIONS
  -c, --command=command  (required) command to execute
  -h, --help             show CLI help
  -i, --id=id            (required) id to query
  -t, --token=token      (required) oauth access token
  -u, --uri=uri          (required) uri of the service
```

_See code: [src/commands/execute.ts](https://github.com/Spissable/gassi-cli/blob/v0.1.0/src/commands/execute.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `gassi query`

Sends a QUERY request intent

```
USAGE
  $ gassi query

OPTIONS
  -h, --help         show CLI help
  -i, --id=id        (required) id to query
  -t, --token=token  (required) oauth access token
  -u, --uri=uri      (required) uri of the service
```

_See code: [src/commands/query.ts](https://github.com/Spissable/gassi-cli/blob/v0.1.0/src/commands/query.ts)_

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

_See code: [src/commands/sync.ts](https://github.com/Spissable/gassi-cli/blob/v0.1.0/src/commands/sync.ts)_
<!-- commandsstop -->
