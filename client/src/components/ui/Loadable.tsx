import { FC, ReactElement, Suspense } from 'react'

import styled from '@emotion/styled'
import { LinearProgress } from '@mui/material'

type LoadableFC = (Component: FC) => (props: any) => ReactElement

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%'
})

const Loader: FC = () => (
  <LoaderWrapper>
      <LinearProgress color="primary" />
  </LoaderWrapper>
)

const Loadable: LoadableFC = (Component: FC) => function LoadableComponent (props: any) {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props}/>
    </Suspense>
  )
}

export default Loadable
