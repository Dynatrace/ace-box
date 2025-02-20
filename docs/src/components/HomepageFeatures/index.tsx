import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'ACE-Box: Your Portable Sandbox for Seamless Testing and Demos!',
    Svg: require('@site/static/img/blackbox-white.png').default,
    description: (
      <>
        Easily create isolated environments for testing, demonstrations, and hands-on training, all in a portable and efficient setup.
      </>
    ),
  },
  {
    title: 'Build Better and Faster with ACE-Box Modular Framework!',
    Svg: require('@site/static/img/addrowonbottom-white.png').default,
    description: (
      <>
        Leverage the modular design to quickly deploy resources, integrate new features, and streamline content creation with ease.
      </>
    ),
  },
  {
    title: 'Master Integrations and Maximize Dynatrace with ACE-Box!',
    Svg: require('@site/static/img/plugin-connection-white.png').default,
    description: (
      <>
        Gain hands-on experience in building integrations and fully leverage Dynatrace's capabilities through practical, modular setups.
      </>
    ),
  }
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
