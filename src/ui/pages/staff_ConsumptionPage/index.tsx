import { FC, useEffect, useState } from 'react'
import classes from './classes.module.scss'
import { Row, Col } from 'antd'
import { useSelector } from '@/store/hooks'
import setClassNames from '@/utils/setClassNames'
import staffService from '@/utils/staffService'
import { Fraction, PersonCB, PersonFull } from '@/models'
type Props = {

}

const Staff_ConsumptionPage: FC<Props> = () => {
  const { dataBase } = useSelector(s => s.main)
  const { fractions } = dataBase
  const [data, setData] = useState<(Fraction & { personnel: PersonFull[] })[]>([])
  const [total, setTotal] = useState<PersonCB[]>([])

  useEffect(() => {
    let mainFrac = fractions.filter(frac => frac.isMainFrac)
    if (mainFrac.length > 0) {
      setData(mainFrac.map(f => {
        let personnel = staffService.getPersonnelInFraction(f.id, dataBase).cb
        return {
          ...f,
          personnel
        }
      }))
    }
  }, [])

  useEffect(() => {
    data.length > 0 && setTotal(data.map(d => d.personnel).flat())
  }, [data])

  return (
    <div className={classes.wrapper}>
      <Row gutter={[10, 10]}>
        {
          data.map((frac, index) => (
            index === data.length - 1 ? (
              <Col span={4}>
                <div className={classes.part}>
                  <div className={classes.title}>
                    {frac.name.shortName}
                  </div>
                  <div className={classes.body}>
                    <Row gutter={[5, 3]}>
                      <Col className={setClassNames([classes.row, classes.total])} span={24}>
                        <span className={classes.label}>San boýunça: </span>{frac.personnel.length}
                      </Col>
                      <Col className={classes.row} span={24}>
                        <span className={classes.label}>Tabşyryk: </span>
                        {staffService.getCountOfPersonnelFromStatus('tabsyryk', frac.personnel)}
                      </Col>
                      <Col className={classes.row} span={24}>
                        <span className={classes.label}>Hassahana: </span>
                        {staffService.getCountOfPersonnelFromStatus('hassahana', frac.personnel)}
                      </Col>
                      <Col className={classes.row} span={24}>
                        <span className={classes.label}>Rugsat: </span>
                        {staffService.getCountOfPersonnelFromStatus('rugsat', frac.personnel)}
                      </Col>
                      <Col className={classes.row} span={24}>
                        <span className={classes.label}>Iş saparyna giden: </span>
                        {staffService.getCountOfPersonnelFromStatus('sapar', frac.personnel)}
                      </Col>
                      <Col className={setClassNames([classes.row, classes.dontCount])} span={24}>
                        <span className={classes.label}>Iş saparyna gelen: </span>
                        {staffService.getCountOfPersonnelFromStatus('sapara_gelen', frac.personnel)}
                      </Col>
                      <Col className={setClassNames([classes.row, classes.nyz])} span={24}>
                        <span className={classes.label}>Nyzamda: </span>
                        {staffService.getCountOfPersonnelFromStatus('nyzamda', frac.personnel)}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            ) : (
              <Col span={5}>
                <div className={classes.part}>
                  <div className={classes.title}>
                    {frac.name.shortName}
                  </div>
                  <div className={classes.body}>
                    <Row gutter={[5, 3]}>
                      <Col className={setClassNames([classes.row, classes.total])} span={24}>
                        <span className={classes.label}>San boýunça: </span>{frac.personnel.length}
                      </Col>
                      <Col className={classes.row} span={24}>
                        <span className={classes.label}>Tabşyryk: </span>
                        {staffService.getCountOfPersonnelFromStatus('tabsyryk', frac.personnel)}
                      </Col>
                      <Col className={classes.row} span={24}>
                        <span className={classes.label}>Hassahana: </span>
                        {staffService.getCountOfPersonnelFromStatus('hassahana', frac.personnel)}
                      </Col>
                      <Col className={classes.row} span={24}>
                        <span className={classes.label}>Rugsat: </span>
                        {staffService.getCountOfPersonnelFromStatus('rugsat', frac.personnel)}
                      </Col>
                      <Col className={classes.row} span={24}>
                        <span className={classes.label}>Iş saparyna giden: </span>
                        {staffService.getCountOfPersonnelFromStatus('sapar', frac.personnel)}
                      </Col>
                      <Col className={setClassNames([classes.row, classes.dontCount])} span={24}>
                        <span className={classes.label}>Iş saparyna gelen: </span>
                        {staffService.getCountOfPersonnelFromStatus('sapara_gelen', frac.personnel)}
                      </Col>
                      <Col className={setClassNames([classes.row, classes.nyz])} span={24}>
                        <span className={classes.label}>Nyzamda: </span>
                        {staffService.getCountOfPersonnelFromStatus('nyzamda', frac.personnel)}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            )
          ))
        }

        <Col span={24}>
          <div className={setClassNames([classes.part, classes.total])}>
            <div className={classes.title}>Umumy</div>
            <div className={classes.body}>
              <Row gutter={[5, 3]}>
                <Col className={setClassNames([classes.row, classes.total])} span={24}>
                  <span className={classes.label}>San boýunça: </span>{total.length}
                </Col>
                <Col className={classes.row} span={24}>
                  <span className={classes.label}>Tabşyryk: </span>
                  {staffService.getCountOfPersonnelFromStatus('tabsyryk', total)}
                </Col>
                <Col className={classes.row} span={24}>
                  <span className={classes.label}>Hassahana: </span>
                  {staffService.getCountOfPersonnelFromStatus('hassahana', total)}
                </Col>
                <Col className={classes.row} span={24}>
                  <span className={classes.label}>Rugsat: </span>
                  {staffService.getCountOfPersonnelFromStatus('rugsat', total)}
                </Col>
                <Col className={classes.row} span={24}>
                  <span className={classes.label}>Iş saparyna giden: </span>
                  {staffService.getCountOfPersonnelFromStatus('sapar', total)}
                </Col>
                <Col className={setClassNames([classes.row, classes.dontCount])} span={24}>
                  <span className={classes.label}>Iş saparyna gelen: </span>
                  {staffService.getCountOfPersonnelFromStatus('sapara_gelen', total)}
                </Col>
                <Col className={setClassNames([classes.row, classes.nyz])} span={24}>
                  <span className={classes.label}>Nyzamda: </span>
                  {staffService.getCountOfPersonnelFromStatus('nyzamda', total)}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Staff_ConsumptionPage