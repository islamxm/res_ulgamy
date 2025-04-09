import { FC, useEffect, useRef, useState } from 'react';
import classes from './classes.module.scss'
import { ModalFuncProps, Modal, Row, Col } from 'antd'
import  { _duties } from '@/data/static';
import Button from '@/ui/shared/button';
import { Duties } from '@/models/duty_models';

type Props = {
  modalProps?: ModalFuncProps,
  onSave: (...args:any[]) => any
}

const SelectDutyModal: FC<Props> = ({
  modalProps,
  onSave
}) => {
  const [selected, setSelected] = useState<Duties[]>([])

  const onClose = () => {
    modalProps?.onCancel && modalProps.onCancel()
    setSelected([])
  }

  const onSelect = (value: Duties) => {
    setSelected(s => {
      if(s.find(f => f === value)) {
        return s.filter(f => f !== value)
      } else {
        return [...s, value]
      }
    })
  }


  return (
    <Modal
      {...modalProps}
      footer={false}
      onCancel={onClose}
      title="Tabşyrygy saýla"
    >
      <div className={classes.wrapper}>
        <Row gutter={[5, 5]}>
          {
            Array.from(_duties).map(d => (
              <Col span={24}>
                <Button
                  style={{textAlign: 'left'}}
                  //@ts-ignore
                  onClick={() => onSelect(d)}
                  isFill
                  justify={'flex-start'}
                  styleVariant={selected.find(f => f === d) ? 'solid' : 'simple'}>
                  {d}
                </Button>
              </Col>
            ))
          }
          <Col span={24}>
            <Row gutter={[10,10]}>
              <Col span={12}>
                <Button onClick={() => {
                  onSave(selected)
                  onClose()
                }} disabled={selected.length === 0} isFill colorVariant={'success'}>Giriz</Button>
              </Col>
              <Col span={12}>
                <Button isFill colorVariant={'danger'}>Bes et</Button>
              </Col>
            </Row>  
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default SelectDutyModal