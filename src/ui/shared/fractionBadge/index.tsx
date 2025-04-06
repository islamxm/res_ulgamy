import { FC, useEffect, useState } from 'react';
import classes from './classes.module.scss'
import { Fraction } from '@/models';
import { Col, Row, Tag, Tooltip } from 'antd';
import { UsergroupAddOutlined, StarOutlined } from '@ant-design/icons'
import { useSelector } from '@/store/hooks';
import posgen from '@/utils/staffService';

type Props = Fraction

const FractionBadge: FC<Props> = ({
  name,
  id
}) => {
  const { dataBase } = useSelector(s => s.main)
  const [head, setHead] = useState('')
  const [count, setCount] = useState<{ cb: number, bb: number }>({ cb: 0, bb: 0 })

  useEffect(() => {
    if (id && dataBase) {
      const head = posgen.getLeaderOfFraction(id, dataBase)
      
      if (head) {
        const rank = posgen.getRankLabel(head?.rank?.rank)
        setHead(`${rank?.shortName} ${head.name.shortName}`)
      }
      setCount(posgen.getCountOfPersonnelInFraction(id, dataBase))
    }
  }, [dataBase, id])

  return (
    <div className={classes.wrapper}>
      <div className={classes.label}>{name?.staffName}</div>
      <div className={classes.info}>
        <Row>
          {count.bb > 0 &&
            <Tooltip title='Ofiserler we starşinalar'>
              <Col>
                <Tag color={'cyan-inverse'} icon={<StarOutlined />}>{count.bb}</Tag>
              </Col>
            </Tooltip>
          }
          {count.cb > 0 &&
            <Tooltip title='Esgerler we seržantlar'>
              <Col>
                <Tag color={'cyan-inverse'} icon={<UsergroupAddOutlined />}>{count.cb}</Tag>
              </Col>
            </Tooltip>
          }
          {head &&
            <Tooltip title='Batareýa (wzwod) serkerdesi'>
              <Col>
                <Tag color={'geekblue-inverse'}>{head}</Tag>
              </Col>
            </Tooltip>
          }
        </Row>
      </div>
    </div>
  )
}

export default FractionBadge