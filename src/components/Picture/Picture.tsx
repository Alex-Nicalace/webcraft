import { TPictureProps } from './Picture.types';

function Picture({ sources, ...props }: TPictureProps): JSX.Element {
  if (!sources) return <img {...props} />;

  return (
    <picture>
      {sources.map((source) => (
        <source key={source.srcSet} {...source} />
      ))}
      <img {...props} />
    </picture>
  );
}

export default Picture;
