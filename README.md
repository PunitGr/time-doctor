# Time doctor
Electron app to track the work time.

## Installation and setup

```
git clone git@github.com:PunitGr/time-doctor.git
cd time-doctor
yarn
yarn start
yarn electron // Open another tab
```

### Description
```
- The app uses `redux-electron-store` and `redux-thunk` to sync the actions between multiple windows.
- Uses styled components for styling.
- The widget is draggable. Go to `Electron > Open widget` to show the widget.
```

### Screenshots

* **Timer stopped (Inactive)**

  ![Inactive main window](/screenshots/Screen%20Shot%202018-07-31%20at%206.09.15%20AM.png)

  ![Inactive widget](/screenshots/Screen%20Shot%202018-07-31%20at%206.09.39%20AM.png)

* **Timer play (Active)**

  ![Active main window](/screenshots/Screen%20Shot%202018-07-31%20at%206.09.57%20AM.png)

  ![Inactive widget](/screenshots/Screen%20Shot%202018-07-31%20at%206.10.00%20AM.png)

**Note: The format of time displayed in the main window is `HH:MM:SS` and in the widget is `HH:MM`.**
