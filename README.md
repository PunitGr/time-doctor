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
  ![Inactive main window](/screenshots/Screen Shot 2018-07-31 at 6.09.15 AM)

  ![Inactive widget](/screenshots/Screen Shot 2018-07-31 at 6.09.39 AM)

* **Timer play (Active)**
  ![Active main window](/screenshots/Screen Shot 2018-07-31 at 6.09.57 AM.png)

  ![Inactive widget](/screenshots/Screen Shot 2018-07-31 at 6.10.00 AM.png)

