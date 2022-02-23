import React, { lazy, Suspense } from 'react';
import Cookies from 'js-cookie';
import PageHeader from '../../components/PageHeader';
import SideNav from '../../components/SideNav';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './styles.module.scss';
import { useQuery } from 'react-query';
import { loadProfile } from '../../api/profile';

const Tasks = lazy(() => import('../../pages/Tasks'));
const Accounts = lazy(() => import('../../pages/Accounts'));
const Songs = lazy(() => import('../../pages/Songs'));
const DetailSong = lazy(() => import('../../pages/Songs/DetailSong'));
const EditSong = lazy(() => import('../../pages/Songs/EditSong'));

export default function PageWrapper() {
  const isAuthenticated = !!Cookies.get('token');
  // const { data: profile } = useQuery('profile', loadProfile, {
  //   enabled: isAuthenticated,
  // });

  if (!isAuthenticated) return <Redirect to="/login" />;
  // if (!profile) return null;
  return (
    <div className={styles.pageWrapper}>
      <SideNav />
      <div className={styles.mainWrapper}>
        <PageHeader />
        <div className={styles.pageContent}>
          <Suspense fallback={null}>
            <Switch>
              <Route path="/tasks" component={Tasks} />
            </Switch>
            <Switch>
              <Route path="/accounts" component={Accounts} />
            </Switch>
            <Switch>
              <Route path="/songs" component={Songs} />
            </Switch>
            <Switch>
              <Route path="/song/add" component={EditSong} />
            </Switch>
            <Switch>
              <Route path="/song/detail/:id" component={DetailSong} />
            </Switch>
            <Switch>
              <Route path="/song/edit/:id" component={EditSong} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
