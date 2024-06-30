import StoryLayout from '@/components/StoryLayout/StoryLayout';

export default function OrganizationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <StoryLayout routeName="organization">{children}</StoryLayout>;
}
