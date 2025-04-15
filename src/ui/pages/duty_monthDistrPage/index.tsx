import { FC, useEffect } from 'react';
import classes from './classes.module.scss'
import { Row, Col, DatePicker } from 'antd';
import Panel from '@/ui/shared/panel';
import dateLocalize from '@/utils/dateService';
import FractionPart from './components/fractionPart';
import Button from '@/ui/shared/button';
import { DeleteOutlined, DownloadOutlined, SaveOutlined } from '@ant-design/icons'
import docService from '@/utils/docService';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import useDutyDistr from './useDutyDistr';
import dateService from '@/utils/dateService';

const Duty_MonthDistrPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const {
    month,
    topLevelFractions,
    result,

    onMonthChange,
    deleteDistribution,
    saveDistribution,
  } = useDutyDistr(id)

  return (
    <div className={classes.wrapper}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Panel
            label="Haýsy aý"
          >
            <Row gutter={[10, 10]}>
              {
                !id && (
                  <Col span={24}>
                    <DatePicker
                      cellRender={dateLocalize.renderMonthNames}
                      value={month}
                      onChange={onMonthChange}
                      picker={'month'} />
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
        </Col>
        <Col className={classes.body} span={24}>
          <Row gutter={[10, 40]}>
            {
              topLevelFractions.map(fraction => (
                <Col key={fraction.id} span={24}>
                  <FractionPart
                    fraction={fraction}
                  />
                </Col>
              ))
            }
          </Row>
        </Col>
        {
          month && (
            <Col className={classes.action} span={24}>
              <Row justify={'center'} gutter={[10, 10]}>
                <Col>
                  <Button
                    onClick={saveDistribution}
                    colorVariant={'success'}
                    styleVariant={'solid'}
                    beforeIcon={<SaveOutlined />}
                  >
                    Ýatda sakla
                  </Button>
                </Col>
                <Col>
                  <Button
                    colorVariant={'danger'}
                    beforeIcon={<DeleteOutlined />}
                    onClick={deleteDistribution}
                  >
                    Aýlyk tabşyrygy poz
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled
                    onClick={() => docService.monthDistribution({
                      date: dayjs(month).format('MM.YYYY'),
                      body: result
                    }, topLevelFractions)}
                    beforeIcon={<DownloadOutlined />}
                    styleVariant={'outlined'}
                    colorVariant={'info'}>
                    Habarnamany ýükle
                  </Button>
                </Col>
              </Row>
            </Col>
          )
        }

      </Row>
    </div>
  )
}

export default Duty_MonthDistrPage