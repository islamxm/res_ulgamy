import { FC } from 'react';
import classes from './classes.module.scss'
import { Flex } from 'antd'
import Category from './components/category';
import Document from './components/document';
import { DocCategory, DocTemplate } from '@/models';

type Props = {

}

const mock: (DocCategory & DocTemplate)[] = [
  {
    id: 1,
    name: 'Habarnamalar',
    isCategory: true,
    children: [
      { id: 1, name: 'Document 1' },
      { id: 2, name: 'Document 2' },
    ]
  },
  {
    id: 2,
    name: 'Sargytnamalar',
    isCategory: true
  },
  {
    id: 3,
    name: 'Bölümçe resminamalary',
    isCategory: true,
    children: [
      { id: 1, name: 'Category 1', isCategory: true },
      { id: 2, name: 'Category 2', isCategory: true },
      { id: 3, name: 'Document 1' },
      { id: 4, name: 'Document 2' },
      { id: 5, name: 'Document 3' },
      { id: 6, name: 'Document 4' },
    ]
  },
  {
    id: 4,
    name: 'Delilnamalar',
    isCategory: true
  },
  {
    id: 5,
    name: 'Document 1',
  },
  {
    id: 6,
    name: 'Serkerdelik ten-şikes barlagy ten-şikes barlagy',
  },
]

const DocsPage: FC<Props> = () => {
  return (
    <Flex wrap gap={10} className={classes.wrapper}>
      {
        mock.map(item => (
          item.isCategory ? (
            <div className={classes.item}>
              <Category
                {...item}
              />
            </div>
          ) : (
            <div className={classes.item}>
              <Document {...item} />
            </div>
          )
        ))
      }
    </Flex>
  )
}

export default DocsPage;