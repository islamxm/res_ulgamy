import { FC } from 'react';
import classes from './classes.module.scss'
import clusterClasses from '../clusterClasses.module.scss'
import { RotaCluster } from '@/models/duty_cluster_models';
import { Row, Col, Typography } from 'antd'
import { setClassNames } from '@/utils/globalUtils';
import dutyGroups from '@/data/dutyGroups';
import Panel from '@/ui/shared/panel';
import ClusterPartItem from '../../clusterPartItem';
import { FDistrReturnType } from '@/services/dutyService';
import { useDispatch } from '@/store/hooks';
import { dutyClusterActions } from '../../../dutyClusterStoreSlice';

type Props = RotaCluster & {sourceData: FDistrReturnType}

const ClusterRotaGroup: FC<Props> = ({
  dutyGroupId,
  clusters,
  sourceData
}) => {
  const dispatch = useDispatch()

  return (
    <div className={setClassNames[clusterClasses.wrapper]}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Typography.Title level={4} className={clusterClasses.title}>
            {dutyGroups.find(group => group.id === dutyGroupId)?.title}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={[5, 5]}>
            {
              clusters.map((cluster, clusterIndex) => (
                <Col key={cluster.number} span={24}>
                  <Panel
                    label={cluster.name}
                  >
                    <div className={classes.body}>
                      <Row gutter={[5, 5]}>
                        {
                          cluster.duties.map((duty, index) => (
                            <Col span={24} key={duty.duty}>                              
                              <ClusterPartItem
                                title={duty.duty}
                                personnel={duty.personnel}
                                index={index}
                                avilablePersonnel={sourceData.find(s => s.duty === duty.duty)?.personnel || []}
                                onSave={(index, data) => {
                                  const readyObj = {
                                    dutyGroupId,
                                    clusters: clusters.map((c, cIndex) => {
                                      if(cIndex === clusterIndex) {
                                        return {
                                          ...c,
                                          duties: c.duties.map((d, dIndex) => {
                                            if(dIndex === index) {
                                              return {
                                                ...d,
                                                personnel: data
                                              } 
                                            } else return d
                                          })
                                        }
                                      } else {
                                        return c
                                      }
                                    })
                                  }
                                  dispatch(dutyClusterActions.updateClusterPersonnel({dutyGroupId, cluster: readyObj}))
                                }}
                                />
                            </Col>
                          ))
                        }
                      </Row>
                    </div>
                  </Panel>
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>

    </div>
  )
}

export default ClusterRotaGroup