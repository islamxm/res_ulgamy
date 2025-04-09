import { FC } from 'react'
import classes from './classes.module.scss'
import { Row, Col } from 'antd'
import { useSelector } from '@/store/hooks'
import Panel from '@/ui/shared/panel'
import BoxWithLabel from '@/ui/shared/boxWithLabel'
import Rank from '@/ui/shared/rank'
import capitalizeWord from '@/utils/capitalizeWord'
import Status from '@/ui/shared/status'

const MainCard: FC = () => {
  const { userData } = useSelector(s => s.staffPerson)
  const { dataBase: { positions, fractions } } = useSelector(s => s.main)

  if (userData) return (
    <div className={classes.wrapper}>
      <Panel>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <BoxWithLabel label="Familiýasy, ady we atasynyň ady">
              <div className={classes.part}>
                {`${userData.name.partial.lastName} ${userData.name.partial.firstName} ${userData.name.partial.fatherName}`}
              </div>
            </BoxWithLabel>
          </Col>
          <Col span={24}>
            <BoxWithLabel label="Harby ady">
              <div className={classes.part}>
                <Rank rank={userData.rank?.rank} contractType={userData.rank?.contract} />
              </div>
            </BoxWithLabel>
          </Col>
          <Col span={24}>
            <BoxWithLabel label="Bölümçesi">
              <div className={classes.part}>
                {capitalizeWord(fractions.find(frac => frac.id === userData.fractionId)?.name.staffName || '')}
              </div>
            </BoxWithLabel>
          </Col>
          <Col span={24}>
            <BoxWithLabel label="Wezipesi">
              <div className={classes.part}>
                {capitalizeWord(positions.find(pos => pos.id === userData.positionId)?.name.staffName || '')}
              </div>
            </BoxWithLabel>
          </Col>
          <Col span={24}>
            <BoxWithLabel label="Häzirki wagtda">
              <div className={classes.part}>
                <Status status={userData.status} />
              </div>
            </BoxWithLabel>
          </Col>
        </Row>
      </Panel>
    </div>
  )
  return null
}

export default MainCard