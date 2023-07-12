<!--
@since 2023.02.07, 20:04
@changed 2023.07.12, 16:53
-->

# Tournament game client app

- Version: 0.0.10
- Last changes timestamp: 2023.03.17, 13:38

## Design layout

- [Figma](https://www.figma.com/file/C1ylOhuxpqwMitM11JHE8Y/%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%2F-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B?node-id=2323%3A1061&t=vjG6YjAtpOyUFoIc-0)

## Client & server

Server repo: https://github.com/lilliputten/tournament-game-server

Client repo: https://github.com/lilliputten/tournament-game-client

## Install

Install all required node dependencies:

```
npm i
```

## Start dev server

Start dev server (locate in browser with `http://localhost:3000`):

```
npm run start
```

## Make build

```
npm run build
```

## Build and publish

For success publishing the deploy environment should be propeply set up (see
npm script command `postinstall-publish-submodule`).

```
npm run build-and-publish
```

To just publish previously created build:

```
npm run publish
```

## Deploy server

When publishing, the project is deployed to
[https://tournament-game-build.march.team/](https://tournament-game-build.march.team/)
(access credentials are provided by request).
