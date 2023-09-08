import { Loader2 } from "lucide-react";
export default function Spinner() {
  return (
    <div className="w-[100%] h-[80vh] flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
