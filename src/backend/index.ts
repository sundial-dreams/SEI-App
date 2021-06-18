import { app } from 'electron';
import MainWidget from './widgets/main';


const Main = MainWidget.getInstance();

app.whenReady().then(() => {
  Main.build();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => Main.build());



