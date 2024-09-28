"use client";
import {
  AnimationProps,
  TargetAndTransition,
  VariantLabels,
  motion,
} from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  // whileInView: VariantLabels | TargetAndTransition | undefined
  // viewport: ViewportOptions
};

const FramerWrapper = ({ children, className, ...props }: Props) => {
  return (
    <motion.div {...props} className={className} id={props.id}>
      {children}
    </motion.div>
  );
};

export default FramerWrapper;
