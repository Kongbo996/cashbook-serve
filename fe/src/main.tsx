import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import { ConfigProvider } from 'zarm';
import 'lib-flexible/flexible';
import Layout from '@/layout';

ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Layout />
      </Suspense>
    </Router>
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
