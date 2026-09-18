export default function ProfilePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        {/* 프로필 아바타 (기본 이니셜 아이콘) */}
        <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
          신
        </div>

        {/* 이름 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          신찬용
        </h1>

        {/* 뱃지 / 태그 */}
        <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
          Student Developer
        </span>

        {/* 소개글 */}
        <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
          새로운 기술을 탐구하고 문제 해결을 즐기는 개발자입니다.{"\n"}
          사용자에게 더 나은 경험을 제공하기 위해 끊임없이 배우고 성장하고 있습니다.
        </p>

        {/* 구분선 및 링크/버튼 영역 */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            연락하기
          </button>
        </div>
      </div>
    </main>
  );
}
