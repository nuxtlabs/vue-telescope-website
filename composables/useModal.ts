export const useModal = () => {
  const isModal = useState('isModal', () => false)

  function setModal (state) {
    isModal.value = state
  }

  return { isModal, setModal }
}
