import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import { cls } from '../tools';
import { ipcRenderer } from 'electron';

// @ts-ignore
import styles from './index.scss';

type EmptyFunc = () => void;

export interface IWindowControlButton {
  close?: boolean,
  onClose?: EmptyFunc,

  minimize?: boolean,
  onMinimize?: EmptyFunc,

  maximize?: boolean,
  onMaximize?: EmptyFunc
}

const handleClose = () => ipcRenderer.send("__CLOSE__");

const handleMaximize = () => ipcRenderer.send("__MAXIMIZE__");

const handleMinimize = () => ipcRenderer.send("__MINIMIZE__");


export function WindowControlButton({
                                      close = true,
                                      maximize = true,
                                      minimize = true,
                                      onMinimize = handleMinimize,
                                      onClose = handleClose,
                                      onMaximize = handleMaximize
                                    }: IWindowControlButton = {}) {


  return (
    <div className={styles.window_control_button}>
      <button className={cls(!close && styles.disable)}
              disabled={!close}
              onClick={onClose}
      />
      <button className={cls(!minimize && styles.disable)}
              disabled={!minimize}
              onClick={onMinimize}
      />
      <button className={cls(!maximize && styles.disable)}
              disabled={!maximize}
              onClick={onMaximize}
      />
    </div>
  );
}



export function modal(contentFunction: (cancel: () => void) => ReactNode) {
  const div = document.createElement('div');

  div.className = styles.__layer__wrapper

  const root = document.getElementById('root');

  root?.appendChild(div);

  function destroy() {
    div.parentNode?.removeChild(div);
  }

  function Layer(props: {}) {

    const [hidden, setHidden] = useState(false);

    const onCancel = () => {
      setHidden(true);
      setTimeout(() => destroy(), 700);
    }

    return (
      <div className={cls(styles.__layer, hidden ? styles.hidden : styles.display)}>
        { contentFunction(onCancel) }
      </div>
    )
  }

  ReactDOM.render(<Layer/>, div);
}

