import axios from "axios";
export async function fetchMembers() {
  const response = await axios.get(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  );
  return response.data;
}
