import { FC } from 'react';
import classes from './classes.module.scss'
import { Row, Col, Select, Tag, Tooltip } from 'antd'
import Button from '@/ui/shared/button';
import { Duties } from '@/models/duty_models';
import { _duties } from '@/data/static';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Panel from '@/ui/shared/panel';
import { DistributionFrac } from '@/models';

type Props = {
  openModal: (...args: any[]) => void,
  data: DistributionFrac['data'][0],
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
            <Row justify={'space-between'} align={'middle'} wrap={false} gutter={[10, 10]} className={classes.head}>
              <Col span={17}>
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
              <Col>
                <Row align={'middle'} gutter={[10, 10]}>
                  <Col>
                    {data.data.length > 0 && <Tag className={classes.tag} color={'gold'}><span >Saýlanan: {data.data.length}</span></Tag>
                    }
                  </Col>
                  <Tooltip
                    title='Harby gullukçylary saýla'
                    placement={'bottom'}
                  >
                    <Col>
                      <Button onClick={openModal} colorVariant={'info'} styleVariant={'solid'} isIcon isCircle beforeIcon={<EditOutlined />} />
                    </Col>
                  </Tooltip>
                  <Tooltip
                    title="Tabşyrygy poz"
                    placement={'bottom'}
                  >
                    <Col className={classes.action}>
                      <Button onClick={() => deleteGroup(data.id)} colorVariant={'danger'} styleVariant={'solid'} isCircle isIcon>
                        <DeleteOutlined />
                      </Button>
                    </Col>
                  </Tooltip>
                </Row>
              </Col>

            </Row>
          </Col>
          {/* <Col span={24}>
            <Row align={'middle'} justify={'end'} gutter={[15, 15]}>
              
            </Row>
          </Col> */}
        </Row>
      </div>
    </Panel>
  )
}

export default DutyPart;