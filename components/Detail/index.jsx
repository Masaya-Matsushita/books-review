import { Button, Card, Loader } from '@mantine/core'

export const Detail = ({ state, router }) => {
  // ローディング状態
  if (state.loading) {
    return <Loader size='xl' className='fixed inset-0 m-auto' />
  }

  // エラー発生時
  if (state.error) {
    return (
      <div className='text-lg font-bold text-red-500'>Error：{state.error}</div>
    )
  }

  return (
    <div>
      <Card>
        <h1>{state.detail.title}</h1>
        <h3>{state.detail.detail}</h3>
        <p>{state.detail.review}</p>
        <div className='pr-4 text-right'>
          <a href={state.detail.url}>作品のリンク</a>
        </div>
        <p className='mr-4 mb-0 text-right'>
          Reviewed by {state.detail.reviewer}
        </p>
      </Card>
      <Button
        size='lg'
        className='block mt-10 mr-4 ml-auto'
        onClick={() => router.push({ pathname: '/', query: { page: 1 } })}
      >
        一覧へ戻る
      </Button>
    </div>
  )
}
