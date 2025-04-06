import { FC, useEffect, useState } from 'react';
import classes from './classes.module.scss'
import { Modal, Col, Row, ModalFuncProps, Input } from 'antd';
import { PersonFull } from '@/models';
import Button from '@/ui/shared/button';
import posgen from '@/utils/staffService';
import setClassNames from '@/utils/setClassNames';

type Props = & {
  fractionPersonnel: PersonFull[],
  onSave: (personnel: PersonFull[]) => void
  modalPorps?: ModalFuncProps,
  initialData: PersonFull[]
}

const SelectPersonModal: FC<Props> = ({
  modalPorps,
  fractionPersonnel,
  initialData,
  onSave,
}) => {
  const [selected, setSelected] = useState<PersonFull[]>([])
  const { onCancel, ...restModalProps } = modalPorps || {}
  const [isMoving, setIsMoving] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [filtered, setFiltered] = useState<PersonFull[]>([])

  useEffect(() => setFiltered(fractionPersonnel), [fractionPersonnel])

  useEffect(() => {
    if(searchVal) {
      setFiltered(fractionPersonnel.filter(f => `${f.name.partial.firstName} ${f.name.partial.lastName} ${f.name.partial.fatherName}`.toLowerCase().includes(searchVal.toLowerCase())))
    } else setFiltered(fractionPersonnel)
  }, [searchVal])

  useEffect(() => {
    setSelected(initialData)
  }, [initialData])

  const selectItem = (person: PersonFull) => {

    selected.find(f => f.id === person.id) ? setSelected(s => s.filter(f => f.id !== person.id)) : setSelected(s => ([...s, person]))
  }

  const selectWithMove = (person: PersonFull) => {
    !selected.find(f => f.id === person.id) && setSelected(s => ([...s, person])) 
  }

  const selectAll = () => setSelected(fractionPersonnel)

  const removeAll = () => setSelected([])

  const onClose = () => {
    initialData?.length === 0 && setSelected([])
    modalPorps?.onCancel && modalPorps.onCancel()
  }

  const save = () => {
    onSave(selected)
    onClose()
  }



  return (
    <Modal
      {...restModalProps}
      footer={null}
      onCancel={onClose}
    >
      <Row gutter={[10, 10]} className={classes.wrapper}>
        <Col span={24}>
          <Input
            value={searchVal}
            size={'large'}
            // style={{width: '100%'}}
            placeholder='Gözle'
            onChange={e => setSearchVal(e.target.value)}
            />
        </Col>
        <Col
          onMouseLeave={() => setIsMoving(false)}
          onMouseDown={() => setIsMoving(true)}
          onMouseUp={() => setIsMoving(false)}
          span={24}
          className={classes.body}>
          <Row gutter={[5, 5]}>
            {
              filtered.map(person => (
                <Col key={person.id} span={24}>
                  <div onMouseMove={e => {
                    if(isMoving) {
                      selectWithMove(person)
                    }
                  }}  onClick={() => selectItem(person)} className={setClassNames([classes.item, selected.find(f => f.id === person.id) && classes.active])}>
                    {posgen.getRankLabel(person.rank?.rank)?.shortName} {person.name.partial.lastName} {person.name.partial.firstName}
                  </div>
                </Col>
              ))
            }
          </Row>

        </Col>
        <Col span={24} className={classes.action}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Button onClick={selectAll} styleVariant={'simple'} colorVariant={'primary'} isFill>Hemmesini saýla</Button>
            </Col>
            <Col span={12}>
              <Button onClick={removeAll} isFill styleVariant={'simple'} colorVariant={'danger'}>Saýlananlary aýyr</Button>
            </Col>
            <Col span={12}>
              <Button onClick={save} disabled={selected.length === 0} isFill>Giriz</Button>
            </Col>
            <Col span={12}>
              <Button onClick={onClose} isFill colorVariant={'danger'}>Beset</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default SelectPersonModal