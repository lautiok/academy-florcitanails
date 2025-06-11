import { PresencialesHeader } from "./components";
import FuturePresencial from "./components/FuturePresencial";

export default function TeacherPresenciales() {
  return <div className="p-6">
    <PresencialesHeader />
    <FuturePresencial />
  </div>;
}