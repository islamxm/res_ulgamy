import { FC } from 'react';
import { Col, Row, Tag } from 'antd';
import { type PersonCurrentState as PCS } from '@/models';
import { _personCurrentState } from '@/data/static';
import { PresetColorType } from 'antd/es/_util/colors';
import classes from './classes.module.scss'

type Props = {
  status: PCS | PCS[]
}

const statusObj: Record<PCS, { color: PresetColorType }> = {
  'hassahana': { color: 'red', },
  'sapar': { color: 'orange' },
  'rugsat': { color: 'cyan' },
  'tussag': { color: 'purple' },
  'tabsyryk': { color: 'blue' },
  'jogapkar': { color: 'magenta' },
  'hbotg': { color: 'volcano' },
  'nyzamda': { color: 'green' },
  'sapara_gelen': { color: 'geekblue' },
  'yorite': {color: 'red-inverse'}
}

const Status: FC<Props> = ({
  status
}) => {
  if (status instanceof Array) {
    return (
      <Row gutter={[3, 3]}>
        {
          status.map(stat => (
            <Col>
              <Tag className={classes.tag} color={statusObj[stat].color}>{_personCurrentState[stat]}</Tag>
            </Col>
          ))
        }
      </Row>
    )
  } else {
    return (
      <Tag className={classes.tag} color={statusObj[status].color}>{_personCurrentState[status]}</Tag>
    )
  }
}

export default Status;