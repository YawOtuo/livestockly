import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  variant: "register" | "member" | "post" | "profile" | "advertise";
  url?: string;
};

const options = {
  register: "/images/profile/register-dog.png",
  member: "/images/profile/handshake.jpg",
  post: "/images/profile/post.png",
  profile: "/images/profile/profile.png",
  advertise: "/images/profile/advertise.png",

};
export default function LargeButtons({
  name,
  variant = "register",
  url = "/profile/my-dogs",
}: Props) {
  return (
    <div className="border-1 border-yellow1 rounded-md p-4 hover:bg-yellow4">
      <Link href={url}>
        <div className="flex gap-7 items-center justify-start px-10">
          <div className="relative w-full aspect-[126/138] max-w-[126px]">
            <Image
              src={options[variant]}
              fill
              alt="Large Button"
              objectFit="cover"
            />
          </div>
          <div className="flex items-center justify-center">
            <p>{name}</p>
          </div>{" "}
        </div>
      </Link>
    </div>
  );
}
