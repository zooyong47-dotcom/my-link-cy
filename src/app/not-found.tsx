import { UserNotFoundView } from "@/components/UserNotFoundView";

export default function GlobalNotFound() {
  return (
    <>
      <title>페이지를 찾을 수 없습니다 | MyLink</title>
      <meta
        name="description"
        content="요청하신 페이지가 존재하지 않거나 이동되었습니다. 올바른 주소인지 다시 한 번 확인해 주세요."
      />
      <UserNotFoundView />
    </>
  );
}
