# Expo advanced topics

## Base workflow
The expo workflow is relatively simple: In essence, all JS / TS changes to the codebase can be instantly reflected in the app, unless the code changes (or newly installed packages) have affect to the native modules (parts of project that interact with native APIs such as camera, different sensors, etc.). In that case, the project has to be rebuilt.

![Core Development Loop](https://docs.expo.dev/static/images/guides/core-development-loop-light.png)

### EAS & CNG
Expo provides two ways to build apps. Expo Application Services (EAS) provide way to build apps for Android and iOS platforms, performing the build process on EAS servers. It is very useful when building application on non-MacOS device that does not have XCode installed. Continuous Native Generation (CNG) on the other hand, provides a way to manage and build both Android and iOS apps locally on developer's machine, essentially generating two different codebases, one for each platform.

#### EAS
Expo Application Services (EAS) is a set of hosted tools that help with parts of app development where local machines are not great. It proides an infrastructure for performing builds on their servers, channels for sending over-the-air (OTA) updates, submitting app bundles to application stores, and insights regarding crashes, build performance and update rollouts. EAS also makes it easy to integrate app builds into project CI / CD pipeline, so builds could be executed automatically from automations (such as Github Actions or Gitlab CI/CD).

#### CNG
Continuous Native Generation (CNG) is a workflow concept and tooling that allows users to generate iOS and Android projects on demand. The core workflow is to make changes to JS / TS codebase, and then generate iOS and Android codebases from that with simple commands on developer's machine. CNG is flexible and allows developers to use what is known as config plugins from expo/config-plugins API. Config plugins essentially can be defined as a small JS / TS function, that edits native configuration files (AndroidManifest.xml and Info.plist). Config plugins are used by many Expo APIs (such as expo-camera for defining permissions), but developers can create their own config plugins if needed. It makes it easier to maintain two codebases in sync. The downsides of CNG are the native code is only Generated and manual edits can will be overwritten by the next generation process.<br/>
CNG treats native code as an artifact, not as a source, which is different from regular (bare) React Native workflow, where /android and /ios folders are treated as source. <br/>


Config plugin can be defined like this:<br/><br/>
![Definition of a custom config plugin in JS](./assets/expo-config-plugin.png)
<br/>
<br/>
After generation of native codebases, the plugin configuration will be transfered to according native configurations.<br/><br/>
![Config plugin output to native configurations](./assets/expo-config-plugin-result.png)
<br/>
<br/>
#### sources
1. Continuous Native Generation (CNG): https://docs.expo.dev/workflow/continuous-native-generation/
2. Create and use config plugins: https://docs.expo.dev/config-plugins/plugins/
3. Create your first build: https://docs.expo.dev/build/setup/
4. Get started with EAS workflows: https://docs.expo.dev/eas/workflows/get-started/
5. Use Expo EAS Build for Free: Local and Cloud Workflow: https://www.khueapps.com/blog/article/how-to-use-expo-eas-build-totally-free
6. Exploring Expo Application Services: Building, Deploying and Managing Mobile Apps with Ease.: https://dev.to/adii9/exploring-expo-application-services-building-deploying-and-managing-mobile-apps-with-ease-b0e

