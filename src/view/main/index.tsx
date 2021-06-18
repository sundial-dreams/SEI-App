import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import { Switch } from 'react-router';
import { Route, BrowserRouter, HashRouter } from 'react-router-dom';

import { WindowControlButton } from '../public/components';
import { SideBar, Toolbox } from './components';
import Main from './pages/Main';
import { store, StoreState } from './tools/store';

// @ts-ignore
import styles from './index.scss';
import '~assets/styles/reset.g.scss';
import '~assets/styles/window.g.scss';
import { ROUTER } from './tools';


export default function App() {
  const current = useSelector((state: StoreState) => state.current);
  useEffect(() => {
    console.log('current', current);
  }, [current]);

  return (
    <div className={styles.app} id="page">
      <div className={styles.header}>
        <WindowControlButton/>
        <div className={styles.toolbox_wrapper}>
          <Toolbox/>
        </div>
      </div>
      <HashRouter>
        <div className={styles.content}>
          <div className={styles.side_bar_wrapper}>
            <SideBar/>
          </div>
          <div className={styles.page_wrapper}>
            <Switch>
              <Route exact path={ROUTER.MAIN}>
                <Main/>
              </Route>
              <Route path={ROUTER.OTHER}>
                <div>
                  test 2
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}


const isDev = process.env.NODE_ENV === 'development';

const Root = () => (<Provider store={store}><App/></Provider>)

const Container = isDev ? hot(Root) : (Root);

ReactDOM.render(
  <Container/>,
  document.getElementById('root')
);
