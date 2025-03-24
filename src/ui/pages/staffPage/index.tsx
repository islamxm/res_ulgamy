import { Dispatch, FC, ReactNode, SetStateAction, use, useEffect, useState } from 'react';
import classes from './classes.module.scss'
import Button from '@/ui/shared/button';
import { Row, Col, Table, Input, TableProps } from 'antd';
import StaffSearch from './components/staffSearch';
import { Person, PersonBB, PersonCB, PersonCurrentState } from '@/models';
import personnel from '@/data/personnel';
import Rank from '@/ui/shared/rank';
import posgen from '@/utils/posGen';
import Status from '@/ui/shared/status';
import { useDebounceValue } from 'usehooks-ts';

type Props = {

}


type DataType = {
  id: number
  tb: number,
  rank: ReactNode,
  name: string,
  fraction: string,
  status: PersonCurrentState | PersonCurrentState[]
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'T/b',
    dataIndex: 't_b',
    key: 't_b',
    render(v, r, index) {
      return index + 1
    },
    width: 60
  },
  {
    title: 'Harby ady',
    dataIndex: 'rank',
    key: 'rank',
    render: (value) => value,
    width: 100
  },
  {
    title: 'F.A.A ady',
    dataIndex: 'name',
    key: 'name',
    render: (value) => value
  },
  {
    title: 'Bölümçe',
    dataIndex: 'fraction',
    key: 'fraction',
    render: (value) => value

  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => <Status status={record.status} />

  },
]


const StaffPage: FC<Props> = () => {
  const [data, setData] = useState<DataType[]>([])
  const [result, setResult] = useState<DataType[]>([])
  const [value, setValue] = useState('')
  const [debValue] = useDebounceValue(value, 500)  

  useEffect(() => {
    if(value === '') {
      setResult(data)
    }
  }, [value])

  useEffect(() => {
    const f: DataType[] = personnel.map(person => ({
      id: person.id,
      tb: person.id,
      rank: <Rank rank={person?.rank?.rank} contractType={person?.rank?.contract} />,
      name: `${person.name.partial.lastName} ${person.name.partial.firstName} ${person.name.partial?.fatherName ?? ''}`,
      fraction: posgen.getFullPosition(person.id),
      status: person.status
    }))
    setData(f)
  }, [])

  useEffect(() => {
    setResult(data)
  }, [data])

  useEffect(() => {
    if(value === '') {
      setResult(data)
    } else {
      setResult(data.filter(f => f.name.toLowerCase().includes(value.toLowerCase())))
    }
  }, [debValue, data])


  return (
    <div className={classes.wrapper}>
      <Row gutter={[15, 15]}>
        <Col span={24}>
          <StaffSearch
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Col>
        <Col span={24}>
          <Table
            <DataType>
            dataSource={result}
            columns={columns}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default StaffPage;