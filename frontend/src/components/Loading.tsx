import ReactLoading, { LoadingProps } from 'react-loading';

export default function Loading({ color, width, height }: LoadingProps) {
  return (
    <ReactLoading
      type="spin"
      color={ color }
      width={ width }
      height={ height }
      className="loading"
    />
  );
}
