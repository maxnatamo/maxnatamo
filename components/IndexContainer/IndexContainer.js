import Intro from '@components/IndexContainer/Intro';

import styles from './IndexContainer.module.scss';

const View = ({ component }) => {
    return (
        <div className={styles.view}>
            {component}
        </div>
    );
}

export default function IndexContainer({}) {
    return (
        <div className={styles.index}>
            <View component={<Intro />} />
        </div>
    );
}