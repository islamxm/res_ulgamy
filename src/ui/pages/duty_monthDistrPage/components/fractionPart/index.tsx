import { FC, ReactNode, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Panel from '@/ui/shared/panel';
import FractionBadge from '@/ui/shared/fractionBadge';
import { Fraction, PersonFull } from '@/models';
import DutyPart from '../dutyPart';
import Button from '@/ui/shared/button';
import posgen from '@/utils/staffService';
import { useSelector } from '@/store/hooks';
import { ResultDataItem, useMonthDistrContext } from '../../useContext';
import SelectPersonModal from '../../modals/selectPersonModal';
import useSwitcher from '@/hooks/useModal';
import { Result } from '../../useContext';
import { Duties } from '@/models/duty_models';

type Props = {
  fraction: Fraction,
  result: Result[],
}


const FractionPart: FC<Props> = ({
  fraction,
}) => {
  const { dataBase } = useSelector(s => s.main)
  const { actions, state } = useMonthDistrContext()
  const [fractionPersonnel, setFractionPersonnel] = useState<PersonFull[]>([])
  const { isOpen, close, open, toggle } = useSwitcher(false)
  const [editData, setEditData] = useState<ResultDataItem>()
  const [data, setData] = useState<ResultDataItem[]>([])

  useEffect(() => {
    fraction?.id && setFractionPersonnel(posgen.getPersonnelInFraction(fraction.id, dataBase).cb)
  }, [fraction])

  const openModal = (data: any) => {
    open()
    setEditData(data)
  }

  // const closeModal = () => {
  //   close()
  //   setEditData(undefined)
  // }

  const saveModal = (data: PersonFull[]) => {
    if (editData) {
      actions.updateDutyGroup(fraction.id, {
        ...editData,
        data
      })
    }
  }

  useEffect(() => {
    if (state && fraction) {
      setData(state.result.find(r => r.fractionId === fraction.id)?.data || [])
    }
  }, [state, fraction])


  const saveDuties = (groupId: number, targets: Duties[]) => { 
    const d = data.find(f => f.id === groupId)
    if(d) {
      actions.updateDutyGroup(fraction.id, {
        ...d,
        targets
      })
    }
  }



  return (
    <Panel>
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
              saveDuties={(targets) => saveDuties(d.id, targets)}
              deleteGroup={(groupId) => actions.deleteDutyGroupFromFraction(fraction.id, groupId)}
              data={d}
            />
          </Col>
        ))}
        <Col span={24}>
          <Button
            onClick={() => actions.addDutyGroupToFraction(fraction.id)}
            styleVariant={'simple'}
            isFill>Tabşyrygy goş</Button>
        </Col>
      </Row>
    </Panel>
  )
}

export default FractionPart