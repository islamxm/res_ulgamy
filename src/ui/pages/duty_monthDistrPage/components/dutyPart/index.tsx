import { FC } from 'react';
import classes from './classes.module.scss'
import { Row, Col, Select, Tag } from 'antd'
import Button from '@/ui/shared/button';
import { Duties } from '@/models/duty_models';
import { _duties } from '@/data/static';
import { DeleteOutlined } from '@ant-design/icons'
import Panel from '@/ui/shared/panel';
import { ResultDataItem } from '../../useContext';

type Props = {
  openModal: (...args: any[]) => void,
  data: ResultDataItem,
  saveDuties: (targets: Duties[]) => void,
  deleteGroup: (groupId: number) => void
}

const DutyPart: FC<Props> = ({
  openModal,
  data,
  saveDuties,
  deleteGroup
}) => {

  return (
    <Panel>
      <div className={classes.wrapper}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Row align={'top'} wrap={false} gutter={[10, 10]} className={classes.head}>
              <Col flex={'auto'}>
                <Select
                  defaultValue={data.targets}
                  className={classes.select}
                  mode='multiple'
                  size={'large'}
                  style={{ width: '100%' }}
                  placeholder={'Tabşyryklary saýla'}
                  options={Object.entries(_duties).map(f => ({ value: f[0], label: f[0] }))}
                  onChange={saveDuties}
                />
              </Col>
              <Col className={classes.action}>
                <Button onClick={() => deleteGroup(data.id)} colorVariant={'danger'} isCircle isIcon>
                  <DeleteOutlined />
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button onClick={openModal} colorVariant={'info'} styleVariant={'outlined'} isFill>
              {data.data.length > 0 && <Tag bordered={false} color={'blue-inverse'}><span >Saýlanan: {data.data.length}</span></Tag>                          
              } Harby gullukçylary saýla
            </Button>
          </Col>
        </Row>
      </div>
    </Panel>
  )
}

export default DutyPart;