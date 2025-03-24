import classes from './classes.module.scss';
import { TypeOfContract, Ranks } from '@/models';
import { FC } from 'react';
import setClassNames from '@/utils/setClassNames';
import {StarFilled} from '@ant-design/icons'

type Props = {
  rank?: Ranks,
  contractType?: TypeOfContract
}

const Rank:FC<Props> = ({
  rank = 'hatarcy',
  contractType = 'cb'
}) => {
  
  if(rank === 'kici_serzhant' && contractType === 'cb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.cg, classes.ksnt])}>
        <span className={classes.line}></span>
        <span className={classes.line}></span>
      </div>  
    )
  }
  if(rank === 'serzhant' && contractType === 'cb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.cg, classes.snt])}>
        <span className={classes.line}></span>
        <span className={classes.line}></span>
        <span className={classes.line}></span>
      </div>  
    )
  }
  if(rank === 'uly_serzhant' && contractType === 'cb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.cg, classes.usnt])}>
        <span className={classes.line}></span>
      </div>  
    )
  }
  if(rank === 'kici_serzhant' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.ksnt])}>
        <span className={classes.line}></span>
        <span className={classes.line}></span>
      </div>  
    )
  }
  if(rank === 'serzhant' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.snt])}>
        <span className={classes.line}></span>
        <span className={classes.line}></span>
        <span className={classes.line}></span>
      </div>  
    )
  }
  if(rank === 'uly_serzhant' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.usnt])}>
        <span className={classes.line}></span>
      </div>  
    )
  }
  if(rank === 'starshina' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.starshina])}>
        <span className={classes.line}></span>
      </div>  
    )
  }
  if(rank === 'mayor' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.mayor])}>
        <span className={classes.star}>
          <StarFilled/>
        </span>
      </div>
    )
  }
  if(rank === 'leytenant' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.lnt])}>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
      </div>
    )
  }
  if(rank === 'uly_leytenant' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.ulnt])}>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
      </div>
    )
  }
  if(rank === 'kapitan' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.kapitan])}>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
      </div>
    )
  }
  if(rank === 'podpolkownik' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.ppk])}>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
      </div>
    )
  }
  if(rank === 'polkownik' && contractType === 'bb') {
    return (
      <div className={setClassNames([classes.wrapper, classes.bg, classes.pk])}>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
        <span className={classes.star}>
          <StarFilled/>
        </span>
      </div>
    )
  }
  return (
    <div className={setClassNames([classes.wrapper, classes.cg])}></div>
  )
}

export default Rank;