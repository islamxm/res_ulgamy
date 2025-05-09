import { FC } from 'react';
import classes from './classes.module.scss'
import { PersonFull } from '@/models';
import Button from '@/ui/shared/button';
import { Col, Row } from 'antd';
import SelectPersonModal from '@/ui/modals/selectPersonModal';
import useSwitcher from '@/hooks/useSwitcher';

type Props = {
  index: number
  personnel: Array<PersonFull>
  title: string,
  avilablePersonnel: Array<PersonFull>,
  onSave: (index: number, data: Array<PersonFull>) => any
}

const ClusterPartItem: FC<Props> = ({
  index,
  personnel,
  title,
  avilablePersonnel,
  onSave
}) => {
  const {isOpen, open, close} = useSwitcher(false)



  return (
    <div className={classes.wrapper}>
      <SelectPersonModal
        fractionPersonnel={avilablePersonnel}
        onSave={(data) => onSave(index, data)}
        initialData={personnel}
        modalPorps={{
          open: isOpen,
          onCancel: close
        }}
        />
      <Row justify={'space-between'} align={'middle'} gutter={[5, 5]}>
        <Col>
          <div className={classes.title}>
            {title}
          </div>
        </Col>
        <Col>
          <Row gutter={[5, 5]}>
            <Col>
              <Button
                styleVariant={'solid'}
                colorVariant={'warning'}
                onClick={open}
              >
                Saýlanan: {personnel.length}
              </Button>
            </Col>
            {/* <Col>
              <Button
                // isCircle
                isIcon>
                <EditOutlined />
              </Button>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default ClusterPartItem