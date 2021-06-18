import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Icons, { OfficeXSIconNameType } from '../../public/components/Icons';
import { cls } from '../../public/tools';
import { setCurrent } from '../tools/slices';
import { StoreState } from '../tools/store';
import { ROUTER, RouterType } from '../tools';

// @ts-ignore
import styles from './index.scss';

const menuNames: Array<OfficeXSIconNameType> = ['home', 'folder', 'toolbox', 'delete'];

export function SideBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const current = useSelector((state: StoreState) => state.current);

  const menuElem = menuNames.map((name, i) => {
    const handleClick = () => {
      if (current === i) return;
      dispatch(setCurrent(i));
      history.push(Object.keys(ROUTER).map((k: RouterType) => ROUTER[k])[i]);
    };

    return (
      <button key={i} className={cls(i === current && styles.active)} onClick={handleClick}>
        <Icons.OfficeXS name={name}/>
      </button>
    );
  });

  return (
    <div className={styles.side_bar}>
      <div className={styles.menu}>
        {menuElem}
      </div>
    </div>
  );
}

export function Toolbox() {

  return (
    <div className={styles.toolbox}>
      <div className={styles.search_wrapper}>
        <span className={styles.icon_wrapper}>
          <Icons.FluentSystem name={'clock'}/>
        </span>
        <input className={styles.search} placeholder={'search'}/>
      </div>
      <div className={styles.tooltip}>
        <Icons.OfficeXS name={'menu'}/>
        <Icons.OfficeXS name={'idea'}/>
        <Icons.OfficeXS name={'info'}/>
        <div className={styles.user_avatar}>
          <Icons.CircleBubble name={"sun"}/>
        </div>
      </div>
    </div>
  );
}

type IconPositionType = 'left' | 'right' | 'top' | 'bottom';

export function IconButton({
                             text,
                             icon,
                             className = '',
                             position = 'left'
                           }: { text: string, icon: React.ReactElement, className?: string, position?: IconPositionType }) {

  const leftOrTopElem = (<>
    {icon}<span className={cls(styles.text, position === 'top' && styles.top)}>{text}</span>
  </>);

  const rightOrBottomElem = (<>
    <span className={cls(styles.text, position === 'bottom' && styles.bottom)}>{text}</span>{icon}
  </>);

  let elem = (position === 'left' || position === 'top') ? leftOrTopElem : rightOrBottomElem;

  return (
    <button className={cls(styles.icon_button, className)}>
      {elem}
    </button>
  );
}

interface IModel {
  name: string,
  path: string
}

export function ModelModal({models, onCancel}: {models?: IModel[], onCancel: () => void}) {
  const confirm = () => {

  };

  return (
    <div className={styles.model_modal}>
      <div className={styles.btn_group}>
        <button onClick={confirm}>
          confirm
        </button>
        <button onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  )
}
