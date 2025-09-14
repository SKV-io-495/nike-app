import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SocialProviders() {
  return (
    <>
      <button className="w-full py-3 px-4 border border-border rounded-md flex items-center justify-center space-x-2 hover:bg-muted">
        <FcGoogle size={24} />
        <span>Continue with Google</span>
      </button>
      <button className="w-full py-3 px-4 border border-border rounded-md flex items-center justify-center space-x-2 hover:bg-muted">
        <FaApple size={24} />
        <span>Continue with Apple</span>
      </button>
    </>
  );
}
