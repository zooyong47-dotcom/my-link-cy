import { UserNotFoundView } from "@/components/UserNotFoundView";

export default function DisplayNameNotFound() {
  return (
    <>
      <title>사용자를 찾을 수 없습니다 | MyLink</title>
      <meta
        name="description"
        content="요청하신 사용자의 프로필 페이지를 찾을 수 없습니다. 아이디를 다시 확인해 주세요."
      />
      <UserNotFoundView />
    </>
  );
}
