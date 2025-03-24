import { FC } from 'react';
import { Col, Row, Tag } from 'antd';
import { type PersonCurrentState as PCS, personCurrentState } from '@/models';
import { PresetColorType } from 'antd/es/_util/colors';

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
  'sapara_gelen': { color: 'geekblue' }
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
              <Tag color={statusObj[stat].color}>{personCurrentState[stat]}</Tag>
            </Col>
          ))
        }
      </Row>
    )
  } else {
    return (
      <Tag color={statusObj[status].color}>{personCurrentState[status]}</Tag>
    )
  }
}

export default Status;