# Get Started

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).
- You have installed [Expo CLI](https://docs.expo.dev/get-started/installation/).
- You have Xcode installed for iOS development.
- You have Android Studio installed for Android development.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/4cc3ssX/take-home-mobile.git
    cd take-home-mobile
    ```

2. Install the dependencies:
    ```sh
    yarn install
    ```

3. Prebuild the project:
    ```sh
    expo prebuild
    ```

## Running the App

### iOS

To run the app on an iOS simulator:

1. Start the Expo development tools:
    ```sh
    yarn ios
    ```

2. The app should automatically open in the iOS simulator. If not, you can open it manually from Xcode.

### Android

To run the app on an Android emulator:

1. Start the Expo development tools:
    ```sh
    yarn android
    ```

2. The app should automatically open in the Android emulator. If not, you can open it manually from Android Studio.

## Building the App

To build the app for production, use the following commands:
```sh
expo build:ios
expo build:android
```
