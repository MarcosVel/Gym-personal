# Gym Personal

## Overview

Gym Personal is a gym training app that integrates with a backend to provide features like authentication, controlled forms, refresh tokens, and file uploads from the user photo gallery. This project showcases the use of declarative interfaces with a component library, and backend integration through a REST API.

## 🧐 Features

- **User Authentication**: Secure login and registration system with JWT and refresh tokens.
- **Training Management**: Create and view training sessions.
- **File Uploads**: Upload user profile pictures from the gallery.
- **Responsive Design**: Optimized for various screen sizes.
- **Notifications**: Push notifications using OneSignal.
- **RESTful API**: Backend services with Node.js and Express.
- **Declarative UI**: Built with a component library for clean and maintainable code.

## 💻 Front-end Technologies Used

- **Expo**: To streamline the development process having access to Android and iOS folders throught `expo-dev-client`.
- **TypeScript**: Ensures type safety and code quality.
- **Native Base**: Component library for building the UI.
- **Axios**: For making API requests.
- **React Native**: For navigation.
- **Hook-form & Yup**: For handling form state and validation.
- **React Navigation**: For navigation within the app.
- **Expo Image Picker**: For handling image uploads.
- **OneSignal**: For push notifications.

## Getting Started

### Prerequisites

- Node.js and yarn
- React Native CLI
- Expo CLI

### 🛠️ Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/MarcosVel/Gym-personal.git
    cd Gym-personal
    ```

2. **Backend Setup**:
    ```sh
    cd backend
    yarn
    yarn start
    ```

3. **Mobile App Setup**:
    ```sh
    cd mobile
    yarn
    npx expo start
    ```

### Configuration

**Mobile**:
- Update `mobile/.env.example` to `.env` and put your ONESIGNAL_APP_ID.
- Update `mobile/src/services/api.js` with your baseURL.

## Usage

1. **Start the backend server**:
    ```sh
    cd backend
    npm start
    ```

2. **Run the mobile app**:
    ```sh
    cd mobile
    npx expo start
    ```

3. **Access the app**:

Use the emulator or physical device to navigate through the app, manage training sessions, and interact with other features in real-time.

