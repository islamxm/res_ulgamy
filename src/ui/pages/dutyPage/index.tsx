import { FC } from 'react';
import Button from '@/ui/shared/button';
import { Col, Row } from 'antd';


type Props = {

}

const DutyPage: FC<Props> = () => {
  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col
          span={24}>
          <Button
            isFill
            styleVariant={'simple'}
            link={{
              to: '/duty/month_schedule'
            }}
          >
            Bölümçeler boýunça reje (func: ???()) 
          </Button>
        </Col>
        <Col
          span={24}>
          <Button
            styleVariant={'simple'}
            link={{
              to: '/duty/month_distr'
            }}>
            Aýlyk tabşyryga goýbermek (func: distr())
          </Button>
        </Col>
        <Col
          span={24}>
          <Button
            isFill
            styleVariant={'simple'}
          >
            Gündelik tabşyryga goýbermek {`(func: ???() --> disrt() --> status())`}
          </Button>
        </Col>
        {/* <Col span={24}><Button>Bölümçeler boýunça reje</Button></Col> */}
        {/* <Col span={24}><Button>Gündelik tabşyryklar</Button></Col> */}
      </Row>
    </div>
  )
}

export default DutyPage;