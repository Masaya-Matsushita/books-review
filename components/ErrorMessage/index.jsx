export const ErrorMessage = ({ state }) => {
  // エラー発生時
  if (state.error) {
    return (
      <div className='text-lg font-bold text-red-500'>Error：{state.error}</div>
    )
  }

  return
}
