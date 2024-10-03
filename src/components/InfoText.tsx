import { cva, VariantProps } from "class-variance-authority";

const infoTextStyles = cva("p-5", {
  variants: {
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
    variant: {
      primary: "bg-green2",
      secondary: "bg-gray-500",
      warning: "bg-yellow-500",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "primary",
  },
});

type Props = {
  text: string;
} & VariantProps<typeof infoTextStyles>;

function InfoText({ text, size, variant }: Props) {
  return <div className={infoTextStyles({ size, variant })}>{text}</div>;
}

export default InfoText;
