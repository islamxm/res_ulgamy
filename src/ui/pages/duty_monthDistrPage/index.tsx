import { FC, useEffect, useState } from 'react';
import classes from './classes.module.scss'
import { Row, Col, DatePicker } from 'antd';
import Panel from '@/ui/shared/panel';
import dateLocalize from '@/utils/dateService';
import FractionPart from './components/fractionPart';
import { useMonthDistrContext } from './useContext';
import Button from '@/ui/shared/button';
import { DownloadOutlined } from '@ant-design/icons'

type Props = {

}

const Duty_MonthDistrPage: FC<Props> = () => {
  const { state, actions } = useMonthDistrContext()
  const [filterState, setFilterState] = useState()
  const [duties, setDuties] = useState()

  

  return (
    <div className={classes.wrapper}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Panel
            label="Haýsy aý"
          >
            <Row gutter={10}>
              <Col span={24}>
                <DatePicker
                  cellRender={dateLocalize.renderMonthNames}
                  value={state.month}
                  onChange={actions.updateMonth}
                  picker={'month'} />
              </Col>
            </Row>
          </Panel>
        </Col>
        <Col span={24}>
          <Panel
            label='Bölümçeler'
          >
            <Row gutter={[10, 20]}>
              {
                state.topLevelFractions.map(fraction => (
                  <Col span={24}>
                    <FractionPart
                      fraction={fraction}
                      result={state.result}
                    />
                  </Col>
                ))
              }
            </Row>
          </Panel>
        </Col>
        {
          state.result.length > 0 && (
            <Col span={24}>
              <Row gutter={[10, 10]}>
                <Col flex={'auto'}>
                  <Button
                    onClick={actions.getResult}
                    isFill
                    colorVariant={'success'}
                    styleVariant={'solid'}>
                    Ýatda sakla
                  </Button>
                </Col>
                <Col>
                  <Button
                    beforeIcon={<DownloadOutlined />}
                    styleVariant={'solid'}
                    colorVariant={'warning'}>
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