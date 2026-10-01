// localStorage の保存失敗を知らせる警告バナー(画面上部・5 秒間表示)
export default function StorageBanner({ visible }) {
  if (!visible) return null
  return (
    <div
      role="alert"
      className="fixed inset-x-0 top-0 z-50 bg-amber-500 px-4 py-2 text-center text-base font-medium text-white shadow-lg"
    >
      保存に失敗しました。変更が保持されない場合があります。
    </div>
  )
}
