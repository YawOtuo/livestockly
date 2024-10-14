import { cva, VariantProps } from "class-variance-authority";

const infoTextStyles = cva("p-5", {
  variants: {
    size: {
      xs: "text-xs",
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
  className?: string;
  text: string;
} & VariantProps<typeof infoTextStyles>;

function InfoText({ text, size, variant, className }: Props) {
  return (
    <div className={`${infoTextStyles({ size, variant })} ${className}`}>
      {text}
    </div>
  );
}

export default InfoText;
