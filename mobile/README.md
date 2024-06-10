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

## Install app on device and run

```bash
  npx expo run:android
```

## Run with expo-dev-clint

```bash
  npx expo start --dev-client
```

## List schemes

```bash
  npx uri-scheme list
```

run test on android

```bash
  npx uri-scheme open igniteshoes://<deviceip>:8081 --android
```

testing navigation of deep link

```bash
  npx uri-scheme open igniteshoes://details/7 --android
```
