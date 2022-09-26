export interface EmployeeData {
  name: string
  surname: string
  role: string
  email: string
  direction: string
  salary: string
  schedule: string
  rfc: string
  phoneNumber: string
  password: string
}

export interface LoginRespone {
  accessToken: string
  kindToken: string
}

export interface LoginRequestData {
  emailOrRfc: string
  password: string
}

export interface RegisterResponse extends EmployeeData {
  id: number
  createdAt: Date
  updatedAt: Date
}

// Product

export interface ProductData {
  articleName: string
  wholesalePrice: string
  retailPrice: string
  amount: number
  brand: string
  supplierId: number
}

export interface CreateProductData {
  product: ProductData
  imagesFiles: FileList
}

export interface ProductResponse extends ProductData {
  code: number
  createdAt: Date
  updatedAt: Date
  images: Array<{ url: string, name: string }>
}

// Supplier

export interface SupplierData {
  supplierName: string
  rfc: string
}

export interface SupplierResponse extends SupplierData {
  id: number
}

// Other

export interface ListResponse<T> {
  content: T
  sizePage: number
  totalPages: number
  totalElements: number
  last: boolean
}

export interface PaginationParams {
  pageNumber?: number
  sizePage?: number
  sortBy?: string
  sortDir?: string
}
