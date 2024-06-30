import StoryLayout from '@/components/StoryLayout/StoryLayout';

export default function CharacterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <StoryLayout routeName="character">{children}</StoryLayout>;
}
