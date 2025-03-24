import { FC, ReactNode } from 'react';
import { Col, Row } from 'antd';
import MenuItem from '../menuItem';
import { useLocation } from 'react-router';

type Props = {
  menuList: {
    id: number,
    path: string,
    title: string,
    icon: ReactNode,
    isActive: boolean
  }[]
}

const Menu: FC<Props> = ({
  menuList
}) => {
  const {pathname} = useLocation()
  return (
    <Row gutter={[10, 10]}>
      {
        menuList.map(menuItem => (
          <Col span={24} key={menuItem.id}>
            <MenuItem
              {...menuItem}
              isActive={pathname.includes(menuItem.path)}
            />
          </Col>
        ))
      }
    </Row>
  )
}

export default Menu