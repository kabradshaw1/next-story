'use client';

import SingleCharacter from '@/components/singlePage/SingleCharacter/SingleCharacter';
import type {
  CreateCharacterMutation,
  CharacterQuery,
} from '@/generated/graphql';
import { useAppSelector } from '@/lib/store/store';

const mapMutationToQuery = (
  character: CreateCharacterMutation['createCharacter'] | null,
  images: string[]
): CharacterQuery['character'] | null => {
  if (character === null || character === undefined) {
    return null;
  }
  if (character.title === null || character.text === null) return null;
  return {
    __typename: 'Character',
    title: character.title,
    text: character.text,
    createdAt: character.createdAt,
    user: character.user,
    downloadURLs: images.map((url) => url),
    roles: character.roles,
  };
};

export default function CharacterCreatedReview(): JSX.Element {
  const { character, images } = useAppSelector((state) => state.char);
  const mappedCharacter = mapMutationToQuery(character, images);

  return <SingleCharacter character={mappedCharacter} />;
}
