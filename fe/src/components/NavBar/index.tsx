import React, { useState } from 'react';
import { TabBar, Icon, IconProps } from 'zarm';
import { useHistory } from 'react-router-dom';
import { iconUrl } from '@/constants'
import './index.less';

const MyIcon: React.FunctionComponent<IconProps> = Icon.createFromIconfont(iconUrl);

type Path = string | number | undefined
type ChangeTab = (path: Path) => void

interface Props {
  /** 用于控制导航栏的显示隐藏 */
  showNav: boolean
}

const NavBar = (props: Props) => {
  const [activeKey, setActiveKey] = useState<Path>('/');
  const history = useHistory()
  const { showNav } = props
  const changeTab:ChangeTab = (path) => {
    setActiveKey(path)
    history.push(path)
  }

  return (
    <TabBar className="layout-tabbar" visible={showNav} activeKey={activeKey} onChange={changeTab}>
      <TabBar.Item
        itemKey="/"
        title="账单"
        icon={<MyIcon type="icon-zhangdan1" />}
      />
      <TabBar.Item
        itemKey="/data"
        title="统计"
        icon={<MyIcon type="icon-tongji" />}
      />
      <TabBar.Item
        itemKey="/user"
        title="我的"
        icon={<MyIcon type="icon-wode" />}
      />
    </TabBar>
  );
};

export default NavBar;