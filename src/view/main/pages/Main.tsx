import React from 'react';
import Icons from '../../public/components/Icons';
import { IconButton, ModelModal } from '../components';
import { cls } from '../../public/tools';
import { CardBarChart, DashboardLineChart } from '../components/Charts';
import { modal } from '../../public/components';
// @ts-ignore
import styles from './Main.scss';


export default function Main() {

  return (
    <div className={styles.main_page} id="page">
      <div className={styles.dashboard_wrapper}>
        <Dashboard/>
      </div>
      <div className={styles.card_wrapper}>
        <Card/>
      </div>
    </div>
  );
}

// Dashboard
function Dashboard() {

  const handleClick = () => {
    modal((cancel) => (<ModelModal onCancel={cancel}/>));
  };
  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>
        Dashboard
      </h2>
      <h4 className={styles.chart_name}>
        chart name
      </h4>
      <div className={styles.dashboard_charts}>
        <div className={styles.chart_block_list}>
          <div className={styles.chart_block}>
            <DashboardLineChart/>
          </div>
        </div>
        <div className={styles.select}>
          <div className={styles.button_group}>
            <IconButton className={cls(styles.btn, styles.active)} text="chart1" position={'top'}
                        icon={<Icons.FluentSystem name={'folder'}/>}/>
            <IconButton className={styles.btn} text="chart2" position={'top'}
                        icon={<Icons.FluentSystem name={'toolbox'}/>}/>
            <IconButton className={styles.btn} text="chart3" position={'top'}
                        icon={<Icons.FluentSystem name={'briefcase'}/>}/>
          </div>
          <div className={styles.model} onClick={handleClick}>
            <button className={styles.model_btn}>
              MODEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.state_tab}>
        <IconButton className={cls(styles.btn, styles.active)} text={'props1'}
                    icon={<Icons.FluentSystem name={'add-bookmark'}/>}/>
        <IconButton className={styles.btn} text={'props2'} icon={<Icons.FluentSystem name={'briefcase'}/>}/>
        <IconButton className={styles.btn} text={'props2'} icon={<Icons.FluentSystem name={'idea'}/>}/>
      </div>
      <div className={styles.props_card}>
        <div className={styles.title}>
          <h2>Props name</h2>
          <button><Icons.FluentSystem name={'clock'}/></button>
        </div>
        <div className={styles.props_block}>
          <div className={styles.title}>
            <h4>props</h4>
          </div>
        </div>
        <div className={styles.classify_block}>
          <div className={styles.title}>
            <h4>class</h4>
          </div>
          <div className={styles.chart_block}>
            <CardBarChart/>
          </div>
        </div>
      </div>
    </div>
  );
}


