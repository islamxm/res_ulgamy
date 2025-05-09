import { FC, useEffect, useState } from 'react';
import { Row, Col, Flex } from 'antd';
import FractionBadge from '@/ui/shared/fractionBadge';
import { Fraction, PersonFull } from '@/models';
import DutyPart from '../dutyPart';
import Button from '@/ui/shared/button';
import posgen from '@/services/staffService';
import { useDispatch, useSelector } from '@/store/hooks';
import SelectPersonModal from '@/ui/modals/selectPersonModal';
import useSwitcher from '@/hooks/useSwitcher';
import { Duties } from '@/models/duty_models';
import classes from './classes.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { dutyDistrActions } from '../../dutyDistrStoreSlice';
import { Distr } from '@/models/duty_models';

type Props = {
  fraction: Fraction,
}

const FractionPart: FC<Props> = ({
  fraction,
}) => {
  const { dataBase } = useSelector(s => s.main)
  const {result} = useSelector(s => s.dutyDistr)
  const dispatch = useDispatch()
  const [fractionPersonnel, setFractionPersonnel] = useState<PersonFull[]>([])
  const { isOpen, close, open } = useSwitcher(false)
  const [editData, setEditData] = useState<Distr[0]['data'][0]>()
  const [data, setData] = useState<Distr[0]['data']>([])

  useEffect(() => {
    fraction?.id && setFractionPersonnel(posgen.getPersonnelInFraction(fraction.id, dataBase).cb)
  }, [fraction])

  const openModal = (data: any) => {
    open()
    setEditData(data)
  }

  const saveModal = (data: PersonFull[]) => {
    if (editData) {
      dispatch(dutyDistrActions.updateDutyGroup({fractionId: fraction.id, data: {
        ...editData,
        data
      }}))
    }
  }

  useEffect(() => {
    if (fraction) {
      setData(result.find(r => r.fractionId === fraction.id)?.data || [])
    }
  }, [fraction, result])

  const saveDuties = (groupId: number, targets: Duties[]) => {
    const d = data.find(f => f.id === groupId)
    if (d) {
      dispatch(dutyDistrActions.updateDutyGroup({fractionId: fraction.id, data: {
        ...d,
        targets
      }}))
    }
  }



  return (
    <div className={classes.wrapper}>
      <SelectPersonModal
        modalPorps={{
          open: isOpen,
          onCancel: close
        }}
        onSave={saveModal}
        fractionPersonnel={fractionPersonnel}
        initialData={editData?.data || []}
      />
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <FractionBadge
            {...fraction}
          />
        </Col>
        {data.map((d) => (
          <Col span={24} key={d.id}>
            <DutyPart
              openModal={() => openModal(d)}
              saveDuties={targets => saveDuties(d.id, targets)}
              deleteGroup={groupId => dispatch(dutyDistrActions.deleteDutyGroupFromFraction({fractionId: fraction.id, groupId}))}
              data={d}
            />
          </Col>
        ))}
        <Col span={24}>
          <Flex justify='center'>
            <Button
              beforeIcon={<PlusOutlined />}
              onClick={() => dispatch(dutyDistrActions.addDutyGroupToFraction({fractionId: fraction.id}))}
              styleVariant={'solid'}
              colorVariant={'success'}
            >Tabşyrygy goş</Button>
          </Flex>
        </Col>
      </Row>
    </div>
  )
}

export default FractionPart