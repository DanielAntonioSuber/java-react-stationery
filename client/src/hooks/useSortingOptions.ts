import { useState } from 'react'

type sortDir = 'ASC' | 'DES'

interface SortingOptions {
  orderBy: string
  sortDir: sortDir
}

function useSortingOptions () {
  const [sortingOptions, setSortingOptions] = useState<SortingOptions>()

  
}

const HeadCells: readonly HeadCell[] = [
  {
    disablePadding: true,
    id: 'Product-Code',
    label: 'Code',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Article-Name',
    label: 'Article Name',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Retail-Price',
    label: 'Retail-Price',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Wholesale-Price',
    label: 'Wholesale Price',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Amount',
    label: 'Amount',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Brand',
    label: 'Brand',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Supplier',
    label: 'Supplier',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Created-At',
    label: 'Created At',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Updated-At',
    label: 'Actions',
    numeric: false
  },
  {
    disablePadding: true,
    id: 'Product-Article-Name',
    label: 'Article Name',
    numeric: false
  }
]

export default useSortingOptions
