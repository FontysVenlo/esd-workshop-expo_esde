# Expo starter guide

## Installation

### Prerequisites
* Node.js (at least v14)
* Expo go app on the phone (optional, for previewing the app in real time on the device)

Similar to lots of Web dev frameworks, command `npx create-expo-app@latest` creates a project directory of a new expo project. All dependencies then have to be installed.

## Base workflow
The expo workflow is relatively simple: In essence, all JS / TS changes to the codebase can be instantly reflected in the app, unless the code changes (or newly installed packages) have affect to the native modules (parts of project that interact with native APIs such as camera, different sensors, etc.). In that case, the project has to be rebuilt.

![Core Development Loop](https://docs.expo.dev/static/images/guides/core-development-loop-light.png)

### Routing
Similarly to web framework Next.js, Expo provides a router API, which can be used to easily create a file-based navigation system in the app.
