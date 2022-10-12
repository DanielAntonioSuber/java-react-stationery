import { useState, useCallback } from 'react'

interface UseConfirmDialogReturn {
  confirm: () => Promise<void>
  handleClose: () => void
  handleCancel: () => void
  handleConfirm: () => void
  open: boolean
}

function useConfirmDialog (): UseConfirmDialogReturn {
  const [resolveReject, setResolveReject] = useState<[(value: void | PromiseLike<void>) => void, ((reason?: any) => void)] | []>([])
  const [resolve, reject] = resolveReject

  const confirm = useCallback(async () => {
    return await new Promise<void>((resolve, reject) => {
      setResolveReject([resolve, reject])
    })
  }, [])

  const handleClose = useCallback(() => {
    setResolveReject([])
  }, [])

  const handleCancel = useCallback(() => {
    if (reject != null) {
      reject()
      handleClose()
    }
  }, [reject, handleClose])

  const handleConfirm = useCallback(() => {
    if (resolve != null) {
      resolve()
      handleClose()
    }
  }, [resolve, handleClose])

  return {
    confirm,
    handleClose,
    handleCancel,
    handleConfirm,
    open: resolveReject.length === 2
  }
}

export { useConfirmDialog }

export type { UseConfirmDialogReturn }
