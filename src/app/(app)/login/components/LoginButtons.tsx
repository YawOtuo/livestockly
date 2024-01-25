import { Button } from "@mui/material";

type Props = {
  variant: "email" | "google";
  content: string;
  onClick? : any
  type? : string
};

function LoginButtons({ variant, content,onClick, type="button" }: Props) {
  const classes: any = {
    email: "!bg-black !text-white",
    google: "!text-black",
  };
  return (
    <div>
      <Button type={type} className={`w-full h-[40px] ${classes[variant]}`} onClick={onClick}>
        {content}
      </Button>
    </div>
  );
}

export default LoginButtons;
