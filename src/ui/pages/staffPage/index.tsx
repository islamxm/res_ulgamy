import { FC, ReactNode, useEffect, useState } from 'react';
import classes from './classes.module.scss'
import { Row, Col, Table, Input, TableProps } from 'antd';
import StaffSearch from './components/staffSearch';
import { PersonCurrentState } from '@/models';
import Rank from '@/ui/shared/rank';
import posgen from '@/utils/staffService';
import Status from '@/ui/shared/status';
import { useDebounceValue } from 'usehooks-ts';
import { useNavigate } from 'react-router';
import { useSelector } from '@/store/hooks';
import Button from '@/ui/shared/button';
import useIdbDataService from '@/hooks/useIdbDataService';
type Props = {

}

type DataType = {
  id: number
  tb: number,
  rank: ReactNode,
  name: string,
  fraction: string,
  status: PersonCurrentState[]
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
  const nav = useNavigate()
  const { dataBase: {personnel} } = useSelector(s => s.main)
  const { database } = useSelector(s => s.db)
  const idbDataService = useIdbDataService()
  const [data, setData] = useState<DataType[]>([])
  const [result, setResult] = useState<DataType[]>([])
  const [value, setValue] = useState('')
  const [debValue] = useDebounceValue(value, 500)

  useEffect(() => {
    if (value === '') {
      setResult(data)
    }
  }, [value])

  useEffect(() => {
    const f: DataType[] = personnel.map(person => ({
      id: person.id,
      tb: person.id,
      rank: <Rank rank={person?.rank?.rank} contractType={person?.rank?.contract} />,
      name: `${person.name.partial.lastName} ${person.name.partial.firstName} ${person.name.partial?.fatherName ?? ''}`,
      fraction: posgen.fracTreeFromPersonId(person.id)[posgen.fracTreeFromPersonId(person.id).length - 1].name.staffName,
      status: person.status,
      key: person.id
    }))
    setData(f)
  }, [personnel])



  useEffect(() => {
    setResult(data)
  }, [data])

  useEffect(() => {
    if (value === '') {
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
          <Row justify={"end"} gutter={[10, 10]}>
            <Col><Button onClick={() => nav('/staff/consumption')} styleVariant={'outlined'}>Şahsy düzümiň sanawy</Button></Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            <DataType>
            dataSource={result}
            columns={columns}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => nav(`/staff/${record.id}`)
              }
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default StaffPage;