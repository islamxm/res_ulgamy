import { FC, ReactNode } from 'react';
import classes from './classes.module.scss'
import { GarawulCluster } from '@/models/duty_cluster_models';
import clusterClasses from '../clusterClasses.module.scss'
import { Row, Col, Typography } from 'antd'
import { setClassNames } from '@/utils/globalUtils';
import dutyGroups from '@/data/dutyGroups';
import Panel from '@/ui/shared/panel';
import ClusterPartItem from '../../clusterPartItem';
import { FDistrReturnType } from '@/services/dutyService';
import { useDispatch } from '@/store/hooks';
import { dutyClusterActions } from '../../../dutyClusterStoreSlice';

type Props = GarawulCluster & {sourceData: FDistrReturnType}

const ClusterGarawulGroup: FC<Props> = ({
  dutyGroupId,
  clusters,
  sourceData,
}) => {
  const dispatch = useDispatch()

  return (
    <div className={setClassNames([clusterClasses.wrapper])}>
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
                          cluster.posts.map((post, index) => (
                            <Col key={post.id} span={24}>
                              <ClusterPartItem
                                title={`№${post.number} post`}
                                personnel={post.personnel}
                                index={index}
                                // avilablePersonnel={sourceData.find(s => s.duty === duty.duty)?.personnel || []}
                                avilablePersonnel={sourceData.find(s => s.duty === 'Içerki garawul sakçy')?.personnel || []}
                                onSave={(index,data) => {
                                  const readyObj = {
                                    dutyGroupId,
                                    clusters: clusters.map((c,cIndex) => {
                                      if(cIndex === clusterIndex) {
                                        return {
                                          ...c,
                                          posts: c.posts.map((p, pIndex) => {
                                            if(pIndex === index) {
                                              return {
                                                ...p,
                                                personnel: data
                                              }
                                            } else return p
                                          })
                                        }
                                      } else return c
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

export default ClusterGarawulGroup