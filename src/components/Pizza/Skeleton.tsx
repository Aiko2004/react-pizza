import ContentLoader from 'react-content-loader'
import { FC } from 'react'

const Skeleton: FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="131" cy="132" r="127" />
    <rect x="0" y="268" rx="9" ry="9" width="280" height="50" />
    <rect x="0" y="335" rx="9" ry="9" width="280" height="90" />
    <rect x="148" y="450" rx="22" ry="22" width="130" height="43" />
    <rect x="2" y="450" rx="21" ry="21" width="90" height="43" />
  </ContentLoader>
)

export default Skeleton
