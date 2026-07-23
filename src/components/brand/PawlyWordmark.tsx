import Wordmark from '../../../assets/figma/brand/wordmark-vector.svg';

type PawlyWordmarkProps = {
  accessibilityLabel: string;
};

export function PawlyWordmark({
  accessibilityLabel,
}: PawlyWordmarkProps) {
  return (
    <Wordmark
      accessibilityLabel={accessibilityLabel}
      height={40}
      width={114}
    />
  );
}
