export const handleOnChangeInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  setInputMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  setInputMessage(e.target.value)
}
