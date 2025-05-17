import Find from "./Find";
import { THashtag } from "@/lib/types/THashtag";
import { getHashtags } from "@/lib/fetchs/fetchHashtags";

export default async function FindPage() {
  const response = await getHashtags();

  // Assuming response is an array of THashtag, pass it as a prop
  return <Find hashtagList={response} />;
}
