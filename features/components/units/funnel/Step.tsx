import { useEffect } from "react";

export interface StepProps<T extends readonly string[]> {
  name: T[number];
  children: React.ReactNode;
  onEnter?: () => void;
}

const Step = <T extends readonly string[]>({
  children,
  onEnter,
}: StepProps<T>) => {
  useEffect(() => {
    if (onEnter) {
      onEnter();
    }
  }, []);

  return <>{children}</>;
};

export default Step;
