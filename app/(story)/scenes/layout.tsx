import StoryLayout from '@/components/StoryLayout/StoryLayout';

export default function ScenesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <StoryLayout routeName="scene">{children}</StoryLayout>;
}
