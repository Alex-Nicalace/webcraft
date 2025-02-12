import { TPictureProps } from './Picture.types';

function Picture({
  sources,
  src,
  imgProps,
  ...props
}: TPictureProps): JSX.Element {
  return (
    <picture {...props}>
      {sources?.map((source) => <source key={source.srcSet} {...source} />)}
      <img {...imgProps} src={src} />
    </picture>
  );
}

export default Picture;
