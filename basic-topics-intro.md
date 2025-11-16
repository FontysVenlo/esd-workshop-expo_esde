## Intro
- Question - what do you remember from project 3? What were the biggest strugles you had? 
- Expo fixes most of this by providing a centralised framework for all platforms simultanuesly - ios, android and web - all from a single code base.
## Slides
- What is expo?
  - A toolchain built on top of React Native
  - Helps build, test and ship apps faster
  - handles all the messy native setup for you
  - Lets you start coding right away, no environment pain - no Xcode, andnroid studio + something extra for web
- Expo vs Traditional react native
  - Batteries-included development
  - Preconfigured native modules
  - Expo Go
  - EAS for builds & updates
  - Still write react native - expo is the platform around it
- Why expo exists
  - Simplify mobile dev
  - reduce build times
  - make cross-platform work actually feasible
  - Unify iOS/Android/Web development

### Key Features (Slides)
- Key developer-experience features
  - Create app app with one command
  - Fast refresh
  - expo router
  - web preview
  - Exxpo Go
- Project structure &router
  - show a simple tree, highlight main points:
    - app/
    - app/index.tsx
    - app/[id].tsx (dynamic routes)
    - package.json
    - app.json (config)
  - Uses file-based router similar to nextjs
  - Routes are pages
  - Easy to reason about and navigate
## Terminal
- Create a  project in terminal with ```npx create-expo-app```
  - Generates everything needed
  - No android/iOS setup required
- Start dev server with ```npx expo start```
  - Starts metro bundler,
  - Serves Web  + Expo Go
  - Keybindings (w, a, i, r ...)
- Change code - instant update


## Summary
- Expo is a platform that makes building with React Native faster and easier.
- You don’t need any native setup — Expo handles that.
- You can build for iOS, Android, and Web from the same codebase.
- Fast Refresh makes changes appear instantly.
- Expo Router helps organize your app via file-based navigation.
- Basic commands: create app, start server, open on device/web.
- Today we’ll see all platforms updating at once in real time.


