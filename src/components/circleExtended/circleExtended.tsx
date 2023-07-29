import styles from './circleExtended.module.css'
import { Circle, CircleProps } from '../ui/circle/circle'
import { ArrowIcon } from '../ui/icons/arrow-icon'
import { ElementStates } from '../../types/element-states'

type TCircleExtended = { top?: CircleProps, main: CircleProps, bottom?: CircleProps, arrow?: ElementStates }

export const CircleExtended: React.FC<TCircleExtended> = ({ top, main, bottom, arrow }) => {
  return (
      <>
          <div className={styles.smallCircleContainer}>
              {top && <Circle {...top} extraClass={styles.topCircle} isSmall={true} />}
          </div>
          <div className={styles.circleExtended}>
              <div className={styles.circleWirhArrow}>
                  <Circle
                      {...main}
                      extraClass={styles.mainCircle}
                      head={top ? '' : main.head}
                      tail={bottom ? '' : main.tail}
                  />
                  <div className={styles.Arrow}>
                      {arrow && <ArrowIcon fill={arrow === ElementStates.Changing ? '#D252E1' : '#0032FF'} />}
                  </div>
              </div>
              <div className={styles.smallCircleContainer}>
                  {bottom && <Circle {...bottom} extraClass={styles.bottomCircle} isSmall={true} />}
              </div>
          </div>
      </>

  )
}