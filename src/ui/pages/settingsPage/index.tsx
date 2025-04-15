import { FC, ReactNode } from 'react';
import classes from './classes.module.scss'
import { Row, Col } from 'antd'
import Panel from '@/ui/shared/panel';
import Button from '@/ui/shared/button';

const SettingsPage: FC = () => {
  return (
    <div className={classes.wrapper}>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Row gutter={[10,10]}>
            <Col span={24}>
              <Panel label='Dil'></Panel>
            </Col>
            <Col span={24}>
              <Panel label='Mümkinçilikler'></Panel>
            </Col>
            <Col span={24}>
              <Panel label='Maglumatlar bazasy'></Panel>
            </Col>
            <Col span={24}>
              <Panel label='Ulgamlar'></Panel>
            </Col>
            <Col span={24}>
              <Panel label='Ulgam hakynda'></Panel>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Panel label='Tabşyryga gidilýän ýerleri sazlamak'>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Panel label='Batareýa boýunça nobatçy we gündeçi çykylýan ýerler'>

                </Panel>
              </Col>
              <Col span={24}>
                <Panel label='Içerki garawullar'>

                </Panel>
              </Col>
              <Col span={24}>
                <Panel label='Barlag goýberiş nokatlary'>

                </Panel>
              </Col>
            </Row>
          </Panel>
        </Col>
        <Col span={24}>
          <Row gutter={[10,10]} justify={'end'}>
            <Col><Button colorVariant={'success'}>Giriz</Button></Col>
            <Col><Button colorVariant={'warning'} styleVariant={'outlined'}>Ilkibaşdaky ýagdaýa getir</Button></Col>
            <Col><Button colorVariant={'danger'} styleVariant={'outlined'}>Beset</Button></Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default SettingsPage;