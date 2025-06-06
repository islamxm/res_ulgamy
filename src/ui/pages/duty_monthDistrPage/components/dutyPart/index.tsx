import { FC } from 'react';
import classes from './classes.module.scss'
import { Row, Col, Select, Tag, Tooltip } from 'antd'
import Button from '@/ui/shared/button';
import { Distr, Duties } from '@/models/duty_models';
import { _duties } from '@/data/static';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Panel from '@/ui/shared/panel';


type Props = {
  openModal: (...args: any[]) => void,
  data: Distr[0]['data'][0],
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
                  options={Array.from(_duties).map(f => ({ value: f, label: f }))}
                  // options={Array.from(_duties).map(f => ({ value: f, label: f })).filter(f => 
                  //   f.value !== 'Içerki garawul serkerdesiniň kömekçisi' &&
                  //   f.value !== 'Içerki garawul çalşyryjy' &&
                  //   f.value !== 'Içerki garawul sakçy' &&
                  //   f.value !== 'Garnizon garawul serkerdesiniň kömekçisi' &&
                  //   f.value !== 'Garnizon garawulynyň daşyna çykaryjysy' &&
                  //   f.value !== 'Garnizon garawulynyň çalşyryjysy' &&
                  //   f.value !== 'Garnizon garawul sakçy' 
                  // )}
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