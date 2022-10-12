import { lazy, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loadable } from '@/components/ui'
import { AppLayout } from '@/components/layout'

import { useAuth } from '@/hooks'

import ProtectedRoute from './ProtectedRoute'

const Login = Loadable(lazy(async () => await import('@/views/Login')))
const Inventory = Loadable(lazy(async () => await import('@/views/Inventory')))
const Home = Loadable(lazy(async () => await import('@/views/Home')))
const Register = Loadable(lazy(async () => await import('@/views/Register')))
const ProductForm = Loadable(lazy(async () => await import('@/views/ProductForm')))
const Product = Loadable(lazy(async () => await import('@/views/Product')))
const Suppliers = Loadable(lazy(async () => await import('@/views/Suppliers')))
const SupplierForm = Loadable(lazy(async () => await import('@/views/SupplierForm')))
const Supplier = Loadable(lazy(async () => await import('@/views/Supplier')))

function MainRoutes (): ReactElement {
  const [authState] = useAuth()

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="login" element={<Login />} />

        <Route
          index
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="inventory"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="products/:productCode/edit"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <ProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="products/add"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <ProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="products/:productCode"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="suppliers/:supplierId"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <Supplier />
            </ProtectedRoute>
          }
        />
        <Route
          path="suppliers"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <Suppliers />
            </ProtectedRoute>
          }
        />
        <Route
          path="suppliers/add"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <SupplierForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="suppliers/:supplierId/edit"
          element={
            <ProtectedRoute isAllowed={authState.isLogged}>
              <SupplierForm />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default MainRoutes
