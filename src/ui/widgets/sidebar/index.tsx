import { CSSProperties, FC } from 'react';
import classes from './classes.module.scss'
import { useSelector } from '@/store/hooks';
import setClassNames from '@/utils/setClassNames';
import { SIDEBAR_WIDTH } from '@/data/constants';
import Menu from './components/menu';
import {
  FileTextOutlined,
  UsergroupAddOutlined,
  PushpinOutlined,
  SettingOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'
import Button from '@/ui/shared/button';

type Props = {
  style?:CSSProperties
}

const menuList = [
  {id: 1, path: '/docs', title: 'Resminamalar', icon: <FileTextOutlined/>, isActive: false},
  {id: 2, path: '/staff', title: 'Düzüm', icon: <UsergroupAddOutlined/>, isActive: false},
  {id: 3, path: '/duty', title: 'Tabşyryklar', icon: <PushpinOutlined/>, isActive: false},
  {id: 4, path: '/settings', title: 'Sazlamalar', icon: <SettingOutlined/>, isActive: false},
]

const Sidebar:FC<Props> = ({style}) => {
  const {isSidebarOpen} = useSelector(s => s.main)
  
  return(
    <div style={{width: isSidebarOpen ? SIDEBAR_WIDTH : 0, ...style}} className={setClassNames([classes.wrapper, isSidebarOpen && classes.open])}>
      <div className={classes.menu}>
        <Menu
          menuList={menuList}
          />
      </div>
      <div className={classes.ex}>
        <Button
          justify={'flex-start'} 
          isFill 
          baseSize={'small'} 
          beforeIcon={<InfoCircleOutlined/>} 
          styleVariant={'outlined'}
          >
          Ulgam hakynda
        </Button>
      </div>
    </div>
  )
}

export default Sidebar;