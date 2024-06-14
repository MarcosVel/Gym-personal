## Run app

To run with a physical device

```bash
  adb devices
```

```bash
  adb tcpip 5555
```

```bash
  adb connect deviceip:5555
```

## After a lib installation to apply changes on the native code

```bash
  npx expo prebuild
```

## Install app on device and run

```bash
  npx expo run:android
```

## Run with expo-dev-clint

```bash
  yarn start
```

## List schemes

```bash
  npx uri-scheme list
```

run test on android

```bash
  npx uri-scheme open ignitegym://<deviceip>:8081 --android
```

testing navigation of deep link

```bash
  npx uri-scheme open ignitegym://details/7 --android
```
