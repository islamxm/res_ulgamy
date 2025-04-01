import { FC, ReactNode } from 'react';
import classes from './classes.module.scss'
import { Flex, Tag } from 'antd';
import { DocCategory } from '@/models';
import { BookOutlined, FileTextOutlined } from '@ant-design/icons'

type Props = DocCategory & {

}

const Category: FC<Props> = ({
  id,
  name,
  children,
}) => {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      className={classes.wrapper}>
      <div className={classes.main}>
        {name}
      </div>
      <Flex justify={'flex-end'} className={classes.extra_info}>
        {
          (children && children?.length > 0 && children.filter(f => f.isCategory).length > 0) && (
            <Tag icon={<BookOutlined />} color={'cyan'}>
              {children.filter(f => f.isCategory).length}
            </Tag>
          )
        }
        {
          (
            (children && children?.length > 0 && children.filter(f => !f.isCategory).length > 0) && (
              <Tag icon={<FileTextOutlined />} color={'blue'}>
                {children.filter(f => !f.isCategory).length}
              </Tag>
            )
          )
        }
      </Flex>
    </Flex>
  )
}

export default Category;