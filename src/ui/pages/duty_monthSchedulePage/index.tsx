import { FC } from 'react';
import classes from './classes.module.scss'
import { Row, Col, DatePicker, message } from 'antd'
import { PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons'
import { useParams } from 'react-router';
import Button from '@/ui/shared/button';
import Panel from '@/ui/shared/panel';
import useSwitcher from '@/hooks/useSwitcher';
import dateService from '@/services/dateService';
import SelectDutyModal from './modals/selectDutyModal';
import Group from './components/group';
import useDutySchedule from './useDutySchedule';

const Duty_monthSchedulePage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, close, open } = useSwitcher(false)
  const {
    data,
    month,

    saveSelectedDuties,
    onMonthChange,
    saveSchedule,
    deleteSchedule
  } = useDutySchedule(id)


  return (
    <div className={classes.wrapper}>
      <SelectDutyModal
        modalProps={{ open: isOpen, onCancel: close }}
        onSave={saveSelectedDuties}
      />
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <div className={classes.date}>
            <Panel label='Haýsy aý'>
              <Row gutter={[10, 10]}>
                {
                  !id && (
                    <Col span={24}>
                      <DatePicker.MonthPicker
                        value={month}
                        placeholder='Aýyny saýla'
                        cellRender={dateService.renderMonthNames}
                        onChange={onMonthChange}
                      />
                    </Col>
                  )
                }
                {
                  month && (
                    <Col span={24}>
                      <Button baseSize='large' colorVariant={'info'} styleVariant={'simple'}>
                        <strong>{dateService.getMonthName(month.month())} aýy</strong>
                      </Button>
                    </Col>
                  )
                }
              </Row>
            </Panel>
          </div>
        </Col>
        {
          data.length > 0 && (
            <Col span={24}>
              <div className={classes.main}>
                <Row gutter={[20, 20]}>
                  {
                    data.map((d, dIndex) => (
                      <Col key={dIndex} span={24}>
                        <Group
                          index={dIndex}
                          data={d}
                        />
                      </Col>
                    ))
                  }
                </Row>
              </div>
            </Col>
          )
        }
        <Col span={24}>
          <div className={classes.action}>
            <Row justify={'center'} gutter={[10, 10]}>
              <Col>
                <Button
                  disabled={!month}
                  onClick={open}
                  beforeIcon={<PlusOutlined />}
                  colorVariant={'success'}>
                  Tabşyrygy goş
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={saveSchedule}
                  beforeIcon={<SaveOutlined />}
                  colorVariant={'info'}>
                  Ýatda sakla
                </Button>
              </Col>
              {
                id && (
                  <Col>
                    <Button
                      onClick={deleteSchedule}
                      colorVariant={'danger'}
                      beforeIcon={<DeleteOutlined />}
                    >
                      Rejäni poz
                    </Button>
                  </Col>
                )
              }
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Duty_monthSchedulePage;