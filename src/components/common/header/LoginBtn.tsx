import style from "./Login.module.scss";
import Person from "@public/Person.svg";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();
  console.log("💥", session);

  if (session) {
    return <button onClick={() => signOut()}>signOut</button>;
  }
  return (
    <>
      <button className={`${style.login_btn}`} onClick={() => signIn("kakao")}>
        <Person className={`${style.login_svg}`} />
        <div className={`${style.login_txt}`}>login</div>
      </button>
    </>
  );
}
